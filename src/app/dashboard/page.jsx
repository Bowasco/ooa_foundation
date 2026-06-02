"use client";

import AriseRecipientTable from "../components/AriseRecipientTable";
import AriseStatsCards from "../components/AriseStatsCards";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 mb-8">Arise Academy — Cohort 1 Applications</p>

        <AriseStatsCards />

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-5">All Applications</h2>
          <AriseRecipientTable />
        </div>
      </div>
    </main>
  );
}