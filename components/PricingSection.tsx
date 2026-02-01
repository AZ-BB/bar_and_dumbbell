"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { getWhatsAppLink } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

type PricingPlan = {
  nameKey: keyof typeof translations.ar;
  duration: string;
  price: number;
  features: string[];
  isVIP?: boolean;
};

const menPlans: PricingPlan[] = [
  {
    nameKey: "pricingVIP",
    duration: "14",
    price: 5000,
    features: ["15", "12", "12", "12"],
    isVIP: true,
  },
  {
    nameKey: "pricing12Months",
    duration: "12",
    price: 4500,
    features: ["12", "10", "10", "10"],
  },
  {
    nameKey: "pricing6Months",
    duration: "7",
    price: 3300,
    features: ["6", "5", "6", "6"],
  },
  {
    nameKey: "pricing3Months",
    duration: "3.5",
    price: 2200,
    features: ["4", "3", "3", "3"],
  },
  {
    nameKey: "pricing1Month",
    duration: "1",
    price: 900,
    features: ["1", "0", "1", "1"],
  },
];

const womenPlans: PricingPlan[] = [
  {
    nameKey: "pricingVIP",
    duration: "14",
    price: 4000,
    features: ["15", "12"],
    isVIP: true,
  },
  {
    nameKey: "pricing12Months",
    duration: "12",
    price: 3600,
    features: ["12", "10"],
  },
  {
    nameKey: "pricingWomen6",
    duration: "7",
    price: 2400,
    features: ["6", "5"],
  },
  {
    nameKey: "pricingWomen3",
    duration: "3",
    price: 1500,
    features: ["4", "3"],
  },
  {
    nameKey: "pricing1Month",
    duration: "1",
    price: 650,
    features: ["2", "0"],
  },
];

export default function PricingSection() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<"men" | "women">("men");
  const { ref, isVisible } = useInView();

  const currentPlans = activeTab === "men" ? menPlans : womenPlans;

  return (
    <section className="py-20 bg-gym-gray" id="pricing">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 animate-in-up ${isVisible ? "visible" : ""}`}>
          {t.pricingTitle}
        </h2>

        {/* Tabs */}
        <div className={`flex justify-center mb-12 animate-in ${isVisible ? "visible" : ""}`}>
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
              className={`bg-gym-dark rounded-lg p-6 flex flex-col animate-in-scale ${staggerClass} ${isVisible ? "visible" : ""} ${
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
                  {t[plan.nameKey]}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-2">EGP</span>
                </div>

                {plan.features.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-gray-300">
                      {t.pricingIncludes}
                    </p>
                    {activeTab === "men" ? (
                      <>
                        {plan.features[0] && plan.features[0] !== "0" && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {plan.features[0]} {t.pricingInvitations}
                          </p>
                        )}
                        {plan.features[1] && plan.features[1] !== "0" && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {plan.features[1]} {t.pricingNutrition}
                          </p>
                        )}
                        {plan.features[2] && plan.features[2] !== "0" && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {plan.features[2]} {t.pricingSauna}
                          </p>
                        )}
                        {plan.features[3] && plan.features[3] !== "0" && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {plan.features[3]} {t.pricingJacuzzi}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        {plan.features[0] && plan.features[0] !== "0" && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {plan.features[0]} {t.pricingInvitations}
                          </p>
                        )}
                        {plan.features[1] && plan.features[1] !== "0" && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0 text-gym-yellow" /> {plan.features[1]} {t.pricingNutrition}
                          </p>
                        )}
                      </>
                    )}
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
