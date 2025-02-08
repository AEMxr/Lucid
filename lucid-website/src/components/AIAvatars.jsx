import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = "10";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00D4FF";
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
    }

    const interval = setInterval(draw, 33);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default function AIAvatars() {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <MatrixRain />
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 relative z-10">
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent">
            Meet Your AI Companion
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover a new dimension of interaction with Lucid's AI, tailored to
            understand your unique style and preferences. Experience
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
    </section>
  );
}
