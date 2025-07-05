"use client";
import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  const stats = [
    {
      num: 2,
      text: "Years of experience",
    },
    {
      num: 15,
      text: "Projects Completed",
    },
    {
      num: 18,
      text: "Technologies mastered",
    },
    {
      num: 300,
      text: "Code commits",
    },
  ];
  return (
    <section className="pt-4 pb-12 xl:pt-0">
      <div className="container mx-auto">
        <div className="stats-container">
          {stats.map((item, key) => (
            <div className="stats-item" key={key}>
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-3xl sm:text-4xl xl:text-6xl font-extrabold text-white"
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80 text-sm sm:text-base`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
