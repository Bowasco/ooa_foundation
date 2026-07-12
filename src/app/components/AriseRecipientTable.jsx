"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AriseRecipientTable() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 10;

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("arise_academy_applications")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setApplications(data || []);
        }
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Search filter
  const filtered = applications.filter((r) =>
    `${r.surname} ${r.firstname} ${r.phone} ${r.track} ${r.community} ${r.ref_number}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const downloadCSV = () => {
    const headers = [
      // Personal Info
      "Ref Number",
      "Surname",
      "First Name",
      "Date of Birth",
      "Gender",
      "Marital Status",
      "Phone",
      "WhatsApp",
      "Email",
      "Home Address",
      "Community",
      "State of Origin",
      "Nearest Landmark",
      // Emergency Contact
      "Emergency Contact Name",
      "Emergency Contact Relationship",
      "Emergency Contact Phone",
      "Emergency Contact WhatsApp",
      "Emergency Contact Address",
      // Education
      "Highest Education",
      "Last School Attended",
      "Year Completed",
      "Has Certificates",
      "Certificate Details",
      // Employment
      "Employment Status",
      "Current Work",
      "Number of Dependants",
      // Skills Track
      "Track Selected",
      "Prior Experience Level",
      "Prior Experience Description",
      // Motivation
      "Why Applying",
      "Business Idea",
      "Biggest Challenge",
      "Has Market/Customers",
      "Has Equipment",
      // Availability
      "Availability",
      "Medical Condition",
      "Medical Details",
      "How They Heard About Us",
      // Declaration
      "Full Name (Signature)",
      // Meta
      "Submitted At",
    ];

    const rows = applications.map((r) => [
      r.ref_number,
      r.surname,
      r.firstname,
      r.dob,
      r.gender,
      r.marital,
      r.phone,
      r.whatsapp,
      r.email,
      r.address,
      r.community,
      r.stateorigin,
      r.landmark,
      r.emname,
      r.emrel,
      r.emphone,
      r.emwhatsapp,
      r.emaddress,
      r.education,
      r.lastschool,
      r.schoolyear,
      r.hascert,
      r.certdetails,
      r.employment,
      r.currentwork,
      r.dependants,
      r.track,
      r.prior_exp,
      r.prior_exp_desc,
      r.why_apply,
      r.business_idea,
      r.biggest_challenge,
      r.market,
      r.equipment,
      r.availability,
      r.medical,
      r.medical_details,
      r.referral,
      r.signname,
      new Date(r.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    ]);

    // Wrap every cell in quotes and escape any existing quotes inside values
    const escape = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;

    const csv = [
      headers.map(escape).join(","),
      ...rows.map((row) => row.map(escape).join(",")),
    ].join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    a.download = `arise_applications_full_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading)
    return (
      <p className="p-8 text-gray-500 text-center">Loading applications…</p>
    );
  if (error)
    return <p className="p-8 text-red-500 text-center">Error: {error}</p>;
  if (!applications.length)
    return (
      <p className="p-8 text-gray-400 text-center">No applications yet.</p>
    );

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <input
          type="text"
          placeholder="Search by name, phone, track, community…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {filtered.length} application{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
          >
            ⬇ Download CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              {[
                "Ref #",
                "Name",
                "Phone",
                "Gender",
                "Community",
                "Track",
                "Employment",
                "Availability",
                "Date",
              ].map((h) => (
                <th
                  key={h}
                  className="border-b px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                  {r.ref_number}
                </td>
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {r.surname} {r.firstname}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{r.phone}</td>
                <td className="px-4 py-3">{r.gender}</td>
                <td className="px-4 py-3">{r.community}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                    {r.track?.replace("Track ", "T").split(":")[0]}
                  </span>
                </td>
                <td className="px-4 py-3">{r.employment}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.availability === "Yes — fully available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.availability === "Yes — fully available"
                      ? "Available"
                      : "Partial"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">
                  {new Date(r.created_at).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-5 flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Showing {(currentPage - 1) * perPage + 1}–
            {Math.min(currentPage * perPage, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100"
            >
              ← Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                return (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 rounded border ${currentPage === p ? "bg-green-600 text-white border-green-600" : "hover:bg-gray-100"}`}
                  >
                    {p}
                  </button>
                );
              if (Math.abs(p - currentPage) === 2)
                return (
                  <span key={p} className="px-1 self-center">
                    …
                  </span>
                );
              return null;
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
