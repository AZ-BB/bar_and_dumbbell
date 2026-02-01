"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Navbar() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <nav className="fixed top-0 w-full bg-gym-dark/95 backdrop-blur-sm z-50 border-b border-gym-gray">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/images/logo-1.png" 
              alt="Bar & Dumbbell Gym Logo" 
              width={50} 
              height={50}
              className="object-contain"
            />
            <span className="text-xl font-bold">
              {isRTL ? "بار & دمبل" : "Bar & Dumbbell"}
            </span>
          </div>

          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-gym-gray hover:bg-gym-yellow hover:text-gym-dark transition-all duration-300 rounded-lg font-semibold"
            aria-label="Toggle language"
          >
            {t.navLanguage}
          </button>
        </div>
      </div>
    </nav>
  );
}
