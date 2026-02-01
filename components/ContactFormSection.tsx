"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-20 bg-gym-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          {t.formSectionTitle}
        </h2>
        <p className="text-gray-300 text-center mb-12 text-lg">
          {t.formSectionSubtitle}
        </p>

        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
