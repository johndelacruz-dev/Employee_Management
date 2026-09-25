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
        <div>
            <div>
                <div>
                    <p>Employee Management</p>
                </div>
                <div>
                    <p>
                        Main Menu
                    </p>
                    <Link>Home</Link>
                    <Link>View Employees</Link>
                    <Link>Add Employees</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
            <div>
                <div>
                    <p>Management</p>
                    <p>Home</p>
                </div>
                <div>
                    <div><p>U</p></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;