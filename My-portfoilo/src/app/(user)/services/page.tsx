"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import useSWR from "swr";
import { BASE_URL, GET_ALL_SERVICES } from "@/ApiCalld/Api";
import { fetcher } from "@/ApiCalld/fetcher";
import Link from "next/link";

const Services = () => {
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/${GET_ALL_SERVICES}`,
    fetcher
  );

  const services = data?.data ?? [];

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading services</p>;

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.5, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[40px]"
        >
          {services.map((item: any, key: number) => (
            <div
              key={key}
              className="space-y-4 p-4 rounded-lg bg-white/5 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  {item.num}
                </span>
                <Link href={item.link ?? "#"} target="_blank">
                  <BsArrowDownRightCircleFill className="text-2xl text-blue-500 hover:text-blue-600 transition" />
                </Link>
              </div>
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
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
