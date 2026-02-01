"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Lead } from "@/lib/supabase";

export default function AdminContactsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bar_and_dumbbell")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: 'new' | 'contacted' | 'removed') => {
    setUpdatingLeadId(leadId);
    try {
      const { error } = await supabase
        .from("bar_and_dumbbell")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      // Update local state
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Phone", "Email", "Interest", "Message", "Status"];
    const rows = filteredLeads.map((lead) => [
      new Date(lead.created_at || "").toLocaleString(),
      lead.name || "",
      lead.phone || "",
      lead.email || "",
      lead.interest || "",
      lead.message || "",
      lead.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const colors = {
      new: "bg-gym-yellow text-gym-dark",
      contacted: "bg-green-500 text-white",
      removed: "bg-red-500 text-white",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gym-dark flex items-center justify-center">
        <div className="text-gym-yellow text-2xl">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gym-dark text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gym-yellow mb-2">
              Lead Management
            </h1>
            <p className="text-gray-400">
              Total Leads: {filteredLeads.length}
            </p>
          </div>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-6 py-3 bg-gym-gray text-white font-bold rounded-lg hover:bg-gym-gray/80 transition-all duration-300 disabled:opacity-50"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="bg-gym-gray rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gym-dark border border-gray-600 rounded-lg focus:border-gym-yellow focus:outline-none text-white"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gym-dark border border-gray-600 rounded-lg focus:border-gym-yellow focus:outline-none text-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="removed">Removed</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <div className="mt-4">
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-gym-yellow text-gym-dark font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300"
            >
              Export to CSV ({filteredLeads.length} leads)
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gym-gray rounded-lg p-6">
            <div className="text-gray-400 mb-2">New Leads</div>
            <div className="text-3xl font-bold text-gym-yellow">
              {leads.filter((l) => l.status === "new").length}
            </div>
          </div>
          <div className="bg-gym-gray rounded-lg p-6">
            <div className="text-gray-400 mb-2">Contacted</div>
            <div className="text-3xl font-bold text-green-500">
              {leads.filter((l) => l.status === "contacted").length}
            </div>
          </div>
          <div className="bg-gym-gray rounded-lg p-6">
            <div className="text-gray-400 mb-2">Removed</div>
            <div className="text-3xl font-bold text-red-500">
              {leads.filter((l) => l.status === "removed").length}
            </div>
          </div>
          <div className="bg-gym-gray rounded-lg p-6">
            <div className="text-gray-400 mb-2">Total Leads</div>
            <div className="text-3xl font-bold text-white">
              {leads.length}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-gym-gray rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gym-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Interest
                  </th>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-gym-yellow font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-gym-dark transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {new Date(lead.created_at || "").toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {lead.name || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-gym-yellow hover:underline"
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {lead.email ? (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-gym-yellow hover:underline"
                          >
                            {lead.email}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {lead.interest || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {lead.message || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as 'new' | 'contacted' | 'removed')}
                          disabled={updatingLeadId === lead.id}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-gym-yellow cursor-pointer ${getStatusBadge(lead.status)} ${updatingLeadId === lead.id ? 'opacity-50 cursor-wait' : ''}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="removed">Removed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
