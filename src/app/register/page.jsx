"use client";

import React, { useState } from "react";
import Footer from "../components/Footer";
import Image from "next/image";
import Navbar from "../components/Navbar";
import register from "../../../public/images/register.jpg";
import { supabase } from "@/lib/supabaseClient";

/* ================= REGEX ================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;
const profileCodeRegex = /^[a-zA-Z0-9_-]+$/;

const Page = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    profile_code: "",
    hometown: "",
    guardian_profession: "",
    secondary_school: "",
    preferred_institution: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name || formData.name.length < 5) {
      newErrors.name = "Full name must be at least 5 characters";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone || formData.name.length < 11) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    if (!profileCodeRegex.test(formData.profile_code)) {
      newErrors.profile_code = "Profile code must be alphanumeric";
    }

    if (!formData.hometown) {
      newErrors.hometown = "Hometown is required";
    }

    if (!formData.guardian_profession) {
      newErrors.guardian_profession = "Guardian profession is required";
    }

    if (!formData.secondary_school) {
      newErrors.secondary_school = "Secondary school is required";
    }

    if (!formData.preferred_institution) {
      newErrors.preferred_institution = "Preferred institution is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      setMessage("Please fix the errors below.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("ooa_database")
      .insert([formData]);

    if (error) {
      console.error(error);
      setMessage("Error submitting form. Please try again.");
    } else {
      setMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "Male",
        profile_code: "",
        hometown: "",
        guardian_profession: "",
        secondary_school: "",
        preferred_institution: "",
      });
      setErrors({});
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-[#f5faf8]">
        <div className="flex min-h-screen">
          <div className="hidden md:block md:w-[50%]">
            <Image
              src={register}
              alt="Registration"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-10 py-16 md:w-[48%]">
            <h1 className="text-3xl font-semibold text-green-800 mb-2">
              Register With Us
            </h1>
            <p className="text-gray-600 mb-8">
              Our friendly team would love to hear from you.
            </p>

            {message && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  message.includes("successful")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <div>
                <label className="text-sm text-gray-700">FULL NAME *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-700">EMAIL *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm text-gray-700">PHONE NUMBER *</label>
                <input
                  name="phone"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* GENDER */}
              <div>
                <label className="text-sm text-gray-700">GENDER *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* PROFILE CODE */}
              <div>
                <label className="text-sm text-gray-700">PROFILE CODE *</label>
                <input
                  name="profile_code"
                  value={formData.profile_code}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
                {errors.profile_code && (
                  <p className="text-red-500 text-sm">
                    {errors.profile_code}
                  </p>
                )}
              </div>

              {/* OTHER FIELDS */}
              {[
                ["hometown", "HOME TOWN"],
                ["guardian_profession", "GUARDIAN PROFESSION"],
                ["secondary_school", "SECONDARY SCHOOL"],
                ["preferred_institution", "PREFERRED INSTITUTION"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm text-gray-700">{label} *</label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md px-4 py-2"
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-sm">{errors[key]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-white py-3 rounded-md font-medium hover:bg-yellow-700 disabled:opacity-50"
              >
                {loading ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
