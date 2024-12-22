import React, { useState, useEffect } from "react";
import useGetUserById from "../hooks/userHooks/useGetUserById";
import useUpdateComm from "../hooks/commentHooks/useUpdateComm";
import useDeleteComm from "../hooks/commentHooks/useDeleteComm";

const CommentsSection = ({ comment, userId, loggedInUserId }) => {
    const { deleteComm } = useDeleteComm();
    const { getUserById, data } = useGetUserById();
    const [user, setUser] = useState();
    const { updateComm, data: updatedComm } = useUpdateComm();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [currentContent, setCurrentContent] = useState(comment.content);

    useEffect(() => {
        getUserById(userId);
    }, [userId]);

    useEffect(() => {
        setUser(data?.data);
    }, [data]);

    useEffect(() => {
        if (updatedComm && updatedComm.success) {
            setCurrentContent(updatedComm.data.content);
            setIsEditing(false);
        }
    }, [updatedComm]);

    const handleEdit = () => {
        setIsEditing(true);
        setIsDropdownOpen(false);
    };

    const handleDelete = () => {
        deleteComm(comment._id);
        setIsDropdownOpen(false);
    };

    const handleSave = async () => {
        await updateComm(comment._id, editedContent);
    };

    const handleCancel = () => {
        setEditedContent(currentContent);
        setIsEditing(false);
    };

    const getRelativeTime = (createdAt) => {
        const now = new Date();
        const createdTime = new Date(createdAt);

        const diffInMilliseconds = now - createdTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}sec ago`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}min ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            return `${diffInDays}d ago`;
        }
    };

    return (
        <div className="flex items-start space-x-4 border-b border-black pb-4 relative">
            {/* Avatar */}
            <img
                src={user?.avatar || "https://via.placeholder.com/50"}
                alt={`${user?.username || "Anonymous"}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
            />

            {/* Comment Details */}
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-black">{user?.username || "Anonymous"}</h3>
                    <span className="text-sm text-gray-800">
                        {comment.createdAt ? getRelativeTime(comment.createdAt) : "Unknown time"}
                    </span>
                </div>

                {/* Comment Content */}
                {isEditing ? (
                    <div className="mt-2">
                        <input
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full h-full p-2 border text-black border-gray-500 rounded-sm focus:outline-none"
                        />
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-950"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-950 mt-1">{currentContent}</p>
                )}
            </div>

            {/* Options Menu */}
            {loggedInUserId === userId && (
                <>
                    <button
                        className="text-gray-800 hover:text-black"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v.01M12 12v.01M12 18v.01"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-10 right-0 bg-white shadow-lg shadow-black rounded-lg text-sm text-gray-800 z-10">
                            <ul className="py-2">
                                <li
                                    className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer"
                                    onClick={() => handleDelete()}
                                >
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CommentsSection;
