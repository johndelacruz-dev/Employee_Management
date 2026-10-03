import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

function Landing() {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        fetch("/api/employee-statistics", {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStatistics(data);
            })
            .catch(error => {
                console.error("Error loading employee statistics:", error);
            });
    }, []);

    const statusColors = {
        "Full-time": "bg-green-600",
        "Part-time": "bg-sky-500",
        "Contract": "bg-yellow-400",
        "Temporary": "bg-purple-500",
        "Probationary": "bg-orange-500",
        "Permanent": "bg-teal-500",
        "Seasonal": "bg-pink-400",
        "Intern": "bg-slate-700",
        "Remote": "bg-red-500",
    };

    const employeeStatuses = statistics
        ? statistics.statuses.map((status) => ({
            name: `${status.status} Employee`,
            color: statusColors[status.status],
            value: status.percentage,
            count: status.count,
        }))
        : [];

    return (
        <div className="p-5 md:p-6">

            {/* Message */}
            <p className="hidden">
                Message
            </p>

            {/* Total Employees */}
            <div className="
                flex
                items-center
                justify-between
                rounded-xl
                border-2
                border-gray-200
                px-5
                py-4
            ">
                <div>
                    <p className="text-gray-600">
                        Total Employees:
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-gray-800">
                        {statistics ? statistics.total_employees : "loading..."}
                    </p>
                </div>
            </div>

            {/* Assigned Color Display */}
            <div className="
                mt-5
                rounded-xl
                border-2
                border-gray-200
                px-5
                py-4
            ">
                <p className="mb-4 text-[17px] font-medium text-gray-800">
                    Assigned Color Display
                </p>

                <div className="
                    flex
                    flex-wrap
                    gap-x-6
                    gap-y-3
                ">
                    {employeeStatuses.map((status) => (
                        <div
                            key={status.name}
                            className="
                                flex
                                items-center
                                text-sm
                                text-gray-600
                            "
                        >
                            <span
                                className={`
                                    mr-2
                                    h-[13px]
                                    w-[13px]
                                    rounded-[3px]
                                    ${status.color}
                                `}
                            ></span>

                            {status.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Percentage Analytics */}
            <div className="
                mt-5
                rounded-xl
                border-2
                border-gray-200
                px-5
                py-4
            ">
                <div className="mb-7">
                    <p className="text-[18px] font-medium text-gray-800">
                        Employee Status Percentage Analytics Distribution
                    </p>
                </div>

                <div className="space-y-5">

                    {employeeStatuses.map((status) => (
                        <div
                            key={status.name}
                            className="
                                grid
                                grid-cols-[140px_1fr]
                                items-center
                                gap-4
                                md:grid-cols-[180px_1fr]
                            "
                        >
                            <p className="text-sm text-gray-600">
                                {status.name}
                            </p>

                            <div className="h-[30px] w-full rounded-md bg-gray-100">
                                <div className="relative h-full w-full">

                                    {/* Bar */}
                                    <div
                                        className={`
                                            h-full
                                            rounded-md
                                            ${status.color}
                                        `}
                                        style={{ width: `${status.value}%` }}
                                    ></div>

                                    {/* Percentage */}
                                    <span
                                        className={`
                                            absolute
                                            top-1/2
                                            -translate-y-1/2
                                            text-sm
                                            ${status.value >= 50
                                                ? "left-1/2 -translate-x-1/2 text-white"
                                                : "text-black"
                                            }
                                        `}
                                        style={
                                            status.value < 50
                                                ? { left: `calc(${status.value}% + 8px)` }
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
                    <div className="
                        grid
                        grid-cols-[140px_1fr]
                        gap-4
                        md:grid-cols-[180px_1fr]
                    ">
                        <p className="text-sm text-gray-600">
                            Measurement:
                        </p>

                        <div className="
                            flex
                            items-center
                            justify-between
                            text-sm
                            text-gray-500
                        ">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Employee Status Count */}
            <div className="
                mt-5
                rounded-xl
                border-2
                border-gray-200
                px-5
                py-4
            ">
                <div className="mb-7">
                    <p className="text-[18px] font-medium text-gray-800">
                        Employee Status Count
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3">

                    {/* Labels */}
                    <div className="space-y-5">
                        {employeeStatuses.map((status) => (
                            <p
                                key={status.name}
                                className="text-sm text-gray-600"
                            >
                                {status.name}
                            </p>
                        ))}
                    </div>

                    {/* Values */}
                    <div className="space-y-5">
                        {employeeStatuses.map((status) => (
                            <p
                                key={status.name}
                                className="text-sm font-medium text-gray-800"
                            >
                                {status.count}
                            </p>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}

Landing.layout = page => (
    <AuthenticatedLayout>
        {page}
    </AuthenticatedLayout>
);

export default Landing;