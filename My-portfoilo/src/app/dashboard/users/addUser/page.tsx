"use client";

import { useState } from "react";
import { ADD_USER, BASE_URL } from "@/ApiCalld/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (avatarFile) {
        formData.append("file", avatarFile);
      }

      const res = await axios.post(`${BASE_URL}/${ADD_USER}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === 200) {
        setToast({ type: "success", message: "User added successfully!" });
        router.push("/dashboard/users");
      } else {
        setToast({ type: "error", message: "Failed to add user." });
      }
    } catch (error: any) {
      setToast({ type: "error", message: `Failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
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

      <h3 className="text-center text-2xl font-bold mb-8">Add User</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Enter name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="font-medium">
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value)
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="avatar" className="font-medium">
            Image
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setAvatarFile(e.target.files[0])
            }
            className="w-full"
          />
          {avatarFile && (
            <img
              src={URL.createObjectURL(avatarFile)}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover rounded-md shadow"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 py-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default Page;
