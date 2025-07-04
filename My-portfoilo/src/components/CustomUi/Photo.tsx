"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      {/* الدائرة SVG */}
      <motion.svg
        className="absolute w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
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
            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
            rotate: [0, 360],
            transition: { duration: 8, repeat: Infinity, ease: "linear" }, // زيادة المدة لـ 8 ثواني
          }}
        />
      </motion.svg>

      {/* الصورة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
        className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] relative mix-blend-lighten"
      >
        <Image
          src="/173500860_upscaled-removebg-preview.png"
          alt="personal image"
          priority
          quality={100}
          width={350}
          height={340}
          className="object-contain w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default Photo;
