"use client";

import { ArrowLeft, LogOut, TableOfContents, UserRound } from "lucide-react";
import Link from "next/link";
import { clearAuth } from "@/lib/auth-client";

export default function AdminDashboard() {
  const handleLogout = () => {
    clearAuth();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gym-yellow mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Bar & Dumbbell Gym Management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/contacts">
            <div className="bg-gym-gray rounded-lg p-8 hover:bg-gym-gray/80 transition-all duration-300 border border-transparent hover:border-gym-yellow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                <UserRound className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gym-yellow mb-2">
                Leads Management
              </h2>
              <p className="text-gray-400">
                View and manage all contact form submissions and leads
              </p>
            </div>
          </Link>

          <Link href="/admin/cms">
            <div className="bg-gym-gray rounded-lg p-8 hover:bg-gym-gray/80 transition-all duration-300 border border-transparent hover:border-gym-yellow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                <TableOfContents className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gym-yellow mb-2">
                Content Management
              </h2>
              <p className="text-gray-400">
                View and manage all content like gallery images and videos
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gym-gray text-white font-bold rounded-lg hover:bg-gym-gray/80 transition-all duration-300 border border-gray-600"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
