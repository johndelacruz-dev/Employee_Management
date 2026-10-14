import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

function ViewEmployees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { auth } = usePage().props;

    const permissions = auth?.permissions ?? [];

    const canEditEmployee = permissions.includes("edit employees");
    const canDeleteEmployee = permissions.includes("delete employees");

    const canManageEmployees = canEditEmployee || canDeleteEmployee;

    async function loadEmployees(searchValue = "") {
        setLoading(true);
        setError("");

        try {
            const params = new URLSearchParams();

            if (searchValue.trim() !== "") {
                params.set("search", searchValue.trim());
            }

            const response = await fetch(
                `/api/employees?${params.toString()}`,
                {
                    headers: { Accept: "application/json" },
                    credentials: "same-origin",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to retrieve employee records.");
            }

            const data = await response.json();
            setEmployees(data);
        } catch (err) {
            setError(err.message || "Something went wrong.");
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    function handleSearch(event) {
        event.preventDefault();
        loadEmployees(search);
    }

    async function handleDelete(employee) {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`
        );

        if (!confirmed) return;

        try {
            setError("");

            const response = await fetch(
                `/api/employees/${employee.employee_id}`,
                {
                    method: "DELETE",
                    headers: { Accept: "application/json" },
                    credentials: "same-origin",
                }
            );

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error(
                        "You do not have permission to delete employees."
                    );
                }

                if (response.status === 401) {
                    throw new Error(
                        "Your session has expired. Please log in again."
                    );
                }

                const data = await response.json().catch(() => ({}));

                throw new Error(
                    data.message || "Failed to delete employee."
                );
            }

            await loadEmployees(search);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        }
    }

    function renderActions(employee) {
        if (!canManageEmployees) {
            return null;
        }

        return (
            <div className="flex flex-wrap items-center gap-2">
                {canEditEmployee && (
                    <button
                        type="button"
                        onClick={() => {
                            // Connect to the dedicated edit page later.
                        }}
                        className="
                            rounded-md border border-blue-300
                            px-3 py-2 text-xs font-medium text-blue-700
                            hover:bg-blue-50
                        "
                    >
                        Edit
                    </button>
                )}

                {canDeleteEmployee && (
                    <button
                        type="button"
                        onClick={() => handleDelete(employee)}
                        className="
                            rounded-md border border-red-300
                            px-3 py-2 text-xs font-medium text-red-700
                            hover:bg-red-50
                        "
                    >
                        Delete
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                <div className="p-4 md:p-6">

                    {/* Search / Filter */}
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <input
                            type="text"
                            placeholder="Search by employee name"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            className="
                                h-10 min-w-0 flex-1 rounded-md
                                border border-gray-300 px-3 text-sm
                                outline-none focus:border-gray-500
                            "
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                h-10 rounded-md bg-gray-800 px-5
                                text-sm font-medium text-white
                                hover:bg-gray-700 disabled:opacity-50
                            "
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>

                        <button
                            type="button"
                            className="
                                h-10 rounded-md border border-gray-300
                                px-5 text-sm font-medium text-gray-700
                                hover:bg-gray-100
                            "
                        >
                            Filter
                        </button>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <p className="mt-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Loading Message */}
                    {loading && employees.length === 0 && (
                        <p className="py-8 text-center text-sm text-gray-500">
                            Loading employees...
                        </p>
                    )}

                    {/* Desktop Table */}
                    <div className="
                        mt-5
                        hidden
                        overflow-x-auto
                        rounded-xl
                        border-2
                        border-gray-200
                        md:block
                    ">
                        <div className="min-w-[1100px]">

                            {/* Header */}
                            <div className="
                                grid
                                grid-cols-[50px_2fr_1.5fr_1.5fr_1.5fr_1.5fr_170px]
                                items-center
                                gap-4
                                border-b
                                border-gray-200
                                bg-gray-50
                                px-5
                                py-4
                                text-sm
                                font-medium
                                text-gray-600
                            ">
                                <p>No.</p>
                                <p>Name</p>
                                <p>Job Title</p>
                                <p>Job Position</p>
                                <p>Employee Status</p>
                                <p>Department</p>
                                {canManageEmployees && <p>Actions</p>}
                            </div>

                            {/* Employee Rows */}
                            <div>
                                {employees.map((employee, index) => (
                                    <div
                                        key={employee.employee_id}
                                        className="
                                            grid
                                            grid-cols-[50px_2fr_1.5fr_1.5fr_1.5fr_1.5fr_170px]
                                            items-center
                                            gap-4
                                            border-b
                                            border-gray-100
                                            px-5
                                            py-4
                                            text-sm
                                            text-gray-700
                                            last:border-b-0
                                            hover:bg-gray-50
                                        "
                                    >
                                        <p>{index + 1}</p>

                                        <p className="font-medium text-gray-900">
                                            {employee.first_name} {employee.last_name}
                                        </p>

                                        <p>{employee.job_title_name}</p>

                                        <p>{employee.job_position_name}</p>

                                        <p>{employee.employee_status_name}</p>

                                        <p>{employee.department_name}</p>

                                        <div className="flex items-center gap-2">
                                            {canManageEmployees && (
                                                <div>
                                                    {renderActions(employee)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Employee Cards */}
                    <div className="mt-5 space-y-4 md:hidden">
                        {employees.map((employee, index) => (
                            <div
                                key={employee.employee_id}
                                className="
                                    rounded-xl border border-gray-200
                                    bg-white p-4 shadow-sm
                                "
                            >
                                <div className="flex items-start gap-3">
                                    <div className="
                                        flex h-10 w-10 shrink-0
                                        items-center justify-center rounded-full
                                        bg-gray-100 text-sm font-semibold
                                        text-gray-700
                                    ">
                                        {employee.first_name?.charAt(0)}
                                        {employee.last_name?.charAt(0)}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="break-words font-semibold text-gray-900">
                                            {employee.first_name} {employee.last_name}
                                        </h3>
                                        <p className="mt-1 break-words text-sm text-gray-500">
                                            {employee.job_title_name}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Employee #{employee.employee_id}
                                        </p>
                                    </div>
                                </div>

                                <div className="my-4 border-t border-gray-100" />

                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Job Position
                                        </span>
                                        <span className="text-right text-sm text-gray-800">
                                            {employee.job_position_name}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Status
                                        </span>
                                        <span className="text-right text-sm text-gray-800">
                                            {employee.employee_status_name}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Department
                                        </span>
                                        <span className="text-right text-sm text-gray-800">
                                            {employee.department_name}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    {canManageEmployees && (
                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            {renderActions(employee)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty Results */}
                    {!loading && !error && employees.length === 0 && (
                        <p className="py-8 text-center text-sm text-gray-500">
                            {search.trim()
                                ? "No employees found matching your search."
                                : "No employee records found."}
                        </p>
                    )}

                    {/* Result Count */}
                    <p className="mt-4 text-sm text-gray-500">
                        {employees.length} employee
                        {employees.length !== 1 ? "s" : ""} found
                    </p>
                </div>
            </div>
        </div>
    );
}

ViewEmployees.layout = (page) => (
    <AuthenticatedLayout>
        {page}
    </AuthenticatedLayout>
);

export default ViewEmployees;
