"use client";
import React, { ReactNode } from "react";
import "./button.css";
import Link from "next/link";
type ButtonProps = {
  label: ReactNode;
  href: string;
};
const Button = ({ label, href }: ButtonProps) => {
  return (
    <div className="button-container">
      <Link href={href} className="button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {label}
      </Link>
    </div>
  );
};

export default Button;
