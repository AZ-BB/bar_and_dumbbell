"use client";

import { GraduationCap, Waves, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { useInView } from "@/hooks/useInView";
import { BiDumbbell } from "react-icons/bi";




const features = [
  {
    icon: BiDumbbell,
    titleKey: "whyFeature1" as const,
  },
  {
    icon: GraduationCap,
    titleKey: "whyFeature2" as const,
  },
  {
    icon: Waves,
    titleKey: "whyFeature3" as const,
  },
  {
    icon: UtensilsCrossed,
    titleKey: "whyFeature4" as const,
  },
];

export default function WhySection() {
  const { language } = useLanguage();
  const t = translations[language];
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 bg-gym-gray" id="why">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 animate-in-up ${isVisible ? "visible" : ""}`}>
          {t.whyTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const staggerClasses = ["stagger-1", "stagger-2", "stagger-3", "stagger-4"];
            const staggerClass = staggerClasses[index] || "stagger-4";
            return (
              <div
                key={index}
                className={`bg-gym-dark p-8 rounded-lg text-center hover:bg-gym-dark/80 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-gym-yellow group animate-in-scale ${staggerClass} ${isVisible ? "visible" : ""}`}
              >
                <div className="text-gym-yellow group-hover:text-white transition-colors duration-300 mb-6">
                  <IconComponent className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gym-yellow">
                  {t[feature.titleKey]}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
