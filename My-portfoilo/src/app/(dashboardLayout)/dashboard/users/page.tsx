"use client";

import React, { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/ApiCalld/fetcher";
import Cookie from "cookie-universal";
import Link from "next/link";
import { useRouter } from "next/navigation";
const UserPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
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

  const { data, error, isLoading, mutate } = useSWR(
    `/api/users?page=${currentPage}&pageSize=${rowsPerPage}&search=${search}`,
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
      await fetch(`/api/users/${id}`, {
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

  const editUser = (user: User) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Users</h2>
        <Link href="/dashboard/users/addUser" passHref>
          <a className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            + Add User
          </a>
        </Link>

        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.65 6.15z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Avatar
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Created At
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {!isLoading &&
              users.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{offset + idx}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <img
                      src={
                        user.avatar
                          ? `/uploads/${user.avatar}`
                          : "/user-avatar.png"
                      }
                      alt={user.name || "User Avatar"}
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                      loading="lazy"
                    />
                  </td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => editUser(user)}
                      className="inline-flex items-center justify-center rounded bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm font-semibold transition"
                      aria-label="Edit user"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="inline-flex items-center justify-center rounded bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm font-semibold transition"
                      aria-label="Delete user"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
        <div>
          <p className="text-gray-700 text-sm">
            Showing {offset} to {lastRecord} of {totalRecords} users
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
