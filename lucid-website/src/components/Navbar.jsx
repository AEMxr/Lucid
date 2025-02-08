import React from "react";

export default function Navbar() {
  return (
    <nav
      className="shadow-md py-4 fixed w-full z-50 opacity-80"
      style={{ backgroundColor: "#130E1C" }}
    >
      <div className="container mx-auto flex justify-between items-center px-6 ">
        <div className="text-xl font-bold">
          <img
            src="/images/LucidLogo.png"
            alt="Lucid Logo"
            className="h-10 w-auto"
          />
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
