import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/userHooks/useLogin';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' }); // State for managing input errors
    const { data, error, loading, login } = useLogin();

    const validateFields = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required.';
        else if (username.length < 3)
            newErrors.username = 'Username must be at least 3 characters.';
        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6)
            newErrors.password = 'Password must be at least 6 characters.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateFields()) {
            await login(username, password);
            setUsername('');
            setPassword('');
        }
    };

    return (
        <section className="bg-zinc-200 h-[calc(100vh-5rem)] flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="elonKingExample"
                            value={username}
                            className={`bg-gray-50 border ${
                                errors.username
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            } text-gray-900 rounded-lg block w-full p-3 mt-1`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className={`bg-gray-50 border ${
                                errors.password
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            } text-gray-900 rounded-lg block w-full p-3 mt-1`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-3 text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Log In
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
