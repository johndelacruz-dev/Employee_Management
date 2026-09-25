import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        async function checkSession() {
            const response = await fetch("/api/me");

            if (!response.ok) {
                navigate("/login");
                return;
            }

            const data = await response.json();

            console.log("Logged in user:", data.user);

            setCheckingSession(false);
        }

        checkSession();

    }, [navigate]);

    if (checkingSession) {
        return (
            <p>Checking session...</p>
        );
    }

    return (
        <p>Welcome to the landing page</p>
    );
}

export default Landing;