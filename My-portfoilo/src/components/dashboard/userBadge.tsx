"use client";
import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  role?: string;
  avatar?: string;
  nameClass?: string;
  roleClass?: string;
}

const UserProfileBadge: React.FC<Props> = ({
  name,
  role = "user",
  avatar,
  nameClass = "text-white",
  roleClass = "text-white",
}) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={avatar ? `/uploads/${avatar}` : "/user-avatar.png"}
        alt="Avatar"
        width={40}
        height={40}
        style={{ borderRadius: "50%", objectFit: "cover" }}
        className="border border-gray-200 shadow-sm"
      />

      <div className="leading-tight">
        <span className={`block text-sm font-semibold ${nameClass}`}>
          {name}
        </span>
        <span className={`block text-xs capitalize ${roleClass}`}>{role}</span>
      </div>
    </div>
  );
};

export default UserProfileBadge;
