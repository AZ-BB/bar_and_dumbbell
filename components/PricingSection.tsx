"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { getWhatsAppLink } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

type FeatureText = { en: string; ar: string };

type PricingPlan = {
  nameEn: string;
  nameAr: string;
  duration: string;
  price: number;
  features: FeatureText[];
  isVIP?: boolean;
};

export type PlansData = {
  men: PricingPlan[];
  women: PricingPlan[];
};

type PricingSectionProps = {
  plans: PlansData;
};

export default function PricingSection({ plans }: PricingSectionProps) {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<"men" | "women">("men");
  const { ref, isVisible } = useInView();

  const currentPlans = plans
    ? activeTab === "men"
      ? plans.men
      : plans.women
    : [];

  const getPlanName = (plan: PricingPlan) =>
    language === "ar" ? plan.nameAr : plan.nameEn;

  const getFeatureText = (f: FeatureText): string =>
    language === "ar" ? (f.ar || f.en) : (f.en || f.ar);

  if (!plans || currentPlans.length === 0) {
    return (
      <section className="py-20 bg-gym-gray" id="pricing">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t.pricingTitle}
          </h2>
          <div className="text-gray-400">No plans available.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gym-gray" id="pricing">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-in-up visible">
          {t.pricingTitle}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12 animate-in visible">
          <div className="inline-flex bg-gym-dark rounded-lg p-1">
            <button
              onClick={() => setActiveTab("men")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "men"
                  ? "bg-gym-yellow text-gym-dark"
                  : "text-white hover:text-gym-yellow"
              }`}
            >
              {t.pricingMen}
            </button>
            <button
              onClick={() => setActiveTab("women")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "women"
                  ? "bg-gym-yellow text-gym-dark"
                  : "text-white hover:text-gym-yellow"
              }`}
            >
              {t.pricingWomen}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {currentPlans.map((plan, index) => {
            const staggerClass = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"][index] || "stagger-5";
            return (
            <div
              key={index}
              className={`bg-gym-dark rounded-lg p-6 flex flex-col animate-in-scale ${staggerClass} visible ${
                plan.isVIP
                  ? "border-2 border-gym-yellow relative overflow-hidden"
                  : "border border-gym-gray"
              } hover:border-gym-yellow transition-all duration-300 transform hover:scale-105`}
            >
              {plan.isVIP && (
                <div className="absolute top-0 right-0 bg-gym-yellow text-gym-dark px-4 py-1 text-xs font-bold">
                  VIP
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gym-yellow mt-4">
                  {getPlanName(plan)}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-2">EGP</span>
                </div>

                {plan.features?.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-gray-300">
                      {t.pricingIncludes}
                    </p>
                    {plan.features.map((feature, i) => {
                      const text = typeof feature === "object" && feature !== null && "en" in feature && "ar" in feature
                        ? getFeatureText(feature as FeatureText)
                        : String(feature);
                      if (!text.trim()) return null;
                      return (
                        <p key={i} className="text-sm text-gray-400 flex items-center gap-2">
                          <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {text}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href={getWhatsAppLink(isRTL)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-gym-yellow text-gym-dark font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 mt-4"
              >
                {t.pricingSelectPlan}
              </a>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
