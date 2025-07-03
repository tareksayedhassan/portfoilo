"use client";

import "./style.css";
import { useState } from "react";
import { LoginClient } from "@/utils/validationSchemas";
import { BASE_URL, LOGIN } from "@/ApiCalld/Api";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const router = useRouter();
  const cookie = Cookie();

  const handilsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    const vaildate = LoginClient.safeParse({ email, password });

    if (!vaildate.success) {
      const inputError: Record<string, string> = {};
      vaildate.error.issues.forEach((item) => {
        const field = item.path[0];
        if (typeof field === "string") {
          inputError[field] = item.message;
        }
      });

      setError(inputError);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/${LOGIN}`, {
        email,
        password,
      });

      const token = res.data.data.token;
      const role = res.data.data.role;

      cookie.set("Bearer", token);
      toast.success("Login successful");

      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
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
            <form className="form-content" onSubmit={handilsubmit}>
              <h1>Login Now</h1>

              {/* Email */}
              <div className="app-form-control relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer"
                />
                <label htmlFor="email">Email</label>
                {error.email && (
                  <p className="text-sm text-red-600 mt-1">{error.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="app-form-control relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="********"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer"
                />
                <label htmlFor="password">Password</label>
                {error.password && (
                  <p className="absolute text-sm text-red-600 dark:text-red-500 mt-1">
                    {error.password}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="register-section">
                <div className="flex justify-content-start mt-4">
                  <button
                    type="submit"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-3xl text-2xl px-14 py-5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center min-w-[200px]"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6 mr-4"></span>
                    ) : (
                      <i className="pi pi-check mr-4 text-2xl"></i>
                    )}
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
