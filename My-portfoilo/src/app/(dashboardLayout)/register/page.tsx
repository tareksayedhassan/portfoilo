"use client";

import "./style.css";
import { useState } from "react";
import { registerClient } from "@/utils/validationSchemas";
import { BASE_URL, REGISTER } from "@/ApiCalld/Api";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const router = useRouter();
  const cookie = Cookie();

  const handilsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const vaildate = registerClient.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!vaildate.success) {
      const inputError: Record<string, string> = {};
      vaildate.error.issues.forEach((item) => {
        const errorKey = item.path[0];
        if (typeof errorKey === "string") {
          inputError[errorKey] = item.message;
        }
      });
      setError(inputError);
      setLoading(false);
      return;
    }

    setError({});

    try {
      const res = await axios.post(`${BASE_URL}/${REGISTER}`, {
        name,
        email,
        password,
        confirmPassword,
      });

      const token = res.data.token;
      cookie.set("Bearer", token);
      toast.success("User registered successfully");
      router.push("/");
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 404) {
        const message = err.response?.data?.message || "Invalid credentials";
        setError({ email: message });
      } else {
        console.log(err);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="app-container">
        <div className="app-row h-100">
          <div className="form">
            <form
              className="form-content space-y-4 mt-[-20px]"
              onSubmit={handilsubmit}
            >
              <h1 className="text-2xl font-bold mb-4">Register Now</h1>

              <div className="app-form-control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
                <label htmlFor="name">Full Name</label>
                {error.name && (
                  <p className="text-sm text-red-600 mt-1">{error.name}</p>
                )}
              </div>

              <div className="app-form-control">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@mail.com"
                />
                <label htmlFor="email">Email</label>
                {error.email && (
                  <p className="text-sm text-red-600 mt-1">{error.email}</p>
                )}
              </div>

              <div className="app-form-control">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                />
                <label htmlFor="password">Password</label>
                {error.password && (
                  <p className="text-sm text-red-600 mt-1">{error.password}</p>
                )}
              </div>

              <div className="app-form-control">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="********"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {error.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {error.confirmPassword}
                  </p>
                )}
              </div>
              <div className="mt-[-10]">
                <button
                  type="submit"
                  className="mt-[-10px]  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-3xl text-xl px-10 py-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 flex items-center justify-center min-w-[200px]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6 mr-3"></span>
                  ) : (
                    <i className="pi pi-check mr-3 text-2xl"></i>
                  )}
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
