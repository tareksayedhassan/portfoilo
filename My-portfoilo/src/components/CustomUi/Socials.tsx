import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const Socials = () => {
  const socials = [
    {
      icons: <FaGithub />,
      path: "https://github.com/tareksayedhassan",
    },
    {
      icons: <FaLinkedinIn />,
      path: "",
    },
    {
      icons: <FaFacebookF />,
      path: "",
    },
    {
      icons: <FaWhatsapp />,
      path: "",
    },
    {
      icons: <CgMail />,
      path: "",
    },
  ];
  return <div>Socials</div>;
};

export default Socials;
