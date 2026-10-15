
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

const initialForm = {
    first_name: "",
    last_name: "",
    contact: "",
    email: "",
    address: "",
    salary: "",
    department_id: "",
    job_title_id: "",
    job_position_id: "",
    employee_status_id: "",
    gender_id: "",
    hire_date: "",
};

const textFields = [
    { label: "First Name", name: "first_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
    { label: "Contact", name: "contact", type: "tel" },
    { label: "Email", name: "email", type: "email" },
    { label: "Address", name: "address", type: "text" },
    { label: "Salary", name: "salary", type: "number", min: "0" },
];

const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

function EditEmployee({ employeeId }) {
    const [form, setForm] = useState(initialForm);

    const [departments, setDepartments] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [jobPositions, setJobPositions] = useState([]);
    const [employeeStatuses, setEmployeeStatuses] = useState([]);
    const [genders, setGenders] = useState([]);

    const [loadingEmployee, setLoadingEmployee] = useState(true);
    const [loadingLookups, setLoadingLookups] = useState(true);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadPageData() {
            try {
                const responses = await Promise.all([
                    fetch(`/api/employees/${employeeId}`, {
                        credentials: "same-origin",
                        headers: { Accept: "application/json" },
                    }),
                    fetch("/api/departments", {
                        credentials: "same-origin",
                        headers: { Accept: "application/json" },
                    }),
                    fetch("/api/employee-statuses", {
                        credentials: "same-origin",
                        headers: { Accept: "application/json" },
                    }),
                    fetch("/api/genders", {
                        credentials: "same-origin",
                        headers: { Accept: "application/json" },
                    }),
                ]);

                const [employeeResponse, departmentResponse, statusResponse, genderResponse] =
                    responses;

                if (employeeResponse.status === 404) {
                    if (!cancelled) setNotFound(true);
                    return;
                }

                if (
                    responses.some(
                        (response) =>
                            response.status === 401 ||
                            response.status === 403
                    )
                ) {
                    throw new Error(
                        "You are not authorized to access this employee's information."
                    );
                }

                if (responses.some((response) => !response.ok)) {
                    throw new Error("Unable to load the employee form.");
                }

                const [employee, departmentData, statusData, genderData] =
                    await Promise.all(
                        responses.map((response) => response.json())
                    );

                if (cancelled) return;

                setDepartments(departmentData);
                setEmployeeStatuses(statusData);
                setGenders(genderData);

                setForm({
                    first_name: employee.first_name ?? "",
                    last_name: employee.last_name ?? "",
                    contact: employee.contact ?? "",
                    email: employee.email ?? "",
                    address: employee.address ?? "",
                    salary: String(employee.salary ?? ""),
                    department_id: String(employee.department_id ?? ""),
                    job_title_id: String(employee.job_title_id ?? ""),
                    job_position_id: String(employee.job_position_id ?? ""),
                    employee_status_id: String(
                        employee.employee_status_id ?? ""
                    ),
                    gender_id: String(employee.gender_id ?? ""),
                    hire_date: employee.hire_date
                        ? String(employee.hire_date).slice(0, 10)
                        : "",
                });
            } catch (error) {
                if (!cancelled) {
                    setMessage(
                        error.message || "Unable to load employee information."
                    );
                    setMessageType("error");
                }
            } finally {
                if (!cancelled) {
                    setLoadingEmployee(false);
                    setLoadingLookups(false);
                }
            }
        }

        loadPageData();

        return () => {
            cancelled = true;
        };
    }, [employeeId]);

    useEffect(() => {
        let cancelled = false;

        setJobTitles([]);
        setJobPositions([]);

        if (!form.department_id || loadingEmployee) {
            setLoadingJobs(false);
            return () => {
                cancelled = true;
            };
        }

        async function loadDepartmentJobs() {
            setLoadingJobs(true);

            try {
                const departmentId = encodeURIComponent(
                    form.department_id
                );

                const [titleResponse, positionResponse] = await Promise.all([
                    fetch(`/api/job-titles?department_id=${departmentId}`, {
                        credentials: "same-origin",
                        headers: { Accept: "application/json" },
                    }),
                    fetch(`/api/job-positions?department_id=${departmentId}`, {
                        credentials: "same-origin",
                        headers: { Accept: "application/json" },
                    }),
                ]);

                if (!titleResponse.ok || !positionResponse.ok) {
                    throw new Error("Unable to load job options.");
                }

                const [titles, positions] = await Promise.all([
                    titleResponse.json(),
                    positionResponse.json(),
                ]);

                if (!cancelled) {
                    setJobTitles(titles);
                    setJobPositions(positions);
                }
            } catch (error) {
                if (!cancelled) {
                    setMessage(error.message);
                    setMessageType("error");
                }
            } finally {
                if (!cancelled) {
                    setLoadingJobs(false);
                }
            }
        }

        loadDepartmentJobs();

        return () => {
            cancelled = true;
        };
    }, [form.department_id, loadingEmployee]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
            ...(name === "department_id"
                ? { job_title_id: "", job_position_id: "" }
                : {}),
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: undefined,
            ...(name === "department_id"
                ? { job_title_id: undefined, job_position_id: undefined }
                : {}),
        }));

        setMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setErrors({});
        setMessage("");

        const payload = {
            ...form,
            salary: Number(form.salary),
            department_id: Number(form.department_id),
            job_title_id: Number(form.job_title_id),
            job_position_id: Number(form.job_position_id),
            employee_status_id: Number(form.employee_status_id),
            gender_id: Number(form.gender_id),
        };

        try {
            const response = await fetch(`/api/employees/${employeeId}`, {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 422) {
                setErrors(data.errors ?? {});
                setMessage("Please correct the highlighted fields.");
                setMessageType("error");
                return;
            }

            if (response.status === 404) {
                setNotFound(true);
                return;
            }

            if (response.status === 401 || response.status === 403) {
                throw new Error(
                    response.status === 403
                        ? "You do not have permission to edit employees."
                        : "Your session may have expired. Please log in again."
                );
            }

            if (!response.ok) {
                throw new Error(data.message || "Unable to update employee.");
            }

            setMessage(data.message || "Employee updated successfully.");
            setMessageType("success");
            setErrors({});
        } catch (error) {
            setMessage(error.message || "Something went wrong.");
            setMessageType("error");
        } finally {
            setSubmitting(false);
        }
    };

    const renderRadioOptions = (
        items,
        idField,
        labelField,
        fieldName
    ) => {
        if (items.length === 0) {
            return (
                <p className="col-span-full text-sm text-gray-500">
                    No options available.
                </p>
            );
        }

        return items.map((item) => {
            const selected = form[fieldName] === String(item[idField]);

            return (
                <label
                    key={item[idField]}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${
                        selected
                            ? "border-blue-500 bg-blue-50 text-blue-800 ring-1 ring-blue-200"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                >
                    <input
                        type="radio"
                        name={fieldName}
                        value={item[idField]}
                        checked={selected}
                        onChange={handleChange}
                        required
                        className="h-4 w-4 accent-blue-600"
                    />
                    <span>{item[labelField]}</span>
                </label>
            );
        });
    };

    const renderRadioGroup = (
        title,
        items,
        idField,
        labelField,
        fieldName,
        loading = false
    ) => (
        <fieldset className="mb-7 min-w-0">
            <legend className="mb-3 text-sm font-semibold text-gray-800">
                {title}
            </legend>

            {loading ? (
                <p className="text-sm text-gray-500">Loading options...</p>
            ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {renderRadioOptions(
                        items,
                        idField,
                        labelField,
                        fieldName
                    )}
                </div>
            )}

            {errors[fieldName] && (
                <p className="mt-2 text-sm text-red-600">
                    {errors[fieldName][0]}
                </p>
            )}
        </fieldset>
    );

    if (loadingEmployee) {
        return (
            <main className="px-4 py-8 sm:px-8">
                <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                    Loading employee information...
                </div>
            </main>
        );
    }

    if (notFound) {
        return (
            <main className="px-4 py-8 sm:px-8">
                <div className="mx-auto max-w-5xl rounded-xl border border-red-200 bg-white p-6">
                    <h1 className="font-semibold text-gray-900">
                        Employee not found
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        This employee may have been deleted or the ID is invalid.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.visit("/employees")}
                        className="mt-4 rounded-md bg-[#2666BF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d529e]"
                    >
                        Back to Employees
                    </button>
                </div>
            </main>
        );
    }

    return (
        <div className="min-h-full bg-gray-50">
            <main className="px-4 py-6 sm:px-8 sm:py-8">
                {message && (
                    <div
                        role="status"
                        className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
                            messageType === "success"
                                ? "border-green-300 bg-green-50 text-green-800"
                                : "border-red-300 bg-red-50 text-red-700"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <section className="mx-auto w-full max-w-5xl rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-5 py-5 sm:px-8">
                        <h1 className="text-lg font-semibold text-gray-900">
                            Edit Employee
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the employee's information below.
                        </p>
                    </div>

                    <div className="p-5 sm:p-8">
                        {loadingLookups ? (
                            <p className="py-8 text-center text-sm text-gray-500">
                                Loading form options...
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                                    {textFields.map((field) => (
                                        <div
                                            key={field.name}
                                            className={
                                                field.name === "address"
                                                    ? "md:col-span-2"
                                                    : ""
                                            }
                                        >
                                            <label
                                                className={labelClass}
                                                htmlFor={field.name}
                                            >
                                                {field.label}
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                className={inputClass}
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                min={field.min}
                                                required
                                            />

                                            {errors[field.name] && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors[field.name][0]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="my-8 border-t border-gray-200" />

                                {renderRadioGroup(
                                    "Department",
                                    departments,
                                    "department_id",
                                    "department_name",
                                    "department_id"
                                )}

                                {renderRadioGroup(
                                    "Job Title",
                                    form.department_id ? jobTitles : [],
                                    "job_title_id",
                                    "job_title_name",
                                    "job_title_id",
                                    Boolean(form.department_id) && loadingJobs
                                )}

                                {!form.department_id && (
                                    <p className="-mt-5 mb-7 text-sm text-gray-500">
                                        Select a department to view its job titles.
                                    </p>
                                )}

                                {renderRadioGroup(
                                    "Job Position",
                                    form.department_id ? jobPositions : [],
                                    "job_position_id",
                                    "job_position_name",
                                    "job_position_id",
                                    Boolean(form.department_id) && loadingJobs
                                )}

                                {!form.department_id && (
                                    <p className="-mt-5 mb-7 text-sm text-gray-500">
                                        Select a department to view its job positions.
                                    </p>
                                )}

                                {renderRadioGroup(
                                    "Employee Status",
                                    employeeStatuses,
                                    "employee_status_id",
                                    "employee_status_name",
                                    "employee_status_id"
                                )}

                                {renderRadioGroup(
                                    "Gender",
                                    genders,
                                    "gender_id",
                                    "gender_name",
                                    "gender_id"
                                )}

                                <div className="mb-8">
                                    <label
                                        htmlFor="hire_date"
                                        className={labelClass}
                                    >
                                        Hire Date
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        className={`${inputClass} sm:max-w-sm`}
                                        id="hire_date"
                                        name="hire_date"
                                        type="date"
                                        value={form.hire_date}
                                        onChange={handleChange}
                                        required
                                    />

                                    {errors.hire_date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.hire_date[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => router.visit("/employees")}
                                        disabled={submitting}
                                        className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={submitting || loadingJobs}
                                        className="rounded-md bg-[#2666BF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d529e] active:bg-[#144589] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {submitting
                                            ? "Saving Changes..."
                                            : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

EditEmployee.layout = (page) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default EditEmployee;
