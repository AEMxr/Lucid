import React from "react";
import VideoBackground from "./VideoBackground";

export default function CTA() {
  return (
    <section
      className="h-screen relative overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 51 }}>
        <VideoBackground />
      </div>
      <div
        className="absolute inset-0 bg-black/50"
        style={{ zIndex: 52 }}
      ></div>
      <div className="container mx-auto text-center px-6 relative z-53 h-full flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Your Future Match is Waiting. Are You In?
        </h2>
        <button className="inline-block mx-auto bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition transform hover:scale-105">
          Join Now – Limited Early Access
        </button>
      </div>
    </section>
  );
}
