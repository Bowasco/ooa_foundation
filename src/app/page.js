"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Eye, Target } from "lucide-react";
import founder from "../../public/images/founder.jpg";
import hero from "../../public/images/hero.jpg";
import hero2 from "../../public/images/hero2.jpg";
import partnership from "../../public/images/partnership.jpg";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(target * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const slides = [
    {
      image: founder,
      title: "Leave no child behind",
      subtitle: "Let's give a voice to orphans and vulnerable children",
    },
    {
      image: hero,
      title: "Education for all",
      subtitle: "Every child deserves access to quality education",
    },
    {
      image: hero2,
      title: "Building futures together",
      subtitle: "Join us in making a lasting impact on children's lives",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
            </div>

            <div className="absolute inset-0 bg-black/50 z-10"></div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-center max-w-3xl animate-fade-in-delay">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

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

          <div className="relative">
            <Image
              src={founder}
              alt="Founder of Tanoto Foundation"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-6 md:p-8">
              <p className="text-white text-sm md:text-base leading-relaxed mb-4">
               &quot;Education is the most powerful tool we can use to change the
                lives. At the Olajide Awe foundation, we believe that every
                child deserves the opportunity to reach their full potential.&quot;
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white text-[30px]">
                  Olajide Awe
                </span>
                <br />
                Founder of Ogbeni Olajide Awe Foundation
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5faf8] py-10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">
              Our Purpose
            </h2>
            <p className="text-gray-600">
              Guided by a clear vision and driven by a strong mission, we are
              committed to creating lasting impact through education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
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
                To be a beacon of hope and empowerment, transforming lives and
                fostering a society where every individual has access to
                opportunities for growth and development
              </p>
            </div>

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
                To empower the less privileged by providing access to quality
                education, skill acquisition, and resources enabling them to be
                better and live a more fulfilling life
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 mb-12">
            See how we are transforming lives through education and community
            support
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold text-green-700">
                  <AnimatedCounter target={parseInt(impact.number)} />
                  {impact.number.replace(/\d+/g, '')}
                </span>
                <span className="mt-2 text-gray-700 text-center">
                  {impact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5faf8] py-10">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
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

          <Image
            src={partnership}
            alt="Global Partnerships"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-[45px] font-semibold text-center mb-2">
            Frequently Asked <br /> Questions
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Quick answers to common questions
          </p>

          <div className="space-y-4">
            {homeFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center py-4 text-left"
                >
                  <span className="font-medium text-black">{faq.question}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeIndex === index && (
                  <p className="pb-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-green-700 font-medium hover:underline"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const homeFaqs = [
  {
    question: "What is the mission of the foundation?",
    answer:
      "Our mission is to empower lives and create lasting impact by expanding access to quality education and supporting underserved communities.",
  },
  {
    question: "Who does the foundation support?",
    answer:
      "We support children, youth, and communities from underserved and disadvantaged backgrounds through education-focused initiatives.",
  },
  {
    question: "Where does the foundation operate?",
    answer:
      "Our programs currently operate across selected towns in Oriade Local Government of Osun State.",
  },
  {
    question: "Can I volunteer with the foundation?",
    answer:
      "Yes. We welcome volunteers who are passionate about education and community development.",
  },
  {
    question:
      "How can individuals or organizations partner with the foundation?",
    answer:
      "You can partner with us through collaborations, sponsorships, volunteering, or knowledge-sharing initiatives.",
  },
];

const impacts = [
  { number: "300+", label: "Students Supported" },
  { number: "5", label: "Communities Reached" },
  { number: "10+", label: "Partners & Sponsors" },
  { number: "2", label: "Years of Impact" },
  { number: "20+", label: "Volunteers Engaged" },
];