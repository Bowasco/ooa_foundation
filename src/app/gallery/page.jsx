import React from "react";
import Image from "next/image";

const page = () => {
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
  return (
    <>
      <section
        className="w-full h-[65vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <h2 className="text-white text-4xl md:text-[60px] font-bold">
            Gallery
          </h2>
          <p className="mt-3 text-white/90 text-lg md:text-[20px]">
            Ogbeni Olajide Awe Foundation
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white aspect-square"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
