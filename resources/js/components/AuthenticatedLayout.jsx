import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Navbar";

function AuthenticatedLayout() {
    const location = useLocation();

    const navigate = useNavigate();

    let page = "Home";

    if (location.pathname === "/employees") {
        page = "View";
    }

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
        return (<p>Checking session...</p>);
    }

    return (
        <>
            <div className="min-h-screen">

                <Navbar currentPath={page}/>

                <main className="ml-[40px] md:ml-[260px] mt-[-540px]">
                    <Outlet />
                </main>

            </div>
        </>
    );
}

export default AuthenticatedLayout;