"use client"

import React, { useState } from "react";
import logo from "../../../public/images/logo.jpg"
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="text-xl font-semibold text-green-800">
          <Image src={logo} alt="" className="w-[100px] h-[40px]" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <Link href={"/about"} className="hover:text-green-800 cursor-pointer">About Us</Link>
          {/* <Link className="hover:text-green-800 cursor-pointer">Our Work</Link> */}
          <Link
            href={"/register"}
            className="hover:text-green-800 cursor-pointer"
          >
            Register with us
          </Link>
          <button className="hover:text-green-800 cursor-pointer">
            Our Partners
          </button>
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => setModalOpen(true)}
            className="border border-yellow-600 text-yellow-600 px-5 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 hover:text-white transition"
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

        {/* Mobile Menu Button */}
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
          <ul className="flex flex-col gap-4 px-6 py-6 text-gray-700 text-sm">
            <Link href={"/about"}>About Us</Link>
            {/* <li>Our Work</li> */}
            {/* <li>Programs</li> */}
            <Link href={"/register"}>Register with us</Link>
            <li>Our Partners</li>

            <button className="mt-4 border border-yellow-600 text-yellow-600 px-5 py-2 rounded-md text-sm font-medium">
              Partner With Us
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
