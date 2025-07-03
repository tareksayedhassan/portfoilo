"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { ReactNode } from "react";

interface PageTransitionsProps {
  children: ReactNode;
}

const PageTransitions = ({ children }: PageTransitionsProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }} // يبدأ مخفي
        animate={{ opacity: 1 }} // يظهر
        exit={{ opacity: 0 }} // لما يخرج، يختفي
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitions;
