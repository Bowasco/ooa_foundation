"use client";

import React, { useState } from "react";
import Footer from "../components/Footer";
import Image from "next/image";
import Navbar from "../components/Navbar";
import register from "../../../public/images/register.jpg";
import { supabase } from "@/lib/supabaseClient";

const Page = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("ooa_database")
      .insert([formData]);

    if (error) {
      console.error("Error inserting data:", error);
      setMessage("Error submitting form. Please try again.");
    } else {
      console.log("Data inserted:", data);
      setMessage("Registration successful!");
      // Reset form
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
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-[#f5faf8]">
        <div className="flex justify-between min-h-screen">
          <div className="hidden md:block md:w-[50%]">
            <Image
              src={register}
              alt="Contact Tanoto Foundation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className=" px-10 py-16 md:w-[48%]">
            <div className="w-full">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">
                      EMAIL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email.com"
                      required
                      className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <label className="text-sm text-gray-700">
                      PHONE NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">
                      GENDER <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700">
                    PROFILE CODE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="profile_code"
                    value={formData.profile_code}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">
                    HOME TOWN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleChange}
                    placeholder="Your hometown"
                    required
                    className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">
                    Guardian/Parent &apos; s profession{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="guardian_profession"
                    value={formData.guardian_profession}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-700">
                      Secondary school attended{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="secondary_school"
                      value={formData.secondary_school}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">
                      Preferred tertiary institution{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="preferred_institution"
                      value={formData.preferred_institution}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white py-3 rounded-md font-medium hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
