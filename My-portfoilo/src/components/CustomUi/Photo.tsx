"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-auto relative flex justify-center items-center bg-[var(--primary)] isolate">
      <motion.svg
        className="absolute w-[280px] sm:w-[300px] xl:w-[506px] h-[280px] sm:h-[300px] xl:h-[506px]"
        fill="transparent"
        viewBox="0 0 506 506"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="253"
          cy="253"
          r="250"
          stroke="#00ff99"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "24 10 0 0" }}
          animate={{
            strokeDasharray: ["15 120 25 25", "16 25 92 72"],
            rotate: [0, 360],
            transition: { duration: 6, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>

      {/* الصورة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
        }}
        className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] xl:w-[506px] xl:h-[506px] relative mix-blend-lighten will-change-transform-opacity"
      >
        <Image
          src="/173500860_upscaled-removebg-preview.png"
          alt="personal image"
          priority
          quality={85}
          width={506}
          height={506}
          className="object-cover w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default Photo;
