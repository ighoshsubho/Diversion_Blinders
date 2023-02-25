"use client";
import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sessionStorage.setItem("Token", userCredential.user.accessToken);
        sessionStorage.setItem("uid", userCredential.user.uid);
        router.push("/");
        // dispatch({type:"LOGIN", payload:user})
        // navitage("/");
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
            <h1 className="text-3xl font-bold mb-4">Login</h1>

            <form className="w-1/3" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white font-bold mb-2 text-left">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-background leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-white text-left font-bold mb-2">Password</label>
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
                    <Button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</Button>
                    {error && <span className='font-light text-red-600 mt-[10px] flex justify-center'>Wrong email or password!</span>}
                    <Button onClick={signInWithGoogle} type="submit">Login With Google</Button>
                    {error && <span className='font-light text-red-600 mt-[10px] flex justify-center'>Wrong email or password!</span>}
                </div>
            </form>
        </div>
    </Hero>
);

};

export default Login;