function Landing() {
    const employeeStatuses = [
        {
            name: "Full-time Employee",
            color: "bg-green-600",
            value: "loading...",
        },
        {
            name: "Part-time Employee",
            color: "bg-sky-500",
            value: "loading...",
        },
        {
            name: "Contract Employee",
            color: "bg-yellow-400",
            value: "loading...",
        },
        {
            name: "Temporary Employee",
            color: "bg-purple-500",
            value: "loading...",
        },
        {
            name: "Probationary Employee",
            color: "bg-orange-500",
            value: "loading...",
        },
        {
            name: "Permanent Employee",
            color: "bg-teal-500",
            value: "loading...",
        },
        {
            name: "Seasonal Employee",
            color: "bg-pink-400",
            value: "loading...",
        },
        {
            name: "Intern Employee",
            color: "bg-slate-700",
            value: "loading...",
        },
        {
            name: "Remote Employee",
            color: "bg-red-500",
            value: "loading...",
        },
    ];

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
                        loading...
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
                                <div
                                    className={`
                                        flex
                                        h-full
                                        w-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        text-sm
                                        text-white
                                        ${status.color}
                                    `}
                                >
                                    {status.value}
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
                                {status.value}
                            </p>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Landing;