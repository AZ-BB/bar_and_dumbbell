"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth-client";
import AdminContactsContent from "./AdminContactsContent";

export default function AdminContactsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated()) router.replace("/admin");
  }, [mounted, router]);

  if (!mounted || !isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gym-dark flex items-center justify-center">
        <div className="text-gym-yellow">Loading...</div>
      </div>
    );
  }

  return <AdminContactsContent />;
}
