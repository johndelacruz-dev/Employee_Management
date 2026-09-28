function ViewEmployees() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                <div className="p-5 md:p-6">

                    {/* Message */}
                    <p className="hidden">
                        Message
                    </p>


                    {/* Search / Filter */}
                    <form className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                    ">

                        <input
                            type="text"
                            placeholder="Search"
                            className="
                                h-10
                                flex-1
                                rounded-md
                                border
                                border-gray-300
                                px-3
                                text-sm
                                outline-none
                                focus:border-gray-500
                            "
                        />

                        <button
                            type="submit"
                            className="
                                h-10
                                rounded-md
                                bg-gray-800
                                px-5
                                text-sm
                                font-medium
                                text-white
                                hover:bg-gray-700
                            "
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            className="
                                h-10
                                rounded-md
                                border
                                border-gray-300
                                px-5
                                text-sm
                                font-medium
                                text-gray-700
                                hover:bg-gray-100
                            "
                        >
                            Filter
                        </button>

                    </form>


                    {/* Employee List */}
                    <div className="
                        mt-5
                        overflow-hidden
                        rounded-xl
                        border-2
                        border-gray-200
                    ">

                        {/* Header */}
                        <div className="
                            grid
                            grid-cols-[50px_2fr_1.5fr_1.5fr_1.5fr_1.5fr_80px]
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

                            <p>No</p>
                            <p>Name</p>
                            <p>Job Title</p>
                            <p>Job Position</p>
                            <p>Employee Status</p>
                            <p>Department</p>
                            <p>Actions</p>

                        </div>


                        {/* Employee Rows */}
                        <div>
                            {/* Employee rows will go here */}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ViewEmployees;