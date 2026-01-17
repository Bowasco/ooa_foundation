"use client";

import React, { useState } from "react";
import Image from "next/image";
import register from "../../../public/images/register.jpg";
import { supabase } from "@/lib/supabaseClient";

/* ================= REGEX ================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    jamb_score: "",
    hometown: "",
    guardian_profession: "",
    secondary_school: "",
    preferred_institution: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers for phone, jamb_score, and profile_code
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else if (name === "jamb_score") {
      const numericValue = value.replace(/\D/g, "");
      // Ensure JAMB score doesn't exceed 400
      if (numericValue === "" || parseInt(numericValue) <= 400) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else if (name === "profile_code") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 5) {
      newErrors.name = "Full name must be at least 5 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "Phone number must be exactly 11 digits";
    }

    // Profile code validation
    if (!formData.profile_code) {
      newErrors.profile_code = "Profile code is required";
    } else if (formData.profile_code.length !== 10) {
      newErrors.profile_code = "Profile code must be 10 digits";
    }

    // JAMB score validation
    if (!formData.jamb_score) {
      newErrors.jamb_score = "JAMB score is required";
    } else if (parseInt(formData.jamb_score) < 50) {
      newErrors.jamb_score = "JAMB score must be at least 50";
    } else if (parseInt(formData.jamb_score) > 400) {
      newErrors.jamb_score = "JAMB score cannot exceed 400";
    }

    // Hometown validation
    if (!formData.hometown.trim()) {
      newErrors.hometown = "Hometown is required";
    }

    // Guardian profession validation
    if (!formData.guardian_profession.trim()) {
      newErrors.guardian_profession = "Guardian profession is required";
    }

    // Secondary school validation
    if (!formData.secondary_school.trim()) {
      newErrors.secondary_school = "Secondary school is required";
    }

    // Preferred institution validation
    if (!formData.preferred_institution.trim()) {
      newErrors.preferred_institution = "Preferred institution is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (!validateForm()) {
      setMessage("Please fix the errors below.");
      return;
    }

    setLoading(true);

    try {
      // Trim all text fields before submitting
      const cleanedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone,
        gender: formData.gender,
        profile_code: formData.profile_code,
        jamb_score: parseInt(formData.jamb_score),
        hometown: formData.hometown.trim(),
        guardian_profession: formData.guardian_profession.trim(),
        secondary_school: formData.secondary_school.trim(),
        preferred_institution: formData.preferred_institution.trim(),
      };

      const { error } = await supabase
        .from("ooa_database")
        .insert([cleanedData]);

      if (error) {
        console.error("Supabase error:", error);
        
        // Check for specific error types
        if (error.code === "23505") {
          setMessage("This email or profile code is already registered.");
        } else {
          setMessage("Error submitting form. Please try again.");
        }
      } else {
        setMessage("Registration Successful!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "Male",
          profile_code: "",
          jamb_score: "",
          hometown: "",
          guardian_profession: "",
          secondary_school: "",
          preferred_institution: "",
        });
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="min-h-screen bg-[#f5faf8]">
        <div className="flex min-h-screen">
          {/* Image Section */}
          <div className="hidden md:block md:w-[50%]">
            <Image
              src={register}
              alt="OOA Foundation Registration"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="px-6 md:px-10 py-8 md:py-16 md:w-[50%] overflow-y-auto">
            <h1 className="text-3xl font-semibold text-green-800 mb-2">
              Register With Us
            </h1>
            <p className="text-gray-600 mb-8">
              Our friendly team would love to hear from you.
            </p>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  message.includes("successful")
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* FULL NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example@email.com"
                  maxLength={100}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* PHONE NUMBER */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="08012345678"
                  maxLength={11}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* GENDER */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GENDER *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* PROFILE CODE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PROFILE CODE *
                </label>
                <input
                  type="tel"
                  name="profile_code"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.profile_code}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.profile_code ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter profile code"
                  maxLength={10}
                />
                {errors.profile_code && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profile_code}
                  </p>
                )}
              </div>

              {/* JAMB SCORE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  JAMB SCORE *
                </label>
                <input
                  type="tel"
                  name="jamb_score"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.jamb_score}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.jamb_score ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter JAMB score (0-400)"
                  maxLength={3}
                />
                {errors.jamb_score && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jamb_score}
                  </p>
                )}
              </div>

              {/* HOMETOWN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HOMETOWN *
                </label>
                <input
                  type="text"
                  name="hometown"
                  value={formData.hometown}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.hometown ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your hometown"
                  maxLength={100}
                />
                {errors.hometown && (
                  <p className="text-red-500 text-sm mt-1">{errors.hometown}</p>
                )}
              </div>

              {/* GUARDIAN PROFESSION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GUARDIAN PROFESSION *
                </label>
                <input
                  type="text"
                  name="guardian_profession"
                  value={formData.guardian_profession}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.guardian_profession
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter guardian's profession"
                  maxLength={100}
                />
                {errors.guardian_profession && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.guardian_profession}
                  </p>
                )}
              </div>

              {/* SECONDARY SCHOOL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SECONDARY SCHOOL *
                </label>
                <input
                  type="text"
                  name="secondary_school"
                  value={formData.secondary_school}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.secondary_school
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your secondary school"
                  maxLength={150}
                />
                {errors.secondary_school && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.secondary_school}
                  </p>
                )}
              </div>

              {/* PREFERRED INSTITUTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PREFERRED INSTITUTION *
                </label>
                <input
                  type="text"
                  name="preferred_institution"
                  value={formData.preferred_institution}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.preferred_institution
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter preferred institution"
                  maxLength={150}
                />
                {errors.preferred_institution && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferred_institution}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-white cursor-pointer py-3 rounded-md font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    SUBMITTING...
                  </span>
                ) : (
                  "SUBMIT"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;