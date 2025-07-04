"use client";

import { useState } from "react";
import { ADD_USER, BASE_URL } from "@/ApiCalld/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

const addUser = () => {
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

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

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

      if (res.status === 201) {
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
    <div className="flex items-start justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white text-lg font-medium ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl w-full mx-auto space-y-11 p-16 bg-white dark:bg-gray-950 rounded-xl "
        >
          <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
            Add User
          </h3>

          {/* Name */}
          <FormItem>
            <FormLabel
              htmlFor="name"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Name
            </FormLabel>
            <FormControl>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          {/* Email */}
          <FormItem>
            <FormLabel
              htmlFor="email"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          {/* Password */}
          <FormItem>
            <FormLabel
              htmlFor="password"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </FormLabel>
            <FormControl>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          {/* Role */}
          <FormItem>
            <FormLabel
              htmlFor="role"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Select Role
            </FormLabel>
            <FormControl>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger
                  id="role"
                  className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <SelectValue placeholder="Choose role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" className="text-lg">
                    Admin
                  </SelectItem>
                  <SelectItem value="user" className="text-lg">
                    User
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Avatar */}
          <FormItem>
            <FormLabel
              htmlFor="avatar"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Avatar
            </FormLabel>
            <FormControl>
              <Input
                id="avatar"
                type="file"
                onChange={(e) =>
                  e.target.files && setAvatarFile(e.target.files[0])
                }
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default addUser;
