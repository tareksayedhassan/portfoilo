"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";

const Services = () => {
  const services = [
    {
      num: "01",
      title: "Web Development",
      description:
        "Building responsive and dynamic websites using modern technologies like HTML, CSS, JavaScript, and React.",
      href: "/web-development",
    },
    {
      num: "02",
      title: "Backend Development",
      description:
        "Creating robust backend solutions with Node.js, Express, and databases like MongoDB or MySQL.",
      href: "/backend-development",
    },
    {
      num: "03",
      title: "Full Stack Development",
      description:
        "End-to-end development for both front-end and back-end, delivering complete applications with React and Node.js.",
      href: "/full-stack-development",
    },
    {
      num: "04",
      title: "UI/UX Design",
      description:
        "Crafting beautiful, user-friendly interfaces with a focus on intuitive design and seamless user experience.",
      href: "/ui-ux-design",
    },
    {
      num: "05",
      title: "SEO Optimization",
      description:
        "Improving search engine ranking through effective SEO strategies and performance optimization.",
      href: "/seo-optimization",
    },
    {
      num: "06",
      title: "API Development",
      description:
        "Creating and managing APIs for seamless communication between services.",
      href: "/api-development",
    },
  ];

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[40px]"
        >
          {services.map((item, key) => (
            <div key={key} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  {item.num}
                </span>
                <Link href={item.href}>
                  <BsArrowDownRightCircleFill className="text-2xl text-blue-500 hover:text-blue-600 transition" />
                </Link>
              </div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-white/80">{item.description}</p>
              <div className="border-b border-white/20 w-full"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
