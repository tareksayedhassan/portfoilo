"use client";
import React from "react";
import "./button.css";
import Link from "next/link";
type ButtonProps = {
  label: string;
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
