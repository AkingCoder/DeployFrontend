import React, { useEffect, useState } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import ConfirmationBox from './ConfirmationBox';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useDeletePost from '../hooks/postHooks/useDeletePost';
import useUpdatePost from '../hooks/postHooks/useUpdatePost';

const PostCard = ({ content, image, title, author, createdAt, _id, private: privateMode }) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [privateToggle, setPrivateToggle] = useState(privateMode);
    const [toggleUD, setToggleUD] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { deletePost } = useDeletePost();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.auth.userData);
    const { updatePost } = useUpdatePost();

    const dropdown = () => {
        setToggleDropdown(!toggleDropdown);
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deletePost(_id);
            setShowDeleteModal(false);
            alert('Post deleted successfully.');
        } catch (err) {
            console.error('Failed to delete post:', err);
            alert('Failed to delete the post. Please try again.');
        }
    };

    const updatePostPrivateMode = async () => {
        await updatePost(_id, title, content, image, !privateToggle);
        setPrivateToggle(!privateToggle);
    };

    useEffect(() => {
        if (loggedInUser?.data?._id === author?._id) {
            setToggleUD(true);
        }
    }, [loggedInUser, author]);

    const handleAvatarClick = () => {
        navigate(`/dashboard/${author._id}`);
    };

    const handlePostClick = () => {
        navigate(`/blog/${_id}`);
    };

    return (
        <>
            <div className="group transition-all duration-400 text-base transform hover:scale-[1.05]  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg shadow-lg overflow-hidden  relative">
                {/* Post Image */}
                <img
                    onClick={handlePostClick}
                    className="w-full h-48 md:h-64 lg:h-72 object-cover cursor-pointer"
                    src={image || 'https://via.placeholder.com/150'}
                    alt={title || 'Post'}
                />

                {/* Dropdown Menu */}
                {toggleUD && (
                    <div className="absolute top-1 right-1 scale-0 transition-all transform group-hover:scale-110">
                        <button onClick={dropdown} className="inline-flex items-center">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                            >
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                        </button>

                        <div className={`${toggleDropdown ? '' : 'hidden'} absolute right-0  top-6 bg-white rounded-lg shadow`}>
                            <ul className="py-1 text-sm  text-black">
                                <li>
                                    <Link
                                        to={`/editPost/${_id}`}
                                        className="flex mb-1 items-center p-1 justify-center m-1 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-200"
                                        aria-label="Edit"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center p-1  mx-auto bg-red-700 text-white rounded-lg shadow-md hover:bg-red-800 transition-colors duration-200"
                                        aria-label="Delete"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                                <li className="mt-1">
                                    <div
                                        onClick={() => updatePostPrivateMode()}
                                        className={`w-7 h-7 overflow-hidden m-1 border flex items-center justify-center cursor-pointer ${privateToggle
                                            ? 'bg-gray-800 border-black'
                                            : 'bg-blue-700 border-blue-800'
                                            } rounded-full transition-colors duration-300`}
                                    >
                                        <div
                                            className={`w-5 h-5  rounded-full text-center font-semibold text-white transform transition-transform ${privateToggle ? 'bg-gray-700 text-[0px]' : 'bg-blue-500 text-[10px]'
                                                }`}
                                        >
                                            {privateToggle ? '' : 'Live'}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Post Content */}
                <div className="px-4 py-2">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 truncate">{title || 'Untitled'}</h3>
                    <p className="mt-1 text-sm md:text-base text-gray-800 truncate">{content || 'No content available.'}</p>

                    <div className="flex items-center mt-4">
                        {author?.avatar ? (
                            <img
                                onClick={handleAvatarClick}
                                className="w-10 h-10 object-cover cursor-pointer rounded-full"
                                src={author.avatar}
                                alt={author.username || 'Author'}
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm text-gray-500">NA</span>
                            </div>
                        )}
                        <div className="ml-3">
                            <p className="text-sm md:text-base font-semibold text-gray-700">{author?.username || 'Anonymous'}</p>
                            <p className="text-xs text-gray-500">{createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown date'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationBox
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default PostCard;
