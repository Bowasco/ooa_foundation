"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RecipientTable() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipientsPerPage = 5;

  useEffect(() => {
    const loadRecipients = async () => {
      try {
        const { data, error } = await supabase
          .from("ooa_database")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase fetch error:", error.message);
          setError(error.message);
        } else {
          setRecipients(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to load recipients");
      } finally {
        setLoading(false);
      }
    };

    loadRecipients();
  }, []);

  const downloadCSV = () => {
    // CSV headers
    const headers = [
      "Full Name",
      "Email",
      "Phone Number",
      "Gender",
      "Profile Code",
      "JAMB Score",
    ];

    // CSV rows
    const rows = recipients.map((r) => [
      r.name,
      r.email,
      r.phone,
      r.gender,
      r.profile_code,
      r.jamb_score,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `recipients_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const indexOfLastRecipient = currentPage * recipientsPerPage;
  const indexOfFirstRecipient = indexOfLastRecipient - recipientsPerPage;
  const currentRecipients = recipients.slice(
    indexOfFirstRecipient,
    indexOfLastRecipient,
  );
  const totalPages = Math.ceil(recipients.length / recipientsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-[30px] text-gray-600">Loading recipients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (recipients.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-[30px]">No recipients found</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Recipients ({recipients.length})
          </h2>
        </div>
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Profile Code</th>
              <th className="border p-2">Jamb Score</th>
            </tr>
          </thead>

          <tbody>
            {currentRecipients.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.email}</td>
                <td className="border p-2">{r.phone}</td>
                <td className="border p-2">{r.gender}</td>
                <td className="border p-2">{r.profile_code}</td>
                <td className="border p-2">{r.jamb_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-5">
            <p className="text-sm text-gray-600 mt-1">
              Showing {indexOfFirstRecipient + 1}-
              {Math.min(indexOfLastRecipient, recipients.length)} of{" "}
              {recipients.length}
            </p>
            <div className="flex gap-5">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-3 py-2 rounded ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
