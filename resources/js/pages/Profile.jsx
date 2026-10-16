import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

function EyeIcon({ visible }) {
    if (visible) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
            >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
        >
            <path d="M3.53 3.53 20.47 20.47" />
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
            <path d="M9.88 4.24A10.7 10.7 0 0 1 12 4c5 0 8.73 3.11 10 8a10.7 10.7 0 0 1-2.04 4.22" />
            <path d="M6.61 6.61C4.62 7.9 3.1 9.72 2 12c1.27 4.89 5 8 10 8 1.61 0 3.08-.34 4.39-.96" />
        </svg>
    );
}

function Profile() {
    const { auth } = usePage().props;
    const user = auth.user;

    const role =
        Number(user?.privilege_level) === 1
            ? "Admin"
            : "Manager";

    const [username, setUsername] = useState(
        user?.username || ""
    );

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [password, setPassword] = useState("");

    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showPasswordConfirmation,
        setShowPasswordConfirmation,
    ] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [saving, setSaving] = useState(false);

    const passwordTooShort =
        password.length > 0 &&
        password.length < 8;

    const passwordMismatch =
        passwordConfirmation.length > 0 &&
        password !== passwordConfirmation;

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        if (password && password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (
            password &&
            password !== passwordConfirmation
        ) {
            setError(
                "New passwords do not match."
            );
            return;
        }

        if (password && !currentPassword) {
            setError(
                "Please enter your current password."
            );
            return;
        }

        setSaving(true);

        try {
            const response = await fetch(
                "/api/profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Accept:
                            "application/json",

                        "X-Requested-With":
                            "XMLHttpRequest",
                    },

                    credentials: "same-origin",

                    body: JSON.stringify({
                        username: username,
                        current_password:
                            currentPassword || undefined,
                        password:
                            password || undefined,
                        password_confirmation:
                            passwordConfirmation ||
                            undefined,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                if (data.errors) {
                    const firstError =
                        Object.values(
                            data.errors
                        )[0];

                    if (
                        Array.isArray(firstError)
                    ) {
                        throw new Error(
                            firstError[0]
                        );
                    }

                    throw new Error(
                        firstError
                    );
                }

                throw new Error(
                    data.message ||
                        "Failed to update your account."
                );
            }

            setMessage(
                "Your account has been updated successfully."
            );

            setCurrentPassword("");
            setPassword("");
            setPasswordConfirmation("");

            router.reload({
                only: ["auth"],
            });
        } catch (err) {
            setError(
                err.message ||
                    "Something went wrong while updating your account."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#F4FBF9] p-5 md:p-6">

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#449342]">
                    Account
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#02353C]">
                    My Account
                </h1>
            </div>

            <div className="w-full rounded-xl border border-[#C1E8E0] bg-white p-6 shadow-sm md:p-8">

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-[#02353C]">
                        Account Information
                    </h2>
                </div>

                {message && (
                    <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-semibold text-[#02353C]"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            required
                            className="h-11 w-full rounded-lg border border-[#C1E8E0] bg-[#F8FCFB] px-3 text-[#02353C] outline-none transition focus:border-[#2EAF7D] focus:ring-2 focus:ring-[#3FD0C9]/40"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="role"
                            className="mb-2 block text-sm font-semibold text-[#02353C]"
                        >
                            Account Role
                        </label>

                        <input
                            id="role"
                            type="text"
                            value={role}
                            disabled
                            className="h-11 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 text-gray-500"
                        />
                    </div>

                    <div className="mb-6 border-t border-[#E8F4F0] pt-6">

                        <h3 className="mb-5 text-base font-semibold text-[#02353C]">
                            Change Password
                        </h3>

                        <div className="mb-5">
                            <label
                                htmlFor="current_password"
                                className="mb-2 block text-sm font-semibold text-[#02353C]"
                            >
                                Current Password
                            </label>

                            <div className="relative">

                                <input
                                    id="current_password"
                                    name="current_password"
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={currentPassword}
                                    onChange={(event) =>
                                        setCurrentPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                    className="h-11 w-full rounded-lg border border-[#C1E8E0] bg-[#F8FCFB] px-3 pr-12 text-[#02353C] outline-none transition focus:border-[#2EAF7D] focus:ring-2 focus:ring-[#3FD0C9]/40"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#02353C]"
                                    aria-label={
                                        showCurrentPassword
                                            ? "Hide current password"
                                            : "Show current password"
                                    }
                                >
                                    <EyeIcon
                                        visible={
                                            showCurrentPassword
                                        }
                                    />
                                </button>

                            </div>
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-[#02353C]"
                            >
                                New Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    className={`h-11 w-full rounded-lg border bg-[#F8FCFB] px-3 pr-12 text-[#02353C] outline-none transition focus:ring-2 ${
                                        passwordTooShort
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                            : "border-[#C1E8E0] focus:border-[#2EAF7D] focus:ring-[#3FD0C9]/40"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#02353C]"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <EyeIcon
                                        visible={
                                            showPassword
                                        }
                                    />
                                </button>

                            </div>

                            <p
                                className={`mt-1 text-xs ${
                                    passwordTooShort
                                        ? "font-semibold text-red-500"
                                        : "text-gray-400"
                                }`}
                            >
                                {passwordTooShort
                                    ? "Password must be at least 8 characters."
                                    : "Minimum of 8 characters."}
                            </p>
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="password_confirmation"
                                className="mb-2 block text-sm font-semibold text-[#02353C]"
                            >
                                Confirm New Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type={
                                        showPasswordConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        passwordConfirmation
                                    }
                                    onChange={(event) =>
                                        setPasswordConfirmation(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    className={`h-11 w-full rounded-lg border bg-[#F8FCFB] px-3 pr-12 text-[#02353C] outline-none transition focus:ring-2 ${
                                        passwordMismatch
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                            : "border-[#C1E8E0] focus:border-[#2EAF7D] focus:ring-[#3FD0C9]/40"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPasswordConfirmation(
                                            !showPasswordConfirmation
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#02353C]"
                                    aria-label={
                                        showPasswordConfirmation
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <EyeIcon
                                        visible={
                                            showPasswordConfirmation
                                        }
                                    />
                                </button>

                            </div>

                            {passwordMismatch && (
                                <p className="mt-1 text-xs font-semibold text-red-500">
                                    Passwords do not match.
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-[#2EAF7D] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#02353C] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

Profile.layout = (page) => (
    <AuthenticatedLayout>
        {page}
    </AuthenticatedLayout>
);

export default Profile;