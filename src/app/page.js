"use client"

import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Eye, Target } from "lucide-react";
import founder from "../../public/images/founder.jpeg";
import partnership from "../../public/images/partnership.webp";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <section className="bg-[#f5faf8]">
        <div className="grid md:grid-cols-2 min-h-[80vh]">
          <div className="flex items-center px-6 md:px-16 py-16">
            <div className="max-w-xl">
              <p className="text-[15px] text-gray-500 mb-4 uppercase font-semibold">
                We are Ogbeni Olajide Awe Foundation
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-green-800 leading-snug mb-8">
                Championing education and opportunity to create enduring impact.
              </h1>
            </div>
          </div>

          {/* RIGHT IMAGE + QUOTE */}
          <div className="relative">
            <Image
              src={founder}
              alt="Founder of Tanoto Foundation"
              className="h-full w-[350px] object-cover"
            />

            {/* Quote Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-6 md:p-8">
              <p className="text-white text-sm md:text-base leading-relaxed mb-4">
                “Every person should have the opportunity to realize his or her
                full potential.”
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Olajide Awe</span>
                <br />
                Founder of Ogbeni Olajide Awe Foundation
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f5faf8] py-10">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">
              Our Purpose
            </h2>
            <p className="text-gray-600">
              Guided by a clear vision and driven by a strong mission, we are
              committed to creating lasting impact through education.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Eye className="text-green-800" />
                </div>
                <h3 className="text-2xl font-semibold text-green-800">
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                To create a society where every child, regardless of background,
                has access to quality education and opportunities to succeed.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Target className="text-yellow-700" />
                </div>
                <h3 className="text-2xl font-semibold text-green-800">
                  Our Mission
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                To empower lives, inspire hope, and provide sustainable
                solutions to challenges faced by the less privileged, focusing
                on education as a cornerstone for development. We are committed
                to building a legacy of impact and transformation for
                generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f5faf8] py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">
              Global Partnerships
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              For our programs to achieve greater impact and benefit more
              people, collaboration is key. This is why, we have been building
              multi-sectoral partnerships to enhance knowledge sharing, leverage
              expertise and transcend borders.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="border border-yellow-600 text-yellow-600 px-6 py-3 rounded-md font-medium hover:bg-yellow-600 hover:text-white transition"
            >
              PARTNER WITH US
            </button>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Coming Soon 🚀
                </h3>
                <p className="text-gray-600 mb-6">
                  Our partnership program is currently being set up. Please
                  check back soon.
                </p>

                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Right Image */}
          <Image
            src={partnership}
            alt="Global Partnerships"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
