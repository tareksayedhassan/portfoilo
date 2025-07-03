"use client";

import { BASE_URL, GET_SINGLE_USER } from "@/ApiCalld/Api";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/ApiCalld/fetcher";
import Image from "next/image";

type User = {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
};

const EditPage = () => {
  const { id } = useParams();
  const [toast, setToast] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const { data, error, isLoading } = useSWR<User>(
    `${BASE_URL}/${GET_SINGLE_USER}/${id}`,
    fetcher
  );

  // عرض رسالة الخطأ في توست بسيط
  useEffect(() => {
    if (error) {
      setToast({ type: "error", message: "Failed to load user data." });
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* spinner بسيط */}
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  if (!data || error)
    return (
      <>
        {toast && (
          <div
            className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white ${
              toast.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {toast.message}
          </div>
        )}
      </>
    );

  const user = data.data;

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={`/uploads/${user.avatar}`}
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full shadow-md"
              priority
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
              <span className="text-blue-600 font-bold uppercase">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPage;
