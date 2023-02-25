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
    <Hero>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-white font-semibold">Sign In</h1>
            <p className="text-sm text-white">Sign in to access your account</p>
          </div>

          <form className="w-auto" onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white font-bold text-xl mb-2 text-left"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded input w-full py-2 px-3 text-background leading-tight focus:outline-none focus:shadow-outline"
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
                className="block text-white text-left text-xl font-bold mb-2"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-background leading-tight focus:outline-none focus:shadow-outline"
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
                className="bg-blue-500 hover:bg-blue-700 text-white text-xl py-6 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </Button>
              {error && (
                <span className="font-light text-red-600 mt-[10px] flex justify-center">
                  Wrong email or password!
                </span>
              )}
              {/* <Button onClick={signInWithGoogle} type="submit">
              Login With Google
            </Button> */}
              {error && (
                <span className="font-light text-red-600 mt-[10px] flex justify-center">
                  Wrong email or password!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </Hero>
  );
};

export default Login;
