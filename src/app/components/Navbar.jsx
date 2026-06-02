"use client";

import React, { useState } from "react";
import logo from "../../../public/images/logo.jpg";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/register", label: "Register with us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/academy", label: "Arise Academy" },
  ];

  const linkClass = (href) =>
    `hover:text-green-800 cursor-pointer transition-all duration-200 ${
      pathname === href
        ? "text-green-800 font-semibold border-b-2 border-green-800 pb-0.5"
        : "text-gray-700"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={"/"} className="text-xl font-semibold text-green-800">
          <Image src={logo} alt="" className="w-[100px] h-[40px]" />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-[15px]">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => setModalOpen(true)}
            className="border border-[#356149] text-[#356149] px-5 py-2 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white hover:border-0 transition-all duration-300 ease-in-out"
          >
            Partner With Us
          </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Coming Soon 🚀
              </h3>
              <p className="text-gray-600 mb-6">
                Our partnership program is currently being set up. Please check
                back soon.
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

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => setModalOpen(true)}
              className="border border-[#356149] text-[#356149] px-5 py-2 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white hover:border-0 transition-all duration-300 ease-in-out"
            >
              Partner With Us
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
