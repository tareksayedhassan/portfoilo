"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import UserProfileBadge from "../dashboard/userBadge";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const [user, setUser] = useState<{
    name: string;
    role: string;
    avatar: string;
  } | null>(null);
  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("Bearer");

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

  const allLinks = user ? links : [...links, ...authLinks];

  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/login");
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<any>(token);
        setUser({
          name: decoded.name,
          role: decoded.role,
          avatar: decoded.avatar,
        });
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  return (
    <Sheet>
      <SheetTrigger className="text-white text-2xl">
        <FaBars />
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] bg-[#1c1c22] text-white">
        <SheetHeader className="mb-4">
          <h2 className="text-xl font-bold text-[#00ff99]">Menu</h2>
        </SheetHeader>

        <nav className="flex flex-col items-center justify-center min-h-7 gap-8">
          {user && (
            <div className="flex flex-col items-center gap-4 mb-8">
              <UserProfileBadge
                name={user.name}
                role={user.role || "user"}
                avatar={user.avatar || ""}
                nameClass={"text-[#00ff99]"}
                roleClass="text-[#00ff99]"
              />
              <button
                onClick={logOut}
                className="text-[#00ff99] px-4 py-2 rounded-md hover:bg-[#00ff99] hover:text-white transition"
              >
                Log out
              </button>
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="capitalize text-white hover:text-[#00ff99] transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
