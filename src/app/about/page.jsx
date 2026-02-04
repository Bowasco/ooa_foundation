"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <>
      <section
        className="w-full h-[65vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-[60px] font-bold"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 text-white/90 text-lg md:text-[20px]"
          >
            Ogbeni Olajide Awe Foundation
          </motion.p>
        </div>
      </section>

      <main className="bg-gray-50 min-h-screen py-12 px-6 sm:px-12 lg:px-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Profile of The Ogbeni Olajide Awe Foundation
          </h1>

          <p className="mb-4 text-gray-700">
            The Ogbeni Olajide Awe Foundation is a non-profit organization
            dedicated to empowering lives and creating opportunities for the
            less privileged. Established by Chief Olajide Awe, Ariwajoye of
            Iwoye-Ijesa Kingdom, the foundation seeks to bridge gaps in access
            to education, alleviate poverty, and inspire hope through impactful
            initiatives.
          </p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">Vision</h2>
            <p className="mb-4 text-gray-700">
              To be a beacon of hope and empowerment, transforming lives and
              fostering a society where every individual has access to
              opportunities for growth and development.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">Mission</h2>
            <p className="mb-4 text-gray-700">
              To empower the less privileged by providing access to quality
              education, skill acquisition, and resources enabling them to be
              better and live a more fulfilling life.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">Core Values</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>
                <strong>Empathy:</strong> Putting the needs of others first.
              </li>
              <li>
                <strong>Integrity:</strong> Operating with transparency and
                accountability.
              </li>
              <li>
                <strong>Excellence:</strong> Ensuring the highest standards in
                all initiatives.
              </li>
              <li>
                <strong>Impact:</strong> Creating meaningful and sustainable
                change.
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">
              History and Milestones
            </h2>
            <p className="mb-4 text-gray-700">
              The foundation was virtually launched on January 3, 2024, to
              commemorate Chief Olajide Awe's 44th birthday. During the virtual
              launch, 100 UTME registration forms were distributed to
              underprivileged candidates, along with enrollment in tutorial
              classes to prepare them for their exams.
            </p>
            <p className="mb-4 text-gray-700">
              On January 3, 2025, the foundation was physically launched in a
              grand ceremony that further cemented its commitment to education
              and empowerment. At the event, the foundation distributed 250 UTME
              registration forms to deserving candidates, reaffirming its
              mission to provide opportunities for academic advancement.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Programs and Initiatives
            </h2>
            <p className="mb-2 text-gray-700">
              <strong>1. Educational Support:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>Provision of UTME registration forms.</li>
              <li>
                Sponsorship of tutorials and mentoring programs for students.
              </li>
              <li>
                Scholarships and school supplies for underprivileged students.
              </li>
            </ul>

            <p className="mb-2 text-gray-700">
              <strong>2. Skill Acquisition and Capacity Building:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>
                Organizing workshops and training programs to equip individuals
                with practical skills.
              </li>
              <li>Supporting entrepreneurship through grants and mentoring.</li>
            </ul>

            <p className="mb-2 text-gray-700">
              <strong>3. Community Development Projects:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>
                Partnering with communities to address pressing social and
                economic challenges.
              </li>
              <li>
                Initiating programs to promote health, hygiene, and welfare.
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">Leadership</h2>
            <p className="mb-4 text-gray-700">
              The foundation is led by Chief Olajide Awe, a visionary leader and
              philanthropist passionate about creating equitable opportunities
              for all. His dedication to community service stems from his desire
              to give back to society and uplift those in need.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Impact and Future Plans
            </h2>
            <p className="mb-4 text-gray-700">
              Since its inception, The Ogbeni Olajide Awe Foundation has touched
              countless lives through its educational and empowerment programs.
              Looking ahead, the foundation aims to expand its reach by
              establishing partnerships, increasing its beneficiary base, and
              exploring innovative ways to address societal challenges.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Contact Information
            </h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>
                Email:{" "}
                <a
                  href="mailto:ooafoundation4all@gmail.com"
                  className="text-blue-600 underline"
                >
                  ooafoundation4all@gmail.com
                </a>
              </li>
              <li>
                Phone: 08032166218 (WhatsApp only), 09131821538 (Calls & Text)
              </li>
              <li>
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/official_ooafoundation"
                  className="text-blue-600 underline"
                >
                  @official_ooafoundation
                </a>
              </li>
            </ul>
          </motion.div>

          <p className="mt-6 text-gray-800 font-semibold text-center">
            The Ogbeni Olajide Awe Foundation is more than an organization; it
            is a movement of hope, empowerment, and transformation. Together, we
            can create a brighter future for all.
          </p>
        </motion.div>
      </main>
    </>
  );
}
