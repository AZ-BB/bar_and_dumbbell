"use client";

import Link from "next/link";

export default function AdminPage() {
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
          {/* Leads Management */}
          <Link href="/admin/contacts">
            <div className="bg-gym-gray rounded-lg p-8 hover:bg-gym-gray/80 transition-all duration-300 border border-transparent hover:border-gym-yellow cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                📋
              </div>
              <h2 className="text-2xl font-bold text-gym-yellow mb-2">
                Leads Management
              </h2>
              <p className="text-gray-400">
                View and manage all contact form submissions and leads
              </p>
            </div>
          </Link>

          {/* Coming Soon */}
          <div className="bg-gym-gray rounded-lg p-8 opacity-50 cursor-not-allowed">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              Analytics
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>

          <div className="bg-gym-gray rounded-lg p-8 opacity-50 cursor-not-allowed">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              Members
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>

          <div className="bg-gym-gray rounded-lg p-8 opacity-50 cursor-not-allowed">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              Settings
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
