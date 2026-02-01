"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import AdminDashboard from "@/components/AdminDashboard";
import { isAuthenticated } from "@/lib/auth-client";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gym-dark flex items-center justify-center">
        <div className="text-gym-yellow">Loading...</div>
      </div>
    );
  }

  return isAuthenticated() ? <AdminDashboard /> : <LoginForm />;
}
