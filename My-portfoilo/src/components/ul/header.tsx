import Link from "next/link";
import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
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
            <button className="bg-gray-900 text-white px-9 py-9 rounded-l-lg hover:bg-gray-800 transition">
              Hire me
            </button>
          </Link>
        </div>
        <div className="xl:hidden">mobile nav</div>
      </div>
    </header>
  );
};

export default Header;
