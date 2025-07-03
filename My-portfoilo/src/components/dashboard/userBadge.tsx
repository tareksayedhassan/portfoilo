// userBadge.tsx
"use client";
import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  role?: string;
  avatar?: string;
}

const UserProfileBadge: React.FC<Props> = ({ name, role = "user", avatar }) => {
  return (
    <div
      className="flex align-items-center gap-2 px-2 py-1 border-round surface-100 shadow-1"
      style={{ border: "1px solid var(--surface-border)" }}
    >
      <Image
        src={avatar ? `/uploads/${avatar}` : "/user-avatar.png"}
        alt="Avatar"
        width={35}
        height={35}
        className="border-circle"
      />
      <div className="flex flex-column justify-content-center">
        <span className="text-sm font-medium text-color">{name}</span>
        <span className="text-xs text-color-secondary">{role}</span>
      </div>
    </div>
  );
};

export default UserProfileBadge;
