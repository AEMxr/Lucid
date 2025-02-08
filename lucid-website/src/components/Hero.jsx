import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Hero.css";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        const videoDuration = videoRef.current.duration;
        const scrollMax = document.body.scrollHeight - window.innerHeight;
        const frame = ((scrollPosition / scrollMax) * videoDuration) / 1.75;
        videoRef.current.currentTime = frame;
      }
    }, 75); // Adjust the throttle limit as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="video-background"
        src="../public/images/videos/romance1.mp4"
        type="video/mp4"
        muted
        playsInline
      />
      <section className="hero-section relative h-screen flex items-center justify-center">
        {/* <div className="absolute inset-0 bg-black opacity-75 filter blur-lg"></div> */}
        <div className="relative text-center px-6 py-8">
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mb-4"
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
              className="bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              Get Early Access Now
            </motion.button>
            <motion.button
              className="border border-cyan-500 text-cyan-500 px-8 py-3 rounded-full hover:bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] hover:text-white transition transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              See How It Works
            </motion.button>
          </div>
        </div>
      </section>
      <section className="how-it-works-section relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text mb-12">
            Discover Your Path to Connection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              className="p-8 bg-gradient-to-br from-[#1F1B24] to-[#2D2A35] rounded-xl shadow-lg transform hover:-translate-y-2 pulsate"
              whileHover={{
                scale: 1.05,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)" }}
            >
              <svg
                className="w-20 h-20 mx-auto mb-6 text-[#00D4FF]"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="house"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#FF66CC"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                ></path>
              </svg>
              <h3 className="text-3xl font-semibold text-white mb-4">
                Join the Movement
              </h3>
              <p className="text-lg text-gray-400">
                Embark on your journey with Lucid. Sign up and unlock the
                potential of AI-driven connections.
              </p>
            </motion.div>
            <motion.div
              className="p-8 bg-gradient-to-br from-[#1F1B24] to-[#2D2A35] rounded-xl shadow-lg transform hover:-translate-y-2 pulsate"
              whileHover={{
                scale: 1.05,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)" }}
            >
              <svg
                className="w-20 h-20 mx-auto mb-6 text-[#00D4FF]"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="users"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                ></path>
              </svg>
              <h3 className="text-3xl font-semibold text-white mb-4">
                Forge Meaningful Bonds
              </h3>
              <p className="text-lg text-gray-400">
                Connect with like-minded individuals through our advanced
                matchmaking system.
              </p>
            </motion.div>
            <motion.div
              className="p-8 bg-gradient-to-br from-[#1F1B24] to-[#2D2A35] rounded-xl shadow-lg transform hover:-translate-y-2 pulsate"
              whileHover={{
                scale: 1.05,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)" }}
            >
              <svg
                className="w-20 h-20 mx-auto mb-6 text-[#FF66CC]"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="heart"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                ></path>
              </svg>
              <h3 className="text-3xl font-semibold text-white mb-4">
                Embrace Your Future
              </h3>
              <p className="text-lg text-gray-400">
                Experience the power of blockchain-backed trust and tokenized
                relationships.
              </p>
            </motion.div>
          </div>
          <div className="mt-12">
            <motion.button
              className="bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
