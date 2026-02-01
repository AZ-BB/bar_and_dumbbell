import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getPlans, CMS_PLANS_CACHE_TAG } from "@/lib/cms";

const KV_API_BASE_URL = process.env.KV_API_BASE_URL ?? "";
const KV_API_KEY = process.env.KV_API_KEY ?? "";
const KV_KEY = process.env.KV_KEY ?? "";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

function isValidPlans(value: unknown): value is { men: unknown[]; women: unknown[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    "men" in value &&
    "women" in value &&
    Array.isArray((value as { men: unknown[] }).men) &&
    Array.isArray((value as { women: unknown[] }).women)
  );
}

/**
 * GET /api/cms
 * Fetches CMS data (plans) from key-value store with fallback to data/plans.json
 * Supports caching with 1 hour revalidation
 */
export async function GET() {
  try {
    const plans = await getPlans();
    return NextResponse.json(
      { plans },
      { headers: CACHE_HEADERS }
    );
  } catch (error) {
    console.error("[CMS API] Failed to load CMS data:", error);
    return NextResponse.json(
      { error: "Failed to load CMS data" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms
 * Updates plans in the key-value store only. Does NOT touch data/plans.json.
 */
export async function PUT(request: Request) {
  if (!KV_API_BASE_URL || !KV_API_KEY || !KV_KEY) {
    console.error("[CMS API] PUT rejected: KV store not configured");
    return NextResponse.json(
      { error: "KV store not configured (KV_API_BASE_URL, KV_API_KEY, KV_KEY required)" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const plans = body?.plans;

    if (!isValidPlans(plans)) {
      return NextResponse.json(
        { error: "Invalid body: expected { plans: { men: [], women: [] } }" },
        { status: 400 }
      );
    }

    const url = `${KV_API_BASE_URL.replace(/\/$/, "")}/${encodeURIComponent(KV_KEY)}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": KV_API_KEY,
      },
      body: JSON.stringify(plans),
    });

    if (!response.ok) {
      console.error("[CMS API] KV store PUT failed:", response.status, response.statusText, url);
      return NextResponse.json(
        { error: "Failed to update KV store" },
        { status: 502 }
      );
    }

    revalidateTag(CMS_PLANS_CACHE_TAG);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CMS API] PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update CMS data" },
      { status: 500 }
    );
  }
}
