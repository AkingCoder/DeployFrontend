import React from 'react';
import CommentPage from './Commments';

const BlogPageComponent = ({ user,post }) => {
    const { title, image, content, author, createdAt,_id } = post;
    const {avatar,username} = user
    return (
        <div className="bg-gray-100 min-h-screen md:p-6 px-1 flex justify-center items-center">
            <div className="md:mx-10 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
                {/* Featured Image */}
                <img 
                    src={image || "https://via.placeholder.com/800x400"} 
                    alt={title} 
                    className="place-self-center min-w-96 object-contain"
                />

                {/* Blog Content */}
                <div className="p-6">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

                    {/* Author Information */}
                    <div className="flex items-center mb-6">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt={username || "Author"}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm text-gray-500">NA</span>
                            </div>
                        )}
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-700">{username || "Anonymous"}</p>
                            <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-gray-700 m-3 leading-relaxed text-lg">
                        {content}
                    </div>
                </div>

                {/* Comment Section */}
                <CommentPage postId={_id} />
            </div>
        </div>
    );
};

export default BlogPageComponent;
