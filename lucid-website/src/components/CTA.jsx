import React from "react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Your Future Match is Waiting. Are You In?
        </h2>
        <button className="bg-cyan-500 text-white px-12 py-4 rounded-full hover:bg-cyan-600 transition transform hover:scale-105">
          Join Now – Limited Early Access
        </button>
      </div>
    </section>
  );
}
