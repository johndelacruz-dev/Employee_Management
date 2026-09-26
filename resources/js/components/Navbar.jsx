import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

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
            <div className="fixed left-0 top-0 h-screen w-[260px] border-r-2 border-gray-200">

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

            {/* Right-side header */}
            <div className="ml-[260px] flex-1">

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