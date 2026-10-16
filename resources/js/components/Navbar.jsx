import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

function Navbar({ currentPath }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const canAddEmployees = auth.permissions.includes("add employees");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function handleLogout() {
        router.post("/logout");
    }

    const menuClass =
        "block rounded-lg px-5 py-3 mb-3 text-[#C1F6ED] hover:bg-[#2EAF7D] hover:text-white transition-colors duration-200";

    return (
        <div className="flex flex-col h-screen">

            <div
                className={`fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-[#2EAF7D] bg-[#02353C] transition-transform duration-300 md:translate-x-0 ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >

                <div className="border-b border-[#2EAF7D] px-5 py-5 font-bold text-white">
                    <p className="text-lg">
                        Employee Management
                    </p>

                    <p className="mt-1 text-xs font-normal text-[#C1F6ED]">
                        Management System
                    </p>
                </div>

                <div className="flex flex-col px-4 pt-12">

                    <p className="mb-4 px-5 text-xs font-semibold uppercase tracking-widest text-[#3FD0C9]">
                        Main Menu
                    </p>

                    <Link
                        href="/landing"
                        className={`${menuClass} ${
                            currentPath === "Home"
                                ? "bg-[#2EAF7D] text-white"
                                : ""
                        }`}
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        Home
                    </Link>

                    <Link
                        href="/employees"
                        className={`${menuClass} ${
                            currentPath === "View Employees"
                                ? "bg-[#2EAF7D] text-white"
                                : ""
                        }`}
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        View Employees
                    </Link>

                    {canAddEmployees && (
                        <Link
                            href="/employees/add"
                            className={`${menuClass} ${
                                currentPath === "Add Employees"
                                    ? "bg-[#2EAF7D] text-white"
                                    : ""
                            }`}
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        >
                            Add Employees
                        </Link>
                    )}

                    <div className="my-4 border-t border-[#2EAF7D]/60" />

                    <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer rounded-lg px-5 py-3 text-left text-[#C1F6ED] transition-colors hover:bg-[#449342] hover:text-white"
                    >
                        Logout
                    </button>

                </div>

                <div className="absolute bottom-0 w-full border-t border-[#2EAF7D]/60 px-5 py-4">
                    <p className="text-xs text-[#C1F6ED]">
                        Employee Management System
                    </p>
                </div>

            </div>

            <button
                onClick={() =>
                    setSidebarOpen(!sidebarOpen)
                }
                aria-label={
                    sidebarOpen
                        ? "Close sidebar"
                        : "Open sidebar"
                }
                aria-expanded={sidebarOpen}
                className={`fixed left-0 top-1/3 z-[100] flex h-14 w-10 -translate-y-1/2 items-center justify-center rounded-r-lg border border-[#2EAF7D] bg-[#02353C] text-2xl text-white shadow-md transition-transform duration-300 hover:bg-[#2EAF7D] ${
                    sidebarOpen
                        ? "translate-x-[260px]"
                        : "translate-x-0"
                } md:hidden`}
            >
                <span>
                    {sidebarOpen ? "‹" : "›"}
                </span>
            </button>

            <div className="fixed left-0 right-0 top-0 z-30 border-b border-[#D5EAE5] bg-white md:left-[260px]">

                <div className="flex items-center justify-between px-5 py-4">

                    <div className="flex min-w-0 items-center">

                        <p className="font-semibold text-[#02353C]">
                            Management
                        </p>

                        <p className="ml-2 truncate text-[#449342]">
                            / {currentPath}
                        </p>

                    </div>

                    <Link
                        href="/profile"
                        title="My Account"
                        aria-label="Open My Account"
                        className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#449342] font-semibold text-white transition-all duration-200 hover:bg-[#2EAF7D] hover:ring-4 hover:ring-[#3FD0C9]/30"
                    >
                        {user?.username
                            ? user.username
                                  .charAt(0)
                                  .toUpperCase()
                            : "A"}
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Navbar;