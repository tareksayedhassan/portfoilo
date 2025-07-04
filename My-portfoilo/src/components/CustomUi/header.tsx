import Link from "next/link";
import React from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="sticky top-4 py-8 xl:py-12 text-white bg-[#1c1c22] z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            Tarek Elsayed <span className="text-[#00ff99]">.</span>
          </h1>
        </Link>
        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href={"/content"}>
            <Button
              variant="secondary"
              className="bg-[#333333] text-white rounded-lg py-4 px-8 text-lg transition-colors duration-300 hover:bg-[#444444]"
            >
              Hire me
            </Button>
          </Link>
        </div>
        {/* mobile Nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
