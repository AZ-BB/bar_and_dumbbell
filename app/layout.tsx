import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bar & Dumbbell Gym - Train Hard. Get Real Results.",
  description: "Join the strongest gym in town. Modern equipment, professional coaches, sauna & jacuzzi, and personalized nutrition plans. Start your fitness journey today!",
  keywords: ["gym", "fitness", "training", "workout", "sauna", "jacuzzi", "nutrition", "Cairo", "Egypt"],
  authors: [{ name: "Bar & Dumbbell Gym" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Bar & Dumbbell Gym - Train Hard. Get Real Results.",
    description: "Join the strongest gym in town. Modern equipment, professional coaches, and premium facilities.",
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
