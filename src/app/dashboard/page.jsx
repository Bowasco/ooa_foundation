"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RecipientTable from "../components/RecipientTable";
import StatsCards from "../components/StatsCards";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Overview of registered recipients
          </p>

          <StatsCards />

          <div className="mt-10 bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-4">
              Registered Recipients
            </h2>
            <RecipientTable />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
