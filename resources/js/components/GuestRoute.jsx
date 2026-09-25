import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function GuestRoute() {
    const navigate = useNavigate();

    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await fetch("/api/me");

                if (response.ok) {
                    navigate("/landing");
                    return;
                }

                setCheckingSession(false);

            } catch (error) {
                console.error("Session check failed:", error);
                setCheckingSession(false);
            }
        }

        checkSession();
    }, [navigate]);

    if (checkingSession) {
        return (<p>Checking session...</p>);
    }

    return (
        <Outlet />
    );
}

export default GuestRoute;