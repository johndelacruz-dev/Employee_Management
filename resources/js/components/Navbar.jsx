import { Link } from "react-router-dom";

function Navbar() {
    return (
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
            </div>
        </div>
    );
}

export default Navbar;