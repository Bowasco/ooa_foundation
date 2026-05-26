"use client"

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 20;

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const galleryImages = [
    { id: 48, src: "/images/46.jpg", alt: "Event 48" },
    { id: 47, src: "/images/45.jpg", alt: "Event 47" },
    { id: 1, src: "/images/1.jpg", alt: "Event 1" },
    { id: 2, src: "/images/2.jpg", alt: "Event 2" },
    { id: 3, src: "/images/3.jpg", alt: "Event 3" },
    { id: 4, src: "/images/4.jpg", alt: "Event 4" },
    { id: 5, src: "/images/5.jpg", alt: "Event 5" },
    { id: 6, src: "/images/6.jpg", alt: "Event 6" },
    { id: 7, src: "/images/7.jpg", alt: "Event 7" },
    { id: 8, src: "/images/8.jpg", alt: "Event 8" },
    { id: 9, src: "/images/9.jpg", alt: "Event 9" },
    { id: 10, src: "/images/10.jpg", alt: "Event 10" },
    { id: 11, src: "/images/11.jpg", alt: "Event 11" },
    { id: 12, src: "/images/13.jpg", alt: "Event 12" },
    { id: 13, src: "/images/14.jpg", alt: "Event 13" },
    { id: 14, src: "/images/15.jpg", alt: "Event 14" },
    { id: 15, src: "/images/16.jpg", alt: "Event 15" },
    { id: 16, src: "/images/17.jpg", alt: "Event 16" },
    { id: 17, src: "/images/18.jpg", alt: "Event 17" },
    { id: 18, src: "/images/19.jpg", alt: "Event 18" },
    { id: 19, src: "/images/20.jpg", alt: "Event 19" },
    { id: 20, src: "/images/21.jpg", alt: "Event 20" },
    { id: 21, src: "/images/22.jpg", alt: "Event 21" },
    { id: 22, src: "/images/23.jpg", alt: "Event 22" },
    { id: 23, src: "/images/24.jpg", alt: "Event 23" },
    { id: 24, src: "/images/25.jpg", alt: "Event 24" },
    { id: 25, src: "/images/26.jpg", alt: "Event 25" },
    { id: 26, src: "/images/27.jpg", alt: "Event 26" },
    { id: 27, src: "/images/28.jpg", alt: "Event 27" },
    { id: 28, src: "/images/29.jpg", alt: "Event 28" },
    { id: 29, src: "/images/30.jpg", alt: "Event 29" },
    { id: 30, src: "/images/31.jpg", alt: "Event 30" },
    { id: 31, src: "/images/32.jpg", alt: "Event 31" },
    { id: 32, src: "/images/33.jpg", alt: "Event 32" },
    { id: 33, src: "/images/34.jpg", alt: "Event 33" },
    { id: 34, src: "/images/35.jpg", alt: "Event 34" },
    { id: 35, src: "/images/36.jpg", alt: "Event 35" },
    { id: 36, src: "/images/37.jpg", alt: "Event 36" },
    { id: 37, src: "/images/38.jpg", alt: "Event 37" },
    { id: 38, src: "/images/39.jpg", alt: "Event 38" },
    { id: 39, src: "/images/40.jpg", alt: "Event 39" },
    { id: 40, src: "/images/41.jpg", alt: "Event 40" },
    { id: 41, src: "/images/42.jpg", alt: "Event 41" },
    { id: 42, src: "/images/43.jpg", alt: "Event 42" },
    { id: 43, src: "/images/44.jpg", alt: "Event 43" },
    { id: 50, src: "/images/hero2.jpg", alt: "Event 50" },
    { id: 44, src: "/images/about-hero.jpg", alt: "Event 44" },
    { id: 45, src: "/images/founder.jpg", alt: "Event 45" },
    { id: 46, src: "/images/hero.jpg", alt: "Event 46" },
    { id: 49, src: "/images/47.jpg", alt: "Event 49" },
  ];

  const totalPages = Math.ceil(galleryImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = galleryImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <section
        className="w-full h-[65vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <h2 className="text-white text-4xl md:text-[60px] font-bold">Gallery</h2>
          <p className="mt-3 text-white/90 text-lg md:text-[20px]">
            Ogbeni Olajide Awe Foundation
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-100 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {currentImages.map((image) => (
              <motion.div
                key={image.id}
                variants={item}
                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white aspect-square"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10 pb-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-green-800 hover:text-white hover:border-green-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-9 h-9 rounded-md text-sm font-medium border transition-all duration-200 ${
                currentPage === page
                  ? "bg-green-800 text-white border-green-800"
                  : "border-gray-300 text-gray-600 hover:bg-green-800 hover:text-white hover:border-green-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-green-800 hover:text-white hover:border-green-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 pb-8">
          Page {currentPage} of {totalPages} · {galleryImages.length} photos
        </p>
      </div>
    </>
  );
};

export default page;