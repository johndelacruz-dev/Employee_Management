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
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Employee Management</h2>
                <div>
                    <span>User Login</span>
                </div>
            </div>
            <label>Username:</label>
            <input 
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter Username"
                required
            />

            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter Password"
                required
            />

            <div>
                <input 
                    type="checkbox"
                />
                <p>Keep me Logged in</p>
                <p>{message}</p>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;