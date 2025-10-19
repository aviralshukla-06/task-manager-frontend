import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
// import { AuthSideBar } from "../components/AuthSideBar";

export const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    async function signup(): Promise<void> {
        const email = emailRef.current?.value;
        const userName = userNameRef.current?.value;
        const fullName = fullNameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !userName || !fullName || !password) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/api/users/register`, {
                email,
                userName,
                fullName,
                password,
            });
            alert("Registration successful!");
            nav("/login");
        } catch (error) {
            alert("Registration failed. Try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") signup();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
            {/* background orbs (pointer-events-none keeps them non-interactive) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            {/* Centered container: max-w, mx-auto ensures centering; grid becomes 1-col on small screens */}
            <div className="relative w-full max-w-6xl mx-auto items-center">
                {/* LEFT: signup card (centered by flex inside) */}
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl z-10">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.1.9-2 2-2h2V7a4 4 0 10-8 0v2h2a2 2 0 012 2zm-6 4a6 6 0 0112 0v1H6v-1z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">Create Account</h1>
                            <p className="text-purple-200">Join us and start your journey 🚀</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-purple-200 text-sm mb-1">Full name</label>
                                <input ref={fullNameRef} type="text" placeholder="Your full name"
                                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>

                            <div>
                                <label className="block text-purple-200 text-sm mb-1">Username</label>
                                <input ref={userNameRef} type="text" placeholder="Username"
                                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>

                            <div>
                                <label className="block text-purple-200 text-sm mb-1">Email</label>
                                <input ref={emailRef} type="email" placeholder="Email address"
                                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>

                            <div className="relative">
                                <label className="block text-purple-200 text-sm mb-1">Password</label>
                                <input
                                    ref={passwordRef}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    onKeyDown={(e) => { if (e.key === "Enter") signup(); }}
                                    className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-purple-300 hover:text-white">
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            <button
                                onClick={signup}
                                disabled={loading}
                                className="w-full py-3 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-[1.02] transition"
                            >
                                {loading ? "Creating..." : "Sign up"}
                            </button>

                            <div className="text-center mt-3">
                                <p className="text-purple-200 text-sm">Already have an account?</p>
                                <button onClick={() => nav("/login")} className="mt-2 px-6 py-2 bg-white/10 rounded-2xl text-white border border-white/20">
                                    Login instead
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: AuthSideBar (shows only on large screens) */}

            </div>
        </div>
    );
};
