"use client";

import Image from "next/image";
import { Eye, Target } from "lucide-react";
import founder from "../../public/images/founder.jpg";
import hero from "../../public/images/hero.jpg";
import hero2 from "../../public/images/hero2.jpg";
import partnership from "../../public/images/partnership.jpg";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
      { threshold: 0.3 },
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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={
              index === currentSlide
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.05 }
            }
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
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
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-center mb-6"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl md:text-2xl text-center max-w-3xl"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-[#f5faf8]">
        <div className="grid md:grid-cols-2 min-h-[80vh]">
          <div className="flex items-center px-6 md:px-16 py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <p className="text-[15px] text-gray-500 mb-4 uppercase font-semibold">
                We are Ogbeni Olajide Awe Foundation
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-green-800 leading-snug mb-8">
                Championing education and opportunity to create enduring impact.
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Image
              src={founder}
              alt="Founder of Tanoto Foundation"
              className="h-full w-full object-cover"
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-black/70 p-6 md:p-8"
            >
              <p className="text-white text-sm md:text-base leading-relaxed mb-4">
                &quot;Education is the most powerful tool we can use to change
                the lives. At the Olajide Awe foundation, we believe that every
                child deserves the opportunity to reach their full
                potential.&quot;
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white text-[30px]">
                  Olajide Awe
                </span>
                <br />
                Founder of Ogbeni Olajide Awe Foundation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5faf8] py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">
              Our Purpose
            </h2>
            <p className="text-gray-600">
              Guided by a clear vision and driven by a strong mission, we are
              committed to creating lasting impact through education.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid md:grid-cols-2 gap-10"
          >
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
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
                fostering a society where everyone has access to opportunity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Target className="text-yellow-700" />
                </div>
                <h3 className="text-2xl font-semibold text-green-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower the less privileged through access to quality
                education, skills, and resources for a fulfilling life.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Our Impact in Numbers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-12"
          >
            See how we are transforming lives through education and community
            support
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-bold text-green-700">
                  <AnimatedCounter target={parseInt(impact.number)} />
                  {impact.number.replace(/\d+/g, "")}
                </span>
                <span className="mt-2 text-gray-700 text-center">
                  {impact.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5faf8] py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#356149] mb-4">
              Global Partnerships
            </h2>

            <p className="text-gray-600 mb-8">
              Collaboration is key to achieving greater impact. We build
              partnerships that transcend borders and amplify change.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="border border-[#356149] text-[#356149] px-6 py-3 rounded-md font-medium hover:bg-yellow-600 hover:text-white transition"
            >
              PARTNER WITH US
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={partnership}
              alt="Global Partnerships"
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>

        {/* ===== Modal ===== */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Coming Soon 🚀
                </h3>
                <p className="text-gray-600 mb-6">
                  Our partnership program is currently being set up.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold text-center mb-2"
          >
            Frequently Asked Questions
          </motion.h2>

          <p className="text-center text-gray-600 mb-10">
            Quick answers to common questions
          </p>

          <div className="space-y-4">
            {homeFaqs.map((faq, index) => (
              <div key={index} className="border-b">
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center py-4 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pb-4 text-gray-600 overflow-hidden"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
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
    </div>
  );
}

const homeFaqs = [
  {
    question: "What is the mission of the foundation?",
    answer:
      "Our mission is to empower lives by expanding access to quality education and supporting underserved communities.",
  },
  {
    question: "Who does the foundation support?",
    answer:
      "We support children, youth, and communities from disadvantaged backgrounds.",
  },
  {
    question: "Where does the foundation operate?",
    answer:
      "Our programs operate across selected towns in Oriade Local Government of Osun State.",
  },
  {
    question: "Can I volunteer with the foundation?",
    answer:
      "Yes, we welcome volunteers passionate about education and community development.",
  },
];

const impacts = [
  { number: "300+", label: "Students Supported" },
  { number: "5", label: "Communities Reached" },
  { number: "10+", label: "Partners & Sponsors" },
  { number: "2", label: "Years of Impact" },
  { number: "20+", label: "Volunteers Engaged" },
];
