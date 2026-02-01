"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, UserRound, Users } from "lucide-react";
import { isAuthenticated } from "@/lib/auth-client";

type FeatureText = { en: string; ar: string };

type Plan = {
  nameEn: string;
  nameAr: string;
  duration: string;
  price: number;
  features: FeatureText[];
  isVIP?: boolean;
};

type PlansData = {
  men: Plan[];
  women: Plan[];
};

const MEN_FEATURE_LABELS = ["Feature 1 (e.g. Invitations)", "Feature 2 (e.g. Nutrition)", "Feature 3 (e.g. Sauna)", "Feature 4 (e.g. Jacuzzi)"];
const WOMEN_FEATURE_LABELS = ["Feature 1 (e.g. Invitations)", "Feature 2 (e.g. Nutrition)"];

function normalizeFeature(f: unknown): FeatureText {
  if (typeof f === "object" && f !== null && "en" in f && "ar" in f) {
    return { en: String((f as FeatureText).en ?? ""), ar: String((f as FeatureText).ar ?? "") };
  }
  return { en: String(f ?? ""), ar: "" };
}

function ensureFeatures(plan: Plan, count: number): FeatureText[] {
  const arr = [...(plan.features || [])].map(normalizeFeature);
  while (arr.length < count) arr.push({ en: "", ar: "" });
  return arr.slice(0, count);
}

function normalizePlan(plan: Plan): Plan {
  const features = (plan.features || []).map(normalizeFeature);
  return { ...plan, features };
}

export default function AdminCMSPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [plans, setPlans] = useState<PlansData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"men" | "women">("men");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated()) {
      router.replace("/admin");
      return;
    }
    fetch("/api/cms", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.plans?.men && data?.plans?.women) {
          const normalized = {
            men: data.plans.men.map(normalizePlan),
            women: data.plans.women.map(normalizePlan),
          };
          setPlans(normalized);
        }
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load plans" }))
      .finally(() => setLoading(false));
  }, [mounted, router]);

  const updatePlan = (gender: "men" | "women", index: number, field: keyof Plan, value: string | number | string[] | boolean) => {
    if (!plans) return;
    const list = [...plans[gender]];
    const plan = { ...list[index], [field]: value };
    list[index] = plan;
    setPlans({ ...plans, [gender]: list });
  };

  const updateFeature = (gender: "men" | "women", planIndex: number, featureIndex: number, lang: "en" | "ar", value: string) => {
    if (!plans) return;
    const list = [...plans[gender]];
    const plan = { ...list[planIndex] };
    const features = [...(plan.features || []).map(normalizeFeature)];
    while (features.length <= featureIndex) features.push({ en: "", ar: "" });
    features[featureIndex] = { ...features[featureIndex], [lang]: value };
    plan.features = features;
    list[planIndex] = plan;
    setPlans({ ...plans, [gender]: list });
  };

  const handleSave = async () => {
    if (!plans) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plans }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data?.error || "Save failed" });
        return;
      }
      setMessage({ type: "success", text: "Plans saved to KV store." });
    } catch {
      setMessage({ type: "error", text: "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || !isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gym-dark flex items-center justify-center">
        <div className="text-gym-yellow">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gym-dark flex items-center justify-center">
        <div className="text-gym-yellow text-xl">Loading plans...</div>
      </div>
    );
  }

  if (!plans) {
    return (
      <div className="min-h-screen bg-gym-dark text-white p-8">
        <p className="text-red-400">Could not load plans.</p>
        <Link href="/admin" className="text-gym-yellow mt-4 inline-block">Back to Admin</Link>
      </div>
    );
  }

  const currentPlans = activeTab === "men" ? plans.men : plans.women;
  const featureLabels = activeTab === "men" ? MEN_FEATURE_LABELS : WOMEN_FEATURE_LABELS;
  const featureCount = activeTab === "men" ? 4 : 2;

  return (
    <div className="min-h-screen bg-gym-dark text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gym-yellow transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-gym-yellow">Plans CMS</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" /> {saving ? "Saving..." : "Save to KV store"}
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("men")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "men" ? "bg-gym-yellow text-gym-dark" : "bg-gym-gray text-white hover:bg-gym-gray/80"
            }`}
          >
            <UserRound className="w-5 h-5" /> Men
          </button>
          <button
            onClick={() => setActiveTab("women")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "women" ? "bg-gym-yellow text-gym-dark" : "bg-gym-gray text-white hover:bg-gym-gray/80"
            }`}
          >
            <Users className="w-5 h-5" /> Women
          </button>
        </div>

        {/* Plan cards */}
        <div className="space-y-6">
          {currentPlans.map((plan, planIndex) => {
            const features = ensureFeatures(plan, featureCount);
            return (
              <div
                key={planIndex}
                className="bg-gym-gray rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gym-yellow">Plan {planIndex + 1}</h2>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!plan.isVIP}
                      onChange={(e) => updatePlan(activeTab, planIndex, "isVIP", e.target.checked)}
                      className="rounded border-gray-500 bg-gym-dark text-gym-yellow focus:ring-gym-yellow"
                    />
                    VIP
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name (English)</label>
                    <input
                      type="text"
                      value={plan.nameEn}
                      onChange={(e) => updatePlan(activeTab, planIndex, "nameEn", e.target.value)}
                      className="w-full px-4 py-2 bg-gym-dark border border-gray-600 rounded-lg text-white focus:border-gym-yellow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name (Arabic)</label>
                    <input
                      type="text"
                      value={plan.nameAr}
                      onChange={(e) => updatePlan(activeTab, planIndex, "nameAr", e.target.value)}
                      className="w-full px-4 py-2 bg-gym-dark border border-gray-600 rounded-lg text-white focus:border-gym-yellow focus:outline-none"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Duration</label>
                    <input
                      type="text"
                      value={plan.duration}
                      onChange={(e) => updatePlan(activeTab, planIndex, "duration", e.target.value)}
                      className="w-full px-4 py-2 bg-gym-dark border border-gray-600 rounded-lg text-white focus:border-gym-yellow focus:outline-none"
                      placeholder="e.g. 14, 12, 7, 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price (EGP)</label>
                    <input
                      type="number"
                      value={plan.price}
                      onChange={(e) => updatePlan(activeTab, planIndex, "price", Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gym-dark border border-gray-600 rounded-lg text-white focus:border-gym-yellow focus:outline-none"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Features (text in English and Arabic)</label>
                  <div className="space-y-4">
                    {features.map((feat, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gym-dark rounded-lg border border-gray-700">
                        <label className="block text-xs text-gray-500 md:col-span-2">{featureLabels[i] ?? `Feature ${i + 1}`}</label>
                        <div>
                          <span className="block text-xs text-gray-500 mb-1">English</span>
                          <input
                            type="text"
                            value={feat.en}
                            onChange={(e) => updateFeature(activeTab, planIndex, i, "en", e.target.value)}
                            className="w-full px-3 py-2 bg-gym-gray border border-gray-600 rounded-lg text-white text-sm focus:border-gym-yellow focus:outline-none"
                            placeholder="e.g. 15 free invitations"
                          />
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500 mb-1">Arabic</span>
                          <input
                            type="text"
                            value={feat.ar}
                            onChange={(e) => updateFeature(activeTab, planIndex, i, "ar", e.target.value)}
                            className="w-full px-3 py-2 bg-gym-gray border border-gray-600 rounded-lg text-white text-sm focus:border-gym-yellow focus:outline-none"
                            placeholder="e.g. 15 دعوات مجانية"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" /> {saving ? "Saving..." : "Save to KV store"}
          </button>
        </div>
      </div>
    </div>
  );
}
