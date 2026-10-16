import { useState } from "react";
import { router } from "@inertiajs/react";

function EyeIcon({ visible }) {
    if (visible) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
            >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
        >
            <path d="M3.53 3.53 20.47 20.47" />
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
            <path d="M9.88 4.24A10.7 10.7 0 0 1 12 4c5 0 8.73 3.11 10 8a10.7 10.7 0 0 1-2.04 4.22" />
            <path d="M6.61 6.61C4.62 7.9 3.1 9.72 2 12c1.27 4.89 5 8 10 8 1.61 0 3.08-.34 4.39-.96" />
        </svg>
    );
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        router.post(
            "/login",
            {
                username,
                password,
            },
            {
                onError: (errors) => {
                    setMessage(
                        errors.username ||
                        errors.password ||
                        "Invalid username or password."
                    );
                },
            }
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#C1F6ED] via-[#F4FBF9] to-[#3FD0C9]/30 px-4 py-8 font-sans">

            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-[420px] flex-col rounded-2xl border border-[#C1E8E0] bg-white px-8 py-10 shadow-xl sm:px-10"
            >

                <div className="flex flex-col items-center">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#02353C] text-2xl font-bold text-[#3FD0C9] shadow-md">
                        EM
                    </div>

                    <h2 className="text-center text-2xl font-bold text-[#02353C]">
                        Employee Management
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        Sign in to access your account
                    </p>

                    <div className="mt-8 flex w-full items-center gap-3">

                        <div className="h-px flex-1 bg-[#C1E8E0]" />

                        <span className="text-sm font-semibold text-[#449342]">
                            User Login
                        </span>

                        <div className="h-px flex-1 bg-[#C1E8E0]" />

                    </div>

                </div>

                <label
                    htmlFor="username"
                    className="mb-2 mt-7 text-sm font-semibold text-[#02353C]"
                >
                    Username
                </label>

                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                    className="h-11 w-full rounded-lg border border-[#C1E8E0] bg-[#F8FCFB] px-3 text-[#02353C] outline-none transition focus:border-[#2EAF7D] focus:ring-2 focus:ring-[#3FD0C9]/40"
                />

                <label
                    htmlFor="password"
                    className="mb-2 mt-5 text-sm font-semibold text-[#02353C]"
                >
                    Password
                </label>

                <div className="relative">

                    <input
                        id="password"
                        name="password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        className="h-11 w-full rounded-lg border border-[#C1E8E0] bg-[#F8FCFB] px-3 pr-12 text-[#02353C] outline-none transition focus:border-[#2EAF7D] focus:ring-2 focus:ring-[#3FD0C9]/40"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#02353C]"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        <EyeIcon
                            visible={showPassword}
                        />
                    </button>

                </div>

                <div className="mt-5">

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                        <input
                            type="checkbox"
                            name="remember"
                            className="h-4 w-4 accent-[#2EAF7D]"
                        />

                        Keep me logged in

                    </label>

                    {message && (
                        <p
                            role="alert"
                            className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                        >
                            {message}
                        </p>
                    )}

                </div>

                <button
                    type="submit"
                    className="mt-7 h-12 w-full cursor-pointer rounded-lg bg-[#2EAF7D] font-semibold text-white shadow-sm transition hover:bg-[#02353C] focus:outline-none focus:ring-2 focus:ring-[#3FD0C9] focus:ring-offset-2"
                >
                    Login
                </button>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Employee Management System
                </p>

            </form>

        </div>
    );
}

export default Login;