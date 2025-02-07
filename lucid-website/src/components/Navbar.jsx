import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md py-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div
          className="text-xl font-bold"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent">
            Lucid
          </span>
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
