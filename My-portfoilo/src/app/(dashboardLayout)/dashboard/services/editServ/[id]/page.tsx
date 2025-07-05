"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";

import { BASE_URL, GET_SINGLE_SERVICES, UPDATE_SERVICES } from "@/ApiCalld/Api";
import { fetcher } from "@/ApiCalld/fetcher";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const editServ = () => {
  const [num, setNum] = useState("");
  const [title, setTitel] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  const { data, error } = useSWR(
    `${BASE_URL}/${GET_SINGLE_SERVICES}/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setNum(data.num);
      setTitel(data.title);
      setDescription(data.description);
      setLink(data.link);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load service data");
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Updating service...");

    try {
      const res = await axios.patch(`${BASE_URL}/${UPDATE_SERVICES}/${id}`, {
        num,
        title,
        description,
        link,
      });

      if (res.data.status === "success") {
        toast.update(toastId, {
          render: "Service updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.push("/dashboard/services");
      } else {
        toast.update(toastId, {
          render: "Failed to update service!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const form = useForm({
    defaultValues: {
      num: "",
      title: "",
      description: "",
      link: "",
    },
  });

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl w-full mx-auto space-y-11 p-16 bg-white dark:bg-gray-950 rounded-xl"
        >
          <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
            Edit Service
          </h3>

          <FormItem>
            <FormLabel
              htmlFor="num"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Num
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
                value={title}
                onChange={(e) => setTitel(e.target.value)}
                placeholder="Enter Title"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel
              htmlFor="link"
              className="text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Link
            </FormLabel>
            <FormControl>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter Link"
                className="text-lg p-3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </FormControl>
          </FormItem>

          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Service"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default editServ;
