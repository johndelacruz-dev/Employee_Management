import { usePage } from "@inertiajs/react";

import Navbar from "./Navbar";

function AuthenticatedLayout({ children }) {
    const { url } = usePage();

    let page = "Home";

    if (url === "/employees") {
        page = "View";
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