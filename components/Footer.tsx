"use client";

import Image from "next/image";
import Link from "next/link";
import { Circle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gym-dark border-t border-gym-gray py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/images/logo-1.png" 
              alt="Bar & Dumbbell Gym Logo" 
              width={50} 
              height={50}
              className="object-contain"
            />
            <span className="text-lg font-semibold">
              {isRTL ? "بار & دمبل" : "Bar & Dumbbell Gym"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {isRTL ? "بار & دمبل" : "Bar & Dumbbell Gym"} - {t.footerRights}
            </p>
            <Link 
              href="/admin" 
              className="text-gray-600 hover:text-gym-yellow transition-colors inline-flex items-center"
              title="Admin"
            >
              <Circle className="w-1.5 h-1.5 fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
