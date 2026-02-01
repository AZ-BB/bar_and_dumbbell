"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { useInView } from "@/hooks/useInView";
import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 bg-gym-dark">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 animate-in-up ${isVisible ? "visible" : ""}`}>
          {t.formSectionTitle}
        </h2>
        <p className={`text-gray-300 text-center mb-12 text-lg animate-in stagger-1 ${isVisible ? "visible" : ""}`}>
          {t.formSectionSubtitle}
        </p>

        <div className={`max-w-2xl mx-auto animate-in-scale stagger-2 ${isVisible ? "visible" : ""}`}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
