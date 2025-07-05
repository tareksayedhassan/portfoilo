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

const IconPlayer = ({ icon }: { icon: object }) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return <Player ref={playerRef} icon={icon} size={24} />;
};

const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const logOut = () => {
    const cookie = Cookie();
    cookie.remove("Bearer");
    router.push("/");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={`xl:hidden text-gray-800 text-[20px] cursor-pointer hover:text-emerald-600 fixed top-6 left-26 z-[1001] ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FaBars />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[80vw] max-w-[240px] bg-white border-r-2 border-gray-200 shadow-none pt-[80px] overflow-y-hidden"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-gray-800">
            Hello, {decoded?.name}
          </SheetTitle>
        </SheetHeader>
        <div className="side-bar mobile-side-bar">
          <span className="text-sm block mb-2 text-gray-600">Navigation</span>
          <Link href="/dashboard" className="nav-icon gap-2">
            <IconPlayer icon={dashboardIcon} />
            <span className="label text-gray-800 hover:text-emerald-600">
              Dashboard
            </span>
          </Link>
          <Link href="/dashboard/users" className="nav-icon gap-2">
            <IconPlayer icon={users} />
            <span className="label text-gray-800 hover:text-emerald-600">
              Users
            </span>
          </Link>
          <Link href="/dashboard/categories" className="nav-icon gap-2">
            <IconPlayer icon={layer} />
            <span className="label text-gray-800 hover:text-emerald-600">
              Categories
            </span>
          </Link>
          <Link href="/dashboard/projects" className="nav-icon gap-2">
            <IconPlayer icon={projects} />
            <span className="label text-gray-800 hover:text-emerald-600">
              Projects
            </span>
          </Link>
          <div className="mt-3">
            <span className="text-sm block mb-2 text-gray-600">
              Authentication
            </span>
            <Link href="/" className="nav-icon gap-2">
              <IconPlayer icon={global} />
              <span className="label text-gray-800 hover:text-emerald-600">
                Website
              </span>
            </Link>
            <div
              className="nav-icon gap-2 cursor-pointer"
              onClick={() => logOut()}
            >
              <IconPlayer icon={logout} />
              <span className="label text-gray-800 hover:text-emerald-600">
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
