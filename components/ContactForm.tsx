"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const { error } = await supabase.from("bar_and_dumbbell").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          interest: formData.interest,
          source: "contact_form",
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "", interest: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder={t.formName}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-gym-dark border border-gym-gray rounded-lg focus:border-gym-yellow focus:outline-none text-white"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <div>
        <input
          type="tel"
          placeholder={t.formPhone}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="w-full px-4 py-3 bg-gym-dark border border-gym-gray rounded-lg focus:border-gym-yellow focus:outline-none text-white"
          dir="ltr"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder={t.formEmail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-gym-dark border border-gym-gray rounded-lg focus:border-gym-yellow focus:outline-none text-white"
          dir="ltr"
        />
      </div>

      <div>
        <select
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="w-full px-4 py-3 bg-gym-dark border border-gym-gray rounded-lg focus:border-gym-yellow focus:outline-none text-white"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <option value="">{t.formInterest}</option>
          <option value="vip">{t.pricingVIP}</option>
          <option value="12months">{t.pricing12Months}</option>
          <option value="6months">{t.pricing6Months}</option>
          <option value="3months">{t.pricing3Months}</option>
          <option value="1month">{t.pricing1Month}</option>
        </select>
      </div>

      <div>
        <textarea
          placeholder={t.formMessage}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-gym-dark border border-gym-gray rounded-lg focus:border-gym-yellow focus:outline-none text-white resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t.formSending : t.formSubmit}
      </button>

      {status === "success" && (
        <p className="text-green-500 text-center font-semibold">{t.formSuccess}</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-center font-semibold">{t.formError}</p>
      )}
    </form>
  );
}
