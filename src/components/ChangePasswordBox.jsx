import React, { useState, useEffect } from 'react';
import useChangePassword from '../hooks/userHooks/useChangePassword';

const ChangePasswordBox = ({ hide, toggleHideEditBox }) => {
    const { data, loading, error, changePassword } = useChangePassword();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hideComponent, setHideComponent] = useState(hide);

    const passwordsMatch = newPassword === confirmPassword;

    useEffect(() => {
        setHideComponent(hide);
    }, [hide]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordsMatch) {
            alert('Passwords do not match');
            return;
        }
        changePassword(password, newPassword);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    useEffect(() => {
        if (data && !error) {
            alert('Password updated successfully');
            toggleHideEditBox();
        }
    }, [data, error]);

    return (
        <div
            className={`absolute top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex justify-center items-center ${hideComponent && 'hidden'
                }`}
        >
            <div className="bg-white rounded-xl border p-6 w-[30rem] shadow-lg relative">
                <h1 className="text-center font-bold text-2xl mb-4">Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            placeholder="Current Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 mb-4">
                            {error || 'An error occurred'}
                        </div>
                    )}
                    <div className="mb-3">
                        <input
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            className={`block w-full p-2 border-2 rounded-lg ${confirmPassword
                                    ? passwordsMatch
                                        ? 'border-green-500 focus:border-green-500 focus:outline-none'
                                        : 'border-red-500 focus:border-red-500 focus:outline-none'
                                    : 'border-gray-300'
                                }`}
                        />
                    </div>
                    <div className="mb-8 relative">
                        <input
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            className={`block w-full p-2 border-2 rounded-lg  ${confirmPassword
                                    ? passwordsMatch
                                        ? 'border-green-500 focus:border-green-500 focus:outline-none'
                                        : 'border-red-500 focus:border-red-500 focus:outline-none'
                                    : 'border-gray-300'
                                }`}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={toggleHideEditBox}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordBox;
