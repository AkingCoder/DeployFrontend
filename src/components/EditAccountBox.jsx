import React, { useState, useEffect } from 'react';
import useUpdateAcc from '../hooks/userHooks/useUpdateAcc';
const EditAccountBox = ({ hide, toggleHideEditBox, user }) => {
    const { updateAcc, data: updatedUser, loading, error } = useUpdateAcc();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const userDetail = user || ''
    const [hideComponent, setHideComponent] = useState(hide||false);

    useEffect(() => {
        setHideComponent(hide);
    }, [hide]);

    useEffect(() => {
        setEmail(userDetail?.email);
        setUserName(userDetail?.username);
    }, [userDetail])

    // Handle avatar preview

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userName || !email) {
            alert('Please fill in all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate sending data to the server
        updateAcc(email, userName);
        console.log('Submitted data:', { userName, email });
        if (error) {
            alert('Account details updated successfully');
            toggleHideEditBox();
        }
    };

    return (
        <div
            className={`absolute top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex justify-center items-center ${hideComponent && 'hidden'
                }`}
        >
            <div className="bg-white rounded-xl border p-6 w-[30rem] shadow-lg relative">
                <h1 className="text-center font-bold text-2xl mb-4">Edit Account Details</h1>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">username</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your user name"
                            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {error &&
                        <h3 className='text-red-500 font-semibold mb-3'>
                            username or email is already in use
                        </h3>
                    }
                    {/* Buttons */}
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

export default EditAccountBox;
