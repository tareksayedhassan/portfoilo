"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div>
      <motion.div>
        <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] relative mt-9 mix-blend-lighten">
          <Image
            src="/173500860_upscaled-removebg-preview.png"
            alt="personal image"
            priority
            quality={100}
            width={350}
            height={340}
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Photo;
