import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function handleLogout() {
        const response = await fetch("/api/logout", {
            method: "POST",
        });

        if (response.ok) {
            navigate("/login");
        }
    }
    
    return (
        <div className="flex flex-col h-screen">

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-screen w-[260px] border-r-2 border-gray-200 bg-white transition-transform duration-300 md:translate-x-0 z-31 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Logo */}
                <div className="border-b-2 border-gray-200 px-5 py-4 font-bold">
                    <p>Employee Management</p>
                </div>

                {/* Menu */}
                <div className="flex flex-col px-5 pt-8">

                    <p className="text-sm text-gray-500 mb-4">
                        Main Menu
                    </p>

                    <Link
                        to="/landing"
                        className="px-5 py-2.5 mb-3 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
                    >
                        Home
                    </Link>

                    <Link
                        to="/employees"
                        className="px-5 py-2.5 mb-3 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
                    >
                        View Employees
                    </Link>

                    <Link
                        to="/employees/add"
                        className="px-5 py-2.5 mb-3 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
                    >
                        Add Employees
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex text-left px-5 py-2.5 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 cursor-pointer"
                    >
                        Logout
                    </button>

                </div>
            </div>

            {/* Mobile arrow button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`
                    fixed
                    left-0
                    top-1/3
                    z-[100]
                    flex
                    h-14
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-r-lg
                    border
                    border-gray-300
                    bg-gray-200
                    text-2xl
                    text-gray-700
                    shadow-md
                    hover:bg-gray-300
                    transition-transform
                    duration-300
                    ${sidebarOpen ? "translate-x-[260px]" : "translate-x-0"}

                    md:hidden
                `}
            >
                <span className="text-xl">
                    {sidebarOpen ? "‹" : "›"}
                </span>
            </button>

            {/* Top-side header */}
            <div className={`
                ml-0 
                flex-1 
                bg-white
                fixed
                top-0
                right-0
                left-0
                md:left-[260px]
                z-30
                border-b-2
                border-gray-200
                bg-white
            `}>

                <div className="flex items-center justify-between border-b-2 border-gray-200 px-5 py-3">

                    <div className="flex items-center">
                        <p className="text-[17px]">
                            Management
                        </p>

                        <p className="text-[17px] text-gray-500 ml-2">
                            / Home
                        </p>
                    </div>

                    <div className="w-[35px] h-[35px] rounded-full bg-gray-500 flex items-center justify-center mr-2">
                        <p className="text-white text-lg">
                            U
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Navbar;