"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { supabase } from "@/lib/supabase";

export default function LeadPopup() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("gym_popup_seen");
    
    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("gym_popup_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const { error } = await supabase.from("bar_and_dumbbell").insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: "popup",
          message: "Special offer popup signup",
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
      
      // Close popup after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting popup form:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gym-dark border-2 border-gym-yellow rounded-lg max-w-md w-full p-8 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gym-yellow mb-2">
            {t.popupTitle}
          </h3>
          <p className="text-gray-300">
            {t.popupSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={t.formName}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gym-gray border border-transparent rounded-lg focus:border-gym-yellow focus:outline-none text-white"
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
              className="w-full px-4 py-3 bg-gym-gray border border-transparent rounded-lg focus:border-gym-yellow focus:outline-none text-white"
              dir="ltr"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder={t.formEmail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gym-gray border border-transparent rounded-lg focus:border-gym-yellow focus:outline-none text-white"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-gym-yellow text-gym-dark font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.formSending : t.popupButton}
          </button>

          {status === "success" && (
            <p className="text-green-500 text-center font-semibold">{t.formSuccess}</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-center font-semibold">{t.formError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
