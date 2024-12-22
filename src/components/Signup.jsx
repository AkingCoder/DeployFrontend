import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/userHooks/useSignup';

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { signup, error } = useSignup();

    const [errors, setErrors] = useState({}); // State to handle validation errors

    const validateInputs = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email.";

        if (!username) newErrors.username = "Username is required.";
        else if (username.length < 3) newErrors.username = "Username must be at least 3 characters.";

        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

        if (!avatar) newErrors.avatar = "Please upload an avatar.";

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const inputErrors = validateInputs();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return; // Stop form submission if validation fails
        }

        // Proceed with signup if inputs are valid
        signup(email, username, password, avatar);

        // Reset form
        setUsername("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setAvatarPreview(null);
        setErrors({});
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    return (
        <section className="bg-zinc-200 h-[calc(100vh-3rem)] flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Create Your Account</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-1"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="elonKingExample"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-1"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-1"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Avatar Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                        <div className="flex items-center space-x-4 relative">
                            <label
                                htmlFor="avatar"
                                className="cursor-pointer px-8 py-2 bg-gradient-to-r from-purple-500 to-purple-800 text-white font-medium rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Choose File
                            </label>
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            {avatar && (
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="size-14 left-32 absolute rounded-md object-cover"
                                />
                            )}
                        </div>
                        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
                    </div>

                    {/* General Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-3 text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Sign Up
                    </button>

                    {/* Login Redirect */}
                    <p className="text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default SignUpForm;
