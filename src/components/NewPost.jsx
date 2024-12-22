import React, { useState } from 'react';
import useCreatePost from '../hooks/postHooks/useCreatePost';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const { createPost } = useCreatePost();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postPicture, setPostPicture] = useState("");
    const [postPicturePreview, setPostPicturePreview] = useState("");
    const [privateMode, setPrivateMode] = useState(false);
    const navigate = useNavigate();

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostPicture(file);
            setPostPicturePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        createPost(title, content, privateMode, postPicture);
        navigate("/");
    };

    return (
        <div className="relative max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-2xl border border-gray-200 mt-5">
            {/* Private Mode Toggle */}

            <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800 text-center sm:text-left">
                Create New Post
            </h1>
            <div className="flex items-center justify-end sm:absolute  top-4 right-4 mb-1 sm:mb-0">
                <span className="text-sm sm:text-lg font-medium text-gray-700 mr-4">
                    Private
                </span>
                <div
                    onClick={() => setPrivateMode(!privateMode)}
                    className={`w-12 sm:w-14 h-6 sm:h-7 flex items-center cursor-pointer ${
                        privateMode ? "bg-black" : "bg-gray-300"
                    } rounded-full p-1 transition-colors duration-300 ease-in-out`}
                >
                    <div
                        className={`w-5 h-5 bg-black rounded-full transform transition-transform ${
                            privateMode ? "translate-x-6 sm:translate-x-7 bg-white" : ""
                        }`}
                    ></div>
                </div>
            </div>

            {/* Title */}
            <div className="mb-6">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="Title of your post"
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Content */}
            <div className="mb-6">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                    Content
                </label>
                <textarea
                    placeholder="Summarize the things that you learn"
                    className="w-full h-40 sm:h-60 p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="text-right text-sm text-gray-500 mt-1">
                    Word count: {content.length}
                </div>
            </div>

            {/* Media Upload */}
            <div className="flex flex-col items-center mb-6">
                {postPicturePreview ? (
                    <img
                        src={postPicturePreview}
                        alt="Post Preview"
                        className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-md mb-4"
                    />
                ) : (
                    <label
                        htmlFor="avatar"
                        className="cursor-pointer text-blue-600 underline text-sm sm:text-lg mb-4"
                    >
                        Add a Picture
                    </label>
                )}
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold bg-black text-white hover:bg-gray-950 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default NewPost;
