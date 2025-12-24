"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RecipientTable() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipients = async () => {
      const { data, error } = await supabase
        .from("ooa_database")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setRecipients(data);
      }
      if (error) {
        console.error("Supabase fetch error:", error.message);
        return [];
      }
      setLoading(false);
    };

    loadRecipients();
  }, []);

  const deleteRecipient = async (id) => {
    const confirmDelete = confirm("Delete this recipient?");
    if (!confirmDelete) return;

    await supabase.from("ooa_database").delete().eq("id", id);

    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p className="text-[40px]">Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Profile Code</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {recipients.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.email}</td>
              <td className="border p-2">{r.phone}</td>
              <td className="border p-2">{r.gender}</td>
              <td className="border p-2">{r.profile_code}</td>
              <td className="border p-2 flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteRecipient(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
