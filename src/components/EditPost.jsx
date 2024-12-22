import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetPost from '../hooks/postHooks/useGetPost';
import useUpdatePost from '../hooks/postHooks/useUpdatePost';

const EditPostComponent = ({ postId }) => {
    const navigate = useNavigate();
    const { updatePost, data: updatePostData, loading: updating, error: updateError } = useUpdatePost();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [privateMode, setPrivateMode] = useState('');
    const [postPicture, setPostPicture] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const { getPost, data: findPost, loading, error } = useGetPost();


    useEffect(() => {
        getPost(postId);
    }, [postId]);

    useEffect(() => {
        if (findPost) {
            const { title, content, private: isPrivate, image } = findPost?.data;
            setTitle(title);
            setContent(content);
            setPrivateMode(isPrivate ? 'private' : 'published');
            setPostPicture(image);
            setPreviewImage(image);
        }
    }, [findPost])

    console.log(loading) // Only depend on postId and getPost

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostPicture(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result); // Display image preview
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updatePost(postId, title, content, postPicture, privateMode === 'private');
        } catch (err) {
            console.error('Failed to update the post:', err);
        }
    };
    // console.log(title)
    console.log(updatePostData)
    // console.log(content)
    // console.log(postPicture)

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500 text-3xl text-center overflow-hidden">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-xl shadow-black rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="6"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={privateMode}
                        onChange={(e) => setPrivateMode(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    >
                        <option value="private">Private</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Post Image
                    </label>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Post"
                            className="mt-2 w-full max-h-64 object-cover rounded-md"
                        />
                    )}
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 block w-full"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updating}
                        className={`px-4 py-2 bg-black rounded-lg ${updating ? 'bg-gray-400 text-black cursor-not-allowed' : 'bg-black-600 text-white  hover:bg-gray-950'
                            }`}
                    >
                        {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                {updateError && (
                    <div className="text-red-500 mt-4">{updateError}</div>
                )}
            </form>
        </div>
    );
};

// Mocked image upload function


export default EditPostComponent;
