"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { getWhatsAppLink } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [useVideoBackground, setUseVideoBackground] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Check if we should use video on desktop
    const checkVideoSupport = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile && !prefersReducedMotion) {
        // On desktop, we use video
        setUseVideoBackground(true);
      } else if (prefersReducedMotion) {
        setUseVideoBackground(false);
      }
    };

    checkVideoSupport();
    window.addEventListener("resize", checkVideoSupport);
    return () => window.removeEventListener("resize", checkVideoSupport);
  }, [prefersReducedMotion]);

  const handleVideoError = () => {
    setUseVideoBackground(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      {/* Video or Image Background */}
      {useVideoBackground && !prefersReducedMotion ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-1.jpg')" }}
        />
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center">
              <Image 
                src="/images/logo-1.png" 
                alt="Bar & Dumbbell Gym Logo" 
                width={180} 
                height={180}
                className="object-contain mx-auto"
                priority
              />
            </div>

            {/* Gym Name */}
            <h1 className="text-4xl md:text-6xl font-bold">
              {isRTL ? "Bar & Dumbbell Gym" : "Bar & Dumbbell Gym"}
            </h1>

            {/* Headline */}
            <p className="text-2xl md:text-4xl font-semibold text-gym-yellow">
              {t.heroHeadline}
            </p>

            {/* CTA Button */}
            <div>
              <a
                href={getWhatsAppLink(isRTL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gym-yellow text-gym-dark font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gym-yellow/50"
              >
                {t.heroCTA}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gym-yellow rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gym-yellow rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
