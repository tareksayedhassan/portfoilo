"use client";

import { useState } from "react";
import { ADD_SERVICES, ADD_USER, BASE_URL } from "@/ApiCalld/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const addServices = () => {
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("");
  const [title, setTitel] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm({
    defaultValues: {
      num: "",
      title: "",
      description: "",
      link: "",
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
      const res = await axios.post(
        `${BASE_URL}/${ADD_SERVICES}`,
        {
          num,
          title,
          description,
          link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        setToast({ type: "success", message: "services added successfully!" });
        router.push("/dashboard/services");
      } else {
        setToast({ type: "error", message: "Failed to add services." });
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
            Add services
          </h3>

          <FormItem>
            <FormLabel
              htmlFor="name"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              num
            </FormLabel>
            <FormControl>
              <Input
                id="num"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                placeholder="Enter Num"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel
              htmlFor="title"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Title
            </FormLabel>
            <FormControl>
              <Input
                id="title"
                type="title"
                value={title}
                onChange={(e) => setTitel(e.target.value)}
                placeholder="hello world"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel
              htmlFor="description"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </FormLabel>
            <FormControl>
              <Input
                id="description"
                type="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel
              htmlFor="link"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              link
            </FormLabel>
            <FormControl>
              <Input
                id="link"
                type="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="link"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add services"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default addServices;
