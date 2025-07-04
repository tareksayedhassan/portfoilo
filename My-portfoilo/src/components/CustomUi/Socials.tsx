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
const Socials = ({ containerStyles, iconeStyles }: SocialsProps) => {
  const socials = [
    {
      icons: <FaGithub />,
      path: "https://github.com/tareksayedhassan",
    },
    {
      icons: <FaLinkedinIn />,
      path: "https://www.linkedin.com/in/tarek-el-sayed-06139631b/",
    },
    {
      icons: <FaFacebookF />,
      path: "https://www.facebook.com/avakinmemo",
    },
    {
      icons: <FaWhatsapp />,
      path: "01003383601",
    },
    {
      icons: <CgMail />,
      path: "tarekelsayed.dev@gmail.com",
    },
  ];
  return (
    <div className={containerStyles}>
      {socials.map((item, key) => {
        return (
          <Link key={key} href={item.path} className={iconeStyles}>
            {item.icons}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
