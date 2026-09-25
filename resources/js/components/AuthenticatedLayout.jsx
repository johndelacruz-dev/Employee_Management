import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

function AuthenticatedLayout() {
    const navigate = useNavigate();

    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await fetch("/api/me");

                if (!response.ok) {
                    navigate("/login");
                    return;
                }

                const data = await response.json();

                console.log("Logged in user:", data.user);

                setCheckingSession(false);

            } catch (error) {
                console.error("Session check failed:", error);
                navigate("/login");
            }
        }

        checkSession();
    }, [navigate]);

    if (checkingSession) {
        return <p>Checking session...</p>;
    }

    return (
        <>
            <Navbar />

            <Outlet />
        </>
    );
}

export default AuthenticatedLayout;