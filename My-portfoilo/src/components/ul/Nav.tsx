"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/Types/CustomJWTDecoded";

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  let name = "";
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      name = decoded.name;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/login");
  };

  const links = [
    { name: "home", path: "/" },
    { name: "services", path: "/services" },
    { name: "resume", path: "/resume" },
    { name: "work", path: "/work" },
    { name: "content", path: "/content" },
  ];

  const authLinks = [
    { name: "register", path: "/register" },
    { name: "login", path: "/login" },
  ];

  const allLinks = name ? links : [...links, ...authLinks];

  return (
    <nav className="flex gap-8 items-center">
      {allLinks.map((item, key) => (
        <Link
          key={key}
          href={item.path}
          className={`capitalize transition-all font-medium border-b-2 ${
            item.path === pathname
              ? "text-[#00ff99] border-[#00ff99]"
              : "text-white border-transparent hover:text-[#00ff99] hover:border-[#00ff99]"
          }`}
        >
          {item.name}
        </Link>
      ))}

      {name && (
        <>
          <p className="text-[#00ff99] capitalize font-semibold">
            Hello, {name}
          </p>
          <button
            onClick={logOut}
            className="text-[#00ff99]  px-3 py-1 rounded-md hover:bg-[#00ff99] hover:text-white transition"
          >
            Log out
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
