"use client";
import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Hero } from "./Hero/herotitle";
import { Button } from "./Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem("Token", userCredential.user.accessToken);
        sessionStorage.setItem("uid", userCredential.user.uid);
        sessionStorage.setItem("email", userCredential.user.email);
        router.push("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-page-gradient login-">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <form className="w-1/3" onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2 text-2xl"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2 text-2xl"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-background leading-tight focus:outline-none focus:shadow-outline text-2xl"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex  flex-row gap-4">
          <Button
            onClick={handleLogin}
            variant="primary"
            size="large"
            type="submit"
          >
            Login
          </Button>
        </div>
        {error && <span className="">Already a member!</span>}
      </form>
    </div>
  );
};

export default Login;
