import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://storage.googleapis.com/uxpilot-auth.appspot.com/a04128c538-688366594f764559f8d8.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-65 filter blur-lg"></div>
      <div className="relative text-center px-6 py-8">
        <motion.h1
          className="text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Match. Connect. Own Your Future.
        </motion.h1>
        <motion.p
          className="text-xl text-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          AI-powered matchmaking, blockchain-backed trust, and tokenized
          relationships—welcome to Lucid.
        </motion.p>
        <div className="space-x-4">
          <motion.button
            className="bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Get Early Access Now
          </motion.button>
          <motion.button
            className="border border-cyan-500 text-cyan-500 px-8 py-3 rounded-full hover:bg-cyan-500 hover:text-white transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            See How It Works
          </motion.button>
        </div>
      </div>
    </section>
  );
}
