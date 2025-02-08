import React from "react";
import { motion } from "framer-motion";

export default function AIAvatars() {
  return (
    <section className="py-30 relative overflow-hidden bg-white">
      {/* Gradient overlay for smooth transition */}
      {/* <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white z-0"></div> */}
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Meet Your AI Companion
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover a new dimension of interaction with Lucid’s AI, tailored to
            understand your unique style and preferences.
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-10 py-4 rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience the Future
          </motion.button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="https://media.giphy.com/media/dtjx21QRZ2nrgYz3iA/giphy.gif?cid=ecf05e47rtce7c95ouftawdtn3mxzowb6bs3b68fedufwekg&ep=v1_gifs_related&rid=giphy.gif&ct=g"
            alt="AI Avatar"
            className="w-3/4 md:w-full max-w-sm rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
