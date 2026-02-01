"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const DumbbellIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="9" width="4" height="6" />
    <rect x="18" y="9" width="4" height="6" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="18" y1="10" x2="18" y2="14" />
  </svg>
);

const CoachIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M22 11l-3 3-3-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SaunaIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const NutritionIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const features = [
  {
    icon: DumbbellIcon,
    titleKey: "whyFeature1" as const,
  },
  {
    icon: CoachIcon,
    titleKey: "whyFeature2" as const,
  },
  {
    icon: SaunaIcon,
    titleKey: "whyFeature3" as const,
  },
  {
    icon: NutritionIcon,
    titleKey: "whyFeature4" as const,
  },
];

export default function WhySection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-20 bg-gym-gray" id="why">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t.whyTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-gym-dark p-8 rounded-lg text-center hover:bg-gym-dark/80 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-gym-yellow group"
              >
                <div className="text-gym-yellow group-hover:text-white transition-colors duration-300 mb-6">
                  <IconComponent />
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
