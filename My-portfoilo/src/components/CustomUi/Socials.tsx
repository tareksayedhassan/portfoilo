import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import Link from "next/link";

interface SocialsProps {
  containerStyles: string;
  iconeStyles: string;
}

const Socials = ({
  containerStyles = "default-container",
  iconeStyles = "default-icon",
}: SocialsProps) => {
  const socials = [
    {
      icons: <FaGithub />,
      path: "https://github.com/tareksayedhassan",
      label: "Github",
    },
    {
      icons: <FaLinkedinIn />,
      path: "https://www.linkedin.com/in/tarek-el-sayed-06139631b/",
      label: "LinkedIn",
    },
    {
      icons: <FaFacebookF />,
      path: "https://www.facebook.com/avakinmemo",
      label: "Facebook",
    },
    {
      icons: <FaWhatsapp />,
      path: "https://wa.me/01003383601",
      label: "Whatsapp",
    },
    {
      icons: <CgMail />,
      path: "mailto:tarekelsayed.dev@gmail.com",
      label: "Email",
    },
  ];

  return (
    <div className={containerStyles}>
      {socials.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={iconeStyles}
          aria-label={item.label} // تحسين للوصول
          target={item.path.startsWith("http") ? "_blank" : undefined}
          rel={item.path.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {item.icons}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
