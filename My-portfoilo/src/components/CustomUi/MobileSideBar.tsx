import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Player } from "@lordicon/react";
import dashboardIcon from "../../../public/icons/wired-outline-932-windscreen-hover-pinch.json";
import users from "../../../public/icons/users.json";
import layer from "../../../public/icons/layer.json";
import global from "../../../public/icons/global.json";
import projects from "../../../public/icons/projects.json";
import logout from "../../../public/icons/logout.json";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";

import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
const cookie = Cookie();
const token = cookie.get("Bearer");
let decoded = null;

if (token) {
  try {
    decoded = jwtDecode<any>(token);
  } catch (error) {
    console.error("Invalid token", error);
  }
}
const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const IconPlayer = ({ icon }: { icon: object }) => {
    const playerRef = useRef<Player>(null);

    useEffect(() => {
      playerRef.current?.playFromBeginning();
    }, []);

    return <Player ref={playerRef} icon={icon} size={30} />;
  };

  const router = useRouter();
  const logOut = () => {
    const cookie = Cookie();
    cookie.remove("Bearer");
    router.push("/");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className="xl:hidden text-emerald-500 text-9xl cursor-pointer hover:text-emerald-700"
        onClick={() => setIsOpen(false)}
      >
        <FaBars />
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent
        side="left"
        className="w-[240px] text-white bg-white border-r-2 border-gray-200 shadow-none"
        style={{ boxShadow: "none !important" }} // منع الـ box-shadow تماماً
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-gray-800">
            hello ,{decoded.name}
          </SheetTitle>
        </SheetHeader>

        <div className="side-bar">
          <span className="text-sm block mb-3 text-gray-600">Navigation</span>
          <Link href={"/dashboard"} className="nav-icon gap-2">
            <IconPlayer icon={dashboardIcon} />
            <span className="label text-gray-800 hover:text-emerald-500">
              Dashboard
            </span>
          </Link>
          <Link href={"/dashboard/users"} className="nav-icon gap-2">
            <IconPlayer icon={users} />
            <span className="label text-gray-800 hover:text-emerald-500">
              Users
            </span>
          </Link>
          <Link href={"/dashboard/categories"} className="nav-icon gap-2">
            <IconPlayer icon={layer} />
            <span className="label text-gray-800 hover:text-emerald-500">
              Categories
            </span>
          </Link>
          <Link href={"/dashboard/projects"} className="nav-icon gap-2">
            <IconPlayer icon={projects} />
            <span className="label text-gray-800 hover:text-emerald-500">
              Projects
            </span>
          </Link>

          <div className="mt-4">
            <span className="text-sm block mb-3 text-gray-600">
              Authentication
            </span>
            <Link href={"/"} className="nav-icon gap-2">
              <IconPlayer icon={global} />
              <span className="label text-gray-800 hover:text-emerald-500">
                Website
              </span>
            </Link>
            <div
              className="nav-icon gap-2 cursor-pointer"
              onClick={() => logOut()}
            >
              <IconPlayer icon={logout} />
              <span className="label text-gray-800 hover:text-emerald-500">
                Logout
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
