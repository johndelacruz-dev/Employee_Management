
import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

function Landing() {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        fetch("/api/employee-statistics", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load employee statistics.");
                }

                return response.json();
            })
            .then((data) => {
                setStatistics(data);
            })
            .catch((error) => {
                console.error("Error loading employee statistics:", error);
            });
    }, []);

    const statusColors = {
        "Full-time": "bg-[#449342]",
        "Part-time": "bg-[#3FD0C9]",
        "Contract": "bg-[#2EAF7D]",
        "Temporary": "bg-[#02353C]",
        "Probationary": "bg-[#76C893]",
        "Permanent": "bg-[#258B68]",
        "Seasonal": "bg-[#65D9C8]",
        "Intern": "bg-[#17616A]",
        "Remote": "bg-[#82C98B]",
    };

    const employeeStatuses = statistics
        ? statistics.statuses.map((status) => ({
              name: `${status.status} Employee`,
              color: statusColors[status.status] || "bg-[#2EAF7D]",
              value: status.percentage,
              count: status.count,
          }))
        : [];

    const cardClass =
        "mt-5 rounded-xl border border-[#D5EAE5] bg-white px-5 py-5 shadow-sm";

    const headingClass = "text-lg font-semibold text-[#02353C]";

    return (
        <div className="min-h-screen bg-[#F4FBF9] p-5 md:p-6">

            {/* Dashboard Heading */}
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#449342]">
                    Overview
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#02353C]">
                    Employee Dashboard
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    View employee statistics and status distribution.
                </p>
            </div>

            {/* Total Employees */}
            <div className="flex items-center justify-between rounded-xl border border-[#C1E8E0] bg-white px-5 py-6 shadow-sm">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        Total Employees
                    </p>

                    <p className="mt-2 text-4xl font-bold text-[#02353C]">
                        {statistics
                            ? statistics.total_employees
                            : "Loading..."}
                    </p>

                    <p className="mt-2 text-sm text-[#449342]">
                        Registered employees
                    </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C1F6ED] text-2xl text-[#02353C]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-8 w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                        />
                    </svg>
                </div>
            </div>

            {/* Assigned Color Display */}
            <div className={cardClass}>
                <h2 className={`${headingClass} mb-5`}>
                    Employee Status Legend
                </h2>

                <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {employeeStatuses.map((status) => (
                        <div
                            key={status.name}
                            className="flex items-center text-sm text-gray-600"
                        >
                            <span
                                className={`mr-2 h-3 w-3 rounded-sm ${status.color}`}
                            />

                            {status.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Percentage Analytics */}
            <div className={cardClass}>
                <div className="mb-7">
                    <h2 className={headingClass}>
                        Employee Status Percentage
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Distribution of employees by employment status.
                    </p>
                </div>

                {statistics ? (
                    <div className="space-y-6">
                        {employeeStatuses.map((status) => (
                            <div
                                key={status.name}
                                className="grid grid-cols-[120px_1fr] items-center gap-3 md:grid-cols-[180px_1fr] md:gap-4"
                            >
                                <p className="text-sm text-gray-600">
                                    {status.name}
                                </p>

                                <div className="h-8 w-full overflow-hidden rounded-md bg-[#E8F4F0]">
                                    <div className="relative h-full w-full">
                                        <div
                                            className={`h-full rounded-md transition-all duration-500 ${status.color}`}
                                            style={{
                                                width: `${Math.max(
                                                    0,
                                                    Math.min(
                                                        100,
                                                        Number(status.value) || 0
                                                    )
                                                )}%`,
                                            }}
                                        />

                                        <span
                                            className={`absolute top-1/2 -translate-y-1/2 text-xs font-semibold ${
                                                Number(status.value) >= 50
                                                    ? "left-1/2 -translate-x-1/2 text-white"
                                                    : "text-[#02353C]"
                                            }`}
                                            style={
                                                Number(status.value) < 50
                                                    ? {
                                                          left: `calc(${Math.max(
                                                              0,
                                                              Math.min(
                                                                  100,
                                                                  Number(status.value) || 0
                                                              )
                                                          )}% + 8px)`,
                                                      }
                                                    : {}
                                            }
                                        >
                                            {status.value}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Measurement */}
                        <div className="grid grid-cols-[120px_1fr] gap-3 pt-2 md:grid-cols-[180px_1fr] md:gap-4">
                            <p className="text-sm text-gray-500">
                                Measurement
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>0%</span>
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="py-6 text-sm text-gray-500">
                        Loading employee statistics...
                    </p>
                )}
            </div>

            {/* Employee Status Count */}
            <div className={cardClass}>
                <div className="mb-6">
                    <h2 className={headingClass}>
                        Employee Status Count
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Number of employees in each category.
                    </p>
                </div>

                {statistics ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[280px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-[#D5EAE5] bg-[#F4FBF9] text-[#02353C]">
                                    <th className="px-4 py-3 font-semibold">
                                        Employee Status
                                    </th>

                                    <th className="px-4 py-3 text-right font-semibold">
                                        Count
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {employeeStatuses.map((status) => (
                                    <tr
                                        key={status.name}
                                        className="border-b border-[#E8F4F0] last:border-b-0 hover:bg-[#F4FBF9]"
                                    >
                                        <td className="px-4 py-3 text-gray-600">
                                            <span className="flex items-center">
                                                <span
                                                    className={`mr-3 h-3 w-3 rounded-sm ${status.color}`}
                                                />

                                                {status.name}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-right font-semibold text-[#02353C]">
                                            {status.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="py-6 text-sm text-gray-500">
                        Loading employee counts...
                    </p>
                )}
            </div>
        </div>
    );
}

Landing.layout = (page) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default Landing;
