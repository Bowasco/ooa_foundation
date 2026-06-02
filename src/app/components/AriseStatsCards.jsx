"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AriseStatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("arise_academy_applications")
        .select("track, gender, availability");

      if (!data) return;

      const total     = data.length;
      const available = data.filter(r => r.availability === "Yes — fully available").length;
      const female    = data.filter(r => r.gender === "Female").length;
      const trackMap  = data.reduce((acc, r) => {
        const t = r.track?.split(":")[0] ?? "Unknown";
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {});
      const topTrack = Object.entries(trackMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

      setStats({ total, available, female, topTrack });
    };
    load();
  }, []);

  const cards = [
    { label: "Total Applications", value: stats?.total ?? "—",     color: "bg-blue-50 border-blue-200",   text: "text-blue-700" },
    { label: "Fully Available",    value: stats?.available ?? "—", color: "bg-green-50 border-green-200", text: "text-green-700" },
    { label: "Female Applicants",  value: stats?.female ?? "—",    color: "bg-purple-50 border-purple-200", text: "text-purple-700" },
    { label: "Top Track",          value: stats?.topTrack ?? "—",  color: "bg-yellow-50 border-yellow-200", text: "text-yellow-700" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className={`${c.color} border rounded-xl p-5`}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{c.label}</p>
          <p className={`text-3xl font-bold ${c.text}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}