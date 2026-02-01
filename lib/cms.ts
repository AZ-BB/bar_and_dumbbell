import { readFile } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";

const KV_API_BASE_URL = process.env.KV_API_BASE_URL ?? "";
const KV_API_KEY = process.env.KV_API_KEY ?? "";
const KV_KEY = process.env.KV_KEY ?? "";

export const CMS_PLANS_CACHE_TAG = "cms-plans";

export type PlansData = { men: unknown[]; women: unknown[] };

function isValidPlans(value: unknown): value is PlansData {
  return (
    typeof value === "object" &&
    value !== null &&
    "men" in value &&
    "women" in value &&
    Array.isArray((value as PlansData).men) &&
    Array.isArray((value as PlansData).women)
  );
}

async function getDefaultPlans(): Promise<PlansData> {
  const plansPath = path.join(process.cwd(), "data", "plans.json");
  const data = await readFile(plansPath, "utf-8");
  return JSON.parse(data);
}

/**
 * Fetches plans from KV store only (no cache, no file fallback). Use from CMS.
 */
export async function getPlansFromKVOnly(): Promise<PlansData | null> {
  if (!KV_API_BASE_URL || !KV_API_KEY || !KV_KEY) return null;
  try {
    const url = `${KV_API_BASE_URL.replace(/\/$/, "")}/${encodeURIComponent(KV_KEY)}`;
    const response = await fetch(url, {
      headers: { "X-API-Key": KV_API_KEY },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = await response.json();
    const value = data?.value;
    if (isValidPlans(value)) return value;
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetches plans directly from KV with file fallback (no cache). For non-CMS use.
 */
export async function getPlansFresh(): Promise<PlansData> {
  return fetchPlansUncached();
}

async function fetchPlansUncached(): Promise<PlansData> {
  try {
    if (KV_API_BASE_URL && KV_API_KEY && KV_KEY) {
      const url = `${KV_API_BASE_URL.replace(/\/$/, "")}/${encodeURIComponent(KV_KEY)}`;
      const response = await fetch(url, {
        headers: { "X-API-Key": KV_API_KEY },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        const value = data?.value;
        if (isValidPlans(value)) return value;
        console.warn("[CMS] KV store returned invalid plans shape");
      } else {
        console.error("[CMS] KV store request failed:", response.status, response.statusText, url);
      }
    } else {
      console.warn("[CMS] KV store skipped: missing env");
    }

    return await getDefaultPlans();
  } catch (error) {
    console.warn("[CMS] Failed to fetch from KV, using fallback:", error);
    return await getDefaultPlans();
  }
}

/**
 * Fetches plans from KV store with fallback to data/plans.json.
 * Cached for 1 hour; revalidate via revalidateTag(CMS_PLANS_CACHE_TAG) after CMS updates.
 */
export async function getPlans(): Promise<PlansData> {
  return unstable_cache(
    fetchPlansUncached,
    [CMS_PLANS_CACHE_TAG],
    { revalidate: 3600, tags: [CMS_PLANS_CACHE_TAG] }
  )();
}
