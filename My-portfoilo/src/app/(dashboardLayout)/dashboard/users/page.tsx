"use client";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";
import { BASE_URL, DELETE_USER, GET_ALL_USER } from "@/ApiCalld/Api";
import CustomTable from "@/components/dashboard/customTable/CustomTable";
const UserPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [toast, setToast] = useState<{ type: string; message: string } | null>(
    null
  );

  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: string;
  };

  // Function to show toast message (simple)
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  };

  const cookie = Cookie();
  const token = cookie.get("Bearer");

  const fetcher = async (url: string) => {
    const token = cookie.get("Bearer");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      // @ts-ignore
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/${GET_ALL_USER}?page=${currentPage}&pageSize=${rowsPerPage}&search=${search}`,
    fetcher
  );

  const users: User[] = data?.data || [];
  const totalRecords: number = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const offset = (currentPage - 1) * rowsPerPage + 1;
  const lastRecord = Math.min(offset + rowsPerPage - 1, totalRecords);

  const deleteUser = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`${BASE_URL}/${DELETE_USER}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookie().get("Bearer")}`,
        },
      });
      mutate();
      showToast("success", "User deleted successfully");
    } catch {
      showToast("error", "Failed to delete user");
    }
  };
  const getImageUrl = (avatar: string | undefined) => {
    if (!avatar) return "/uploads/default.jpg";
    return `/uploads/${avatar}`;
  };

  const editUser = (user: User) => {
    router.push(`${user.id}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <CustomTable
        data={data}
        getImageUrl={getImageUrl}
        editPath={"/dashboard/users/edituser"}
        deleteUser={deleteUser}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        TableName={"Users List"}
        headerName1="Name"
        headerName2="Email"
        headerName3="Avatar"
        headerName4="Role"
        headerName5="Actions"
        buttonLabel="Add User"
      />
    </>
  );
};

export default UserPage;
