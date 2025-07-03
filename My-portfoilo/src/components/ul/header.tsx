import Link from "next/link";
import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto">
        {/* logo */}
        <Link href={"/"}>
          <h1 className="text-4x1 font-semibold">
            Tarek Elsayed <span className="text-accent">.</span>
          </h1>
          {/* desctop nav */}
          <Nav />
        </Link>
      </div>
    </header>
  );
};

export default Header;
