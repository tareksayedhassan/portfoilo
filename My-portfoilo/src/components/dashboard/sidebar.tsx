"use client";

import Link from "next/link";
import "./bars.css";
import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import dashboardIcon from "../../../public/icons/wired-outline-932-windscreen-hover-pinch.json";
import users from "../../../public/icons/users.json";
import layer from "../../../public/icons/layer.json";
import global from "../../../public/icons/global.json";
import projects from "../../../public/icons/projects.json";
import logout from "../../../public/icons/logout.json";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

const IconPlayer = ({ icon }: { icon: object }) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return <Player ref={playerRef} icon={icon} size={30} />;
};

const SideBar = () => {
  const router = useRouter();
  const logOut = () => {
    const cookie = Cookie();
    cookie.remove("Bearer");
    router.push("/");
  };
  const sidebarStyle = {
    transition: "left 0.3s ease, width 0.3s ease",
    position: "fixed" as const,
    top: "70px",
    height: "calc(100vh - 70px)",
    backgroundColor: "white",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
    padding: "20px 10px",
    zIndex: 1000,
  };

  return (
    <div className="side-bar" style={sidebarStyle}>
      <span className="text-sm block mb-3 text-400">Navigation</span>
      <Link href={"/dashboard"} className="nav-icon gap-2">
        <IconPlayer icon={dashboardIcon} />
        <span className="label">Dashboard</span>
      </Link>
      <Link href={"/dashboard/users"} className="nav-icon gap-2">
        <IconPlayer icon={users} />
        <span className="label">Users</span>
      </Link>
      <Link href={"/dashboard/categories"} className="nav-icon gap-2">
        <IconPlayer icon={layer} />
        <span className="label">Categories</span>
      </Link>
      <Link href={"/dashboard/projects"} className="nav-icon gap-2">
        <IconPlayer icon={projects} />
        <span className="label">Projects</span>
      </Link>
      <div className="mt-4">
        <span className="text-sm block mb-3 text-400">Authentication</span>
        <Link href={"/"} className="nav-icon gap-2">
          <IconPlayer icon={global} />
          <span className="label">Website</span>
        </Link>
        <div
          className="nav-icon gap-2"
          style={{ cursor: "pointer" }}
          onClick={() => logOut()}
        >
          <IconPlayer icon={logout} />
          <span className="label">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
