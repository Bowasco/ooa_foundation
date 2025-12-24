"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function StatsCards() {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: totalCount } = await supabase
        .from("ooa_database")
        .select("*", { count: "exact", head: true });

      const todayDate = new Date().toISOString().split("T")[0];

      const { count: todayCount } = await supabase
        .from("recipients")
        .select("*", {
          count: "exact",
          head: true,
        })
        .gte("created_at", todayDate);

      setTotal(totalCount || 0);
      setToday(todayCount || 0);
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StatCard
        title="Total Registered Users"
        value={total}
        color="bg-blue-600"
      />
      <StatCard
        title="Registered Today"
        value={today}
        color="bg-green-600"
      />
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      className={`${color} text-white rounded-xl p-6 shadow-md`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}
