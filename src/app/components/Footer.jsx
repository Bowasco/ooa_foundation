import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../../../public/images/logo.jpg"
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#3f4f44] text-white pt-16 pb-6">
      <div className="container mx-auto px-6 grid gap-10 md:grid-cols-4">
        <div className="space-y-[20px]">
          <Image
            src={logo}
            alt="Foundation Logo"
            className="w-[180px] h-[120px]"
          />
          <p className="text-sm text-gray-300 leading-relaxed">
            We harness the transformative power of education to realize people &apos;s
            full potential.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-yellow-400 mb-4 uppercase">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/register" className="hover:text-white">
                Register with us
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            {/* <li>
              <a className="hover:text-white">
                Our Work
              </a>
            </li> */}
            {/* <li>
              <a className="hover:text-white">
                Our Partners
              </a>
            </li> */}
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-white">
                Gallery
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-yellow-400 mb-4 uppercase">
            Programs
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Education</li>
            <li>Healthcare</li>
            <li>Leadership Development</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-yellow-400 mb-4 uppercase">
            Get in Touch
          </h4>

          <p className="text-sm text-gray-300 mb-4">
            ooafoundation4all@gmail.com
          </p>

          <p className="text-sm text-gray-300 mb-4">+234 812 293 9984</p>

          <ul className="flex gap-4">
            <Link
              href={"https://www.facebook.com/share/1bKLB1AzKJ/?mibextid=wwXIfr"}
              className="p-2 bg-white/10 rounded hover:bg-white/20"
            >
              <FaFacebookF />
            </Link>
            <Link
              href={
                "https://www.instagram.com/official_ooafoundation?igsh=dmo1aWZpNWExMXlr&utm_source=qr"
              }
              className="p-2 bg-white/10 rounded hover:bg-white/20"
            >
              <FaInstagram />
            </Link>
            <Link
              href={"https://x.com/iamolajideawe?s=21"}
              className="p-2 bg-white/10 rounded hover:bg-white/20"
            >
              <FaXTwitter />
            </Link>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
        © 2026 Ogbeni Olajide Awe Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
