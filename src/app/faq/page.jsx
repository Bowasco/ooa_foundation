"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faq({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section
        className="w-full h-[65vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <h2 className="text-white text-4xl md:text-[50px] font-bold">
            FREQUENTLY ASKED <br /> QUESTIONS
          </h2>
          <p className="mt-3 text-white/90 text-lg md:text-[20px]">
            Ogbeni Olajide Awe Foundation
          </p>
        </div>
      </section>
      <div className="py-16">
        <div className="mb-10 text-center">
          <h2 className="text-[40px] font-semibold mb-2">
            Frequently Asked <br /> Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our education foundation
          </p>
        </div>
        <div className="space-y-4 w-[90%] m-auto">
          {questions.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const questions = [
  {
    question: "What is the mission of the foundation?",
    answer:
      "Our mission is to empower lives and create lasting impact by expanding access to quality education, supporting underserved communities, and promoting sustainable development initiatives.",
  },
  {
    question: "Who does the foundation support?",
    answer:
      "We support children, youth, and communities from underserved and disadvantaged backgrounds, with a strong focus on education as a pathway to opportunity and growth.",
  },
  {
    question:
      "How can individuals or organizations partner with the foundation?",
    answer:
      "Individuals and organizations can partner with us through collaborations, program sponsorships, volunteering, or knowledge-sharing initiatives. More partnership opportunities will be available soon.",
  },
  {
    question: "Where does the foundation operate?",
    answer:
      "For now, our programs operate across some towns in Oriade local government of Osun State, focusing on areas where access to education futherance is most limited",
  },
  {
    question: "How are programs funded?",
    answer:
      "Our programs are funded through grants, partnerships, and donations from individuals and organizations that share our commitment to educational equity.",
  },
  {
    question: "Does the foundation have an underlying interest in politics?",
    answer:
      " The union is built on trust and integrity from a generous heart and has no interest at all in politics but rather in students, youths and communities see the importance of education and also supporting underserved communities.",
  },
  {
    question: "How does the foundation measure impact?",
    answer:
      "We measure impact through continuous monitoring, evaluations, and outcome-based assessments to ensure our programs deliver meaningful and sustainable results.",
  },
  {
    question: "Can I volunteer with the foundation?",
    answer:
      "Yes, we welcome volunteers who are passionate about education and community development. Volunteer opportunities vary based on ongoing programs and initiatives.",
  },
  {
    question: "How can I contact the foundation?",
    answer:
      "You can reach us through our official email or any of our social media handles. Our team will be happy to respond to your inquiries.",
  },
];
