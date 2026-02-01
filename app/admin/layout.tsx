import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Bar & Dumbbell Gym",
  description: "Admin dashboard for lead management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
