"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/Types/CustomJWTDecoded";
import UserProfileBadge from "@/components/dashboard/userBadge";

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  let name: string | undefined;
  let role: string | undefined;
  let avatar: string | undefined;

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      name = decoded.name;
      role = decoded.role;
      avatar = decoded.avatar;
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
    <nav className="flex gap-8 items-center ml-auto">
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
          <UserProfileBadge
            name={name}
            role={role || "user"}
            avatar={avatar || ""}
            nameClass={"text-[#00ff99]"}
            roleClass="text-[#00ff99]"
          />

          <button
            onClick={logOut}
            className="text-[#00ff99] px-3 py-1 rounded-md hover:bg-[#00ff99] hover:text-white transition"
          >
            Log out
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
