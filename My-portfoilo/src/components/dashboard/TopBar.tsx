"use client";

// import "./bars.css";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import UserProfileBadge from "./userBadge";
import { DecodedToken } from "@/Types/CustomJWTDecoded";
import { useEffect, useState } from "react";

const TopBar = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  useEffect(() => {
    const cookie = Cookie();
    const token = cookie.get("Bearer");

    let decded: DecodedToken = { name: "Guest" };
    if (token) {
      try {
        decded = jwtDecode<DecodedToken>(token);
        setUser(decded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, []);
  return (
    <div className="top-bar flex justify-content-between align-items-center px-3 py-2 shadow-1 surface-0">
      <div className="flex align-items-center gap-2">
        <h3 className="m-0 text-xl font-bold">portfoilo</h3>
        <i className="pi pi-bars" style={{ fontSize: "1.5rem" }}></i>
      </div>

      <div className="flex align-items-center gap-2">
        {user && (
          <UserProfileBadge
            name={user.name}
            role={user.role}
            avatar={user.avatar || `/uploads/${user?.avatar}`}
            nameClass="text-gray-800"
            roleClass="text-gray-500"
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
