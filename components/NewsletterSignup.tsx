"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { supabase } from "@/lib/supabase";

export default function NewsletterSignup() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const { error } = await supabase.from("bar_and_dumbbell").insert([
        {
          email,
          phone,
          source: "newsletter",
          message: "Newsletter subscription",
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setEmail("");
      setPhone("");
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gym-dark border border-gym-gray rounded-lg p-8">
      <h3 className="text-2xl font-bold text-gym-yellow mb-4 text-center">
        {t.newsletterTitle}
      </h3>
      <p className="text-gray-300 mb-6 text-center">
        {t.newsletterSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="tel"
            placeholder={t.formPhone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gym-gray border border-transparent rounded-lg focus:border-gym-yellow focus:outline-none text-white"
            dir="ltr"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder={t.formEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gym-gray border border-transparent rounded-lg focus:border-gym-yellow focus:outline-none text-white"
            dir="ltr"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t.formSending : t.newsletterButton}
        </button>

        {status === "success" && (
          <p className="text-green-500 text-center font-semibold">{t.newsletterSuccess}</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center font-semibold">{t.formError}</p>
        )}
      </form>
    </div>
  );
}
