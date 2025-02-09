import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MatrixRain from "./Matrix.jsx";

export default function TechnologySection() {
  return (
    <div className="relative min-h-screen" style={{ overflow: "hidden" }}>
      <MatrixRain />

      {/* AI Avatars Section */}
      <div className="relative z-2 py-60 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          <motion.div
            className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent">
              Meet Your AI Companion
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
              Discover a new dimension of interaction with Lucid's AI, tailored
              to understand your unique style and preferences. Experience
              conversations that feel natural, personal, and meaningful.
            </p>

            <motion.button
              className="bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] text-white px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0,212,255,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Experience the Future
            </motion.button>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://media.giphy.com/media/dtjx21QRZ2nrgYz3iA/giphy.gif"
              alt="AI Avatar"
              className="w-3/4 md:w-full max-w-sm rounded-2xl shadow-2xl relative"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(255,102,204,0.3)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Blockchain Section */}
      <div className="relative z-2 py-48 bg-black">
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Blockchain & Trust System
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4">
                Why Blockchain?
              </h3>
              <p className="text-gray-200">
                Prevents scams, ghosting, and manipulation through immutable
                trust systems.
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4">
                NFT Milestones
              </h3>
              <p className="text-gray-200">
                Track and celebrate relationship progress with unique digital
                collectibles.
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4">
                Lucid Tokens (LCT)
              </h3>
              <p className="text-gray-200">
                Power identity verification and earn rewards through engagement.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="relative z-2 py-60 bg-white">
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Relationship Milestones
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              "First Date NFT",
              "Official Relationship NFT",
              "Moving In Together NFT",
              "Marriage NFT",
            ].map((title, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent">
                  {title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
