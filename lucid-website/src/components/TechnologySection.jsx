import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;

    const binary = "10";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns))
      .fill(1)
      .map(() => Math.random() * -100);

    function draw() {
      const gradient = ctx.createLinearGradient(0, 0, 0, 100);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.random() * binary.length);
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (i % 2 === 0) {
          ctx.fillStyle = "#00D4FF";
        } else {
          ctx.fillStyle = "#FF66CC";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 100);
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity: 0.4, zIndex: 0 }}
    />
  );
};

export default function TechnologySection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-white via-5% to-black">
      <MatrixRain />

      {/* AI Avatars Section */}
      <div className="relative z-10 py-60">
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
      <div className="relative z-10 py-48">
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className="text-5xl font-bold mb-12 px-8 py-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              WebkitTextStroke: "1px rgba(0, 0, 0, 0.8)",
              textShadow: `
      0 0 15px rgba(255, 102, 204, 0.7),
      0 0 25px rgba(0, 212, 255, 0.7)
    `,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "16px",
              filter: "brightness(1.2) saturate(1.4)",
              background: "linear-gradient(to right, #00D4FF, #FF66CC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Blockchain & Trust System
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
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
      <div className="relative z-10 py-48">
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
                className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20"
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
