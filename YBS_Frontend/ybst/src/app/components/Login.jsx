"use client";
import React from 'react'
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';


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
                sessionStorage.setItem('Token', userCredential.user.accessToken);
                sessionStorage.setItem('uid', userCredential.user.uid)
                router.push("/");
                // dispatch({type:"LOGIN", payload:user})
                // navitage("/");
            })
            .catch((error) => {
                setError(true);
            });
    };

		useEffect(() => {
			let token = sessionStorage.getItem('Token')

			if (token) {
					router.push('/')
			}
	}, [])


  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
	<div className="flex flex-col items-center">
		<h1 className="text-3xl font-semibold">Sign In</h1>
		<p className="text-sm">Sign in to access your account</p>
	</div>
	<div className="form-group">
		<div className="form-field">
			<label className="form-label">Email address</label>

			<input onChange={(e) => setEmail(e.target.value)} placeholder="Type here" type="email" className="input max-w-full" />
			<label className="form-label">
				<span className="form-label-alt">Please enter a valid email.</span>
			</label>
		</div>
		<div className="form-field">
			<label className="form-label">Password</label>
			<div className="form-control">
				<input placeholder="Type here" type="password" className="input max-w-full" onChange={(e) => setPassword(e.target.value)} />
			</div>
		</div>
		<div className="form-field">
			<div className="form-control justify-between">
				<div className="flex gap-2">
					<input type="checkbox" className="checkbox" />
					<a href="#">Remember me</a>
				</div>
				<label className="form-label">
					<a className="link link-underline-hover link-primary text-sm">Forgot your password?</a>
				</label>
			</div>
		</div>
		<div className="form-field pt-5">
			<div className="form-control justify-between">
				<button onClick={handleLogin} type="button" className="btn btn-primary w-full">Sign in</button>
			</div>
		</div>

		<div className="form-field">
			<div className="form-control justify-center">
				<a className="link link-underline-hover link-primary text-sm">Don't have an account yet? Sign up.</a>
			</div>
		</div>
		{error && <span className='font-light text-red-600 mt-[10px] flex justify-center'>Wrong email or password!</span>}
	</div>
</div>
  )
}

export default Login