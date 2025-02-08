import React from "react";
import { motion } from "framer-motion";
import { MatrixRain } from "./TechnologySection"; // Import the MatrixRain component

export default function Blockchain() {
  return (
    <section className="py-20 relative bg-gradient-to-b from-white via-white to-black">
      <MatrixRain />
      <div className="container mx-auto text-center px-6 relative z-10">
        <motion.h2
          className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blockchain & Trust System
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4">
              Why Blockchain?
            </h3>
            <p className="text-gray-600">
              Prevents scams, ghosting, and manipulation through immutable trust
              systems.
            </p>
          </motion.div>

          <motion.div
            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4">
              NFT Milestones
            </h3>
            <p className="text-gray-600">
              Track and celebrate relationship progress with unique digital
              collectibles.
            </p>
          </motion.div>

          <motion.div
            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4">
              Lucid Tokens (LCT)
            </h3>
            <p className="text-gray-600">
              Power identity verification and earn rewards through engagement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
