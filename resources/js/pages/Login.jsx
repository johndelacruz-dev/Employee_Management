import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            navigate("/landing");
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center font-sans">
            <form
                onSubmit={handleSubmit}
                className="w-full lg:max-w-[400px] flex flex-col border border-gray-800 py-[40px] px-[40px] rounded-[10px]"
            >
                {/* Title */}
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-2xl font-semibold">
                        Employee Management
                    </h2>

                    {/* Separator */}
                    <div className="flex items-center w-full mt-10 mb-10">
                        <div className="flex-1 border-t border-gray-300"></div>

                        <span className="px-2 text-black">
                            User Login
                        </span>

                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                </div>

                {/* Username */}
                <label className="mb-2">
                    Username:
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter Username"
                    required
                    className="w-full h-[30px] mb-7 px-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Password */}
                <label className="mb-2">
                    Password:
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter Password"
                    required
                    className="w-full h-[30px] mb-7 px-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Checkbox + Message */}
                <div className="flex items-center relative mb-4">
                    <input
                        type="checkbox"
                        className="mr-2"
                    />

                    <p className="mr-2">
                        Keep me Logged in
                    </p>

                    <p className="absolute left-full ml-2 text-red-500 whitespace-nowrap">
                        {message}
                    </p>
                </div>

                {/* Login button */}
                <button
                    type="submit"
                    className="w-full h-[30px] border-0 text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;