"use client";
import { useParams } from "next/navigation";
import React from "react";

const EditUserPage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>page</div>;
};

export default EditUserPage;
