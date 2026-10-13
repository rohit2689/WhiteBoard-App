"use client";
import { useRef } from "react";
import axios from "axios";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const name = nameRef.current?.value || "";

        try {
            if (isSignin) {
                const res = await axios.post("http://localhost:3001/signin", {
                    email,
                    password,
                });

                localStorage.setItem("token", res.data.token);
                alert("Login successful!");
                window.location.href = "/dashboard";
            } else {
                if (!email || !password || !name) {
                    alert("All fields are required for signup!");
                    return;
                }

                await axios.post("http://localhost:3001/signup", {
                    email,
                    password,
                    name,
                });

                alert("Signup successful! Please login now.");
                console.log(email);
                console.log(password);
                console.log(name);
                window.location.href = "/signin";
            }
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Invalid credentials / inputs");
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96 max-w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
                    {isSignin ? "Sign In" : "Sign Up"}
                </h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {!isSignin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            ref={nameRef}
                            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        {isSignin ? "Sign In" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}
