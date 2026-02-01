"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import Image from "next/image";

const facilities = [
  {
    titleKey: "facilityStrength" as const,
    images: ["/images/equipment-1.jpg", "/images/gallery-1.jpg"],
  },
  {
    titleKey: "facilityCardio" as const,
    images: ["/images/gallery-4.jpg"],
  },
  {
    titleKey: "facilitySauna" as const,
    images: ["/images/sauna-1.jpg"],
  },
  {
    titleKey: "facilityJacuzzi" as const,
    images: ["/images/jacuzzi-1.jpg"],
  },
];

export default function FacilitiesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-20 bg-gym-dark" id="facilities">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t.facilitiesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-video"
            >
              <Image
                src={facility.images[0]}
                alt={t[facility.titleKey]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-gym-yellow">
                  {t[facility.titleKey]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
