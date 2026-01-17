"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="h-96 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-2xl w-96"
      >
        <h1 className="text-[30px] text-center font-bold mb-4">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <input
          type="email"
          placeholder="Admin email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black hover:bg-black/90 cursor-pointer text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
