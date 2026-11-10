import React from "react";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import callFloatIcon from "../../assets/icons/mobile.png";
import { useAboutUs } from "../../context/AboutusContext";
import { motion } from "framer-motion";

const FloatingIcons = () => {
  const { aboutUs, loading, error } = useAboutUs();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-y-3 z-50">
      <motion.a
        href={`https://wa.me/91${aboutUs?.[0]?.mobile}`}
        target="blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 60, scale: 0.7 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.08, 1],
          y: [0, -5, 0],
        }}
        whileHover={{
          scale: 1.18,
          rotate: -10,
          y: -3,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          opacity: { duration: 0.5 },
          x: { duration: 0.6, type: "spring" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-green-500"
          animate={{
            scale: [1, 1.6],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <img src={whatsappIcon} alt="whatsapp" className="w-6 h-6" />
      </motion.a>
      <motion.a
        href={`tel:+91${aboutUs?.[0]?.mobile}`}
        target="blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 60, scale: 0.7 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.08, 1],
          y: [0, -5, 0],
        }}
        whileHover={{
          scale: 1.18,
          rotate: 10,
          y: -3,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          x: { duration: 0.6, delay: 0.2, type: "spring" },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          },
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          },
        }}
        className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-blue-500"
          animate={{
            scale: [1, 1.6],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3,
          }}
        />
        <img src={callFloatIcon} alt="call" className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default FloatingIcons;
