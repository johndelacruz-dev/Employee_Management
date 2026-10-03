import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

import Navbar from "./Navbar";

function AuthenticatedLayout({ children }) {
    const { url } = usePage();

    let page = "Home";

    if (url === "/employees") {
        page = "View";
    }

    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await fetch("/api/me");

                if (!response.ok) {
                    router.visit("/login");
                    return;
                }

                const data = await response.json();

                console.log("Logged in user:", data.user);

                setCheckingSession(false);

            } catch (error) {
                console.error("Session check failed:", error);
                router.visit("/login");
            }
        }

        checkSession();
    }, []);

    if (checkingSession) {
        return (
            <p>Checking session...</p>
        );
    }

    return (
        <div className="min-h-screen">

            <Navbar currentPath={page} />

            <main className="ml-[40px] md:ml-[260px] mt-[-540px]">
                {children}
            </main>

        </div>
    );
}

export default AuthenticatedLayout;