export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201234567890";
export const WHATSAPP_MESSAGE_AR = "مرحباً، أريد الاستفسار عن الاشتراك في الجيم";
export const WHATSAPP_MESSAGE_EN = "Hi, I would like to inquire about gym membership";

export const getWhatsAppLink = (isArabic: boolean) => {
  const message = isArabic ? WHATSAPP_MESSAGE_AR : WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const GOOGLE_MAPS_EMBED = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123!2d31.234!3d30.044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM4LjQiTiAzMcKwMTQnMDIuNCJF!5e0!3m2!1sen!2seg!4v1234567890";

export const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "info@baranddumbbell.com";
