"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { getWhatsAppLink } from "@/lib/constants";

export default function FinalCTA() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-32 bg-gym-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/gallery-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            {t.ctaTitle}
          </h2>

          <a
            href={getWhatsAppLink(isRTL)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-gym-yellow text-gym-dark font-bold text-xl rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gym-yellow/50"
          >
            {t.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
