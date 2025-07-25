"use client";
import PageTransitions from "@/components/CustomUi/PageTransitions";
import Photo from "@/components/CustomUi/Photo";
import Socials from "@/components/CustomUi/Socials";
import StairTransition from "@/components/CustomUi/StairTransition";
import Stats from "@/components/CustomUi/Stats";
import Header from "@/components/CustomUi/header";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import "./home.css";
const HomePage = () => {
  return (
    <PageTransitions>
      <StairTransition />
      <Header />
      <div className="h-1.5 sm:h-1.5 xl:h-1.5"></div>
      <section className="home-section h-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 gap-8">
            {/* text */}
            <div className="home-text text-center xl:text-left text-white order-2 xl:order-1">
              <span className="text-xl">Full Stack Developer</span>
              <h1 className="h1 ">
                Hello I'm <br />{" "}
                <span className="text-[#00ff99]">Tarek Elsayed</span>
              </h1>
              <p className="max-w-[500px] text-white/80">
                "I thrive on building full-stack applications from scratch,
                turning ideas into seamless user experiences."
              </p>
              <p className="max-w-[500px] text-white/80">
                "Passionate about crafting complete projects, combining both
                front-end and back-end to create cohesive, intuitive
                experiences."
              </p>
              {/* btn and socials */}
              <div className="flex flex-col xl:flex-row items-center gap-4 sm:gap-6 xl:gap-8 mt-6 sm:mt-8 mb-8 sm:mb-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2 bg-transparent border-[#00ff99] text-[#00ff99] hover:bg-[#00ff99] hover:text-[#1c1c22]"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
                <div className="mb-4 xl:mb-0">
                  <Socials
                    containerStyles="flex gap-6"
                    iconeStyles="w-9 h-9 border border-[#00ff99] rounded-full flex justify-center items-center text-[#00ff99] text-base hover:bg-[#00ff99] hover:text-[#1c1c22] hover-transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* photo */}
            <div className="mt-12 order-1 xl:order-2 mb-8">
              <Photo />
            </div>
          </div>
        </div>
        <Stats />
      </section>
    </PageTransitions>
  );
};

export default HomePage;
