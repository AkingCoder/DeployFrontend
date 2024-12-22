import React, { useEffect, useState } from "react";
import useAddComm from "../hooks/commentHooks/useAddComm";
import useGetPostComments from "../hooks/commentHooks/useGetPostComments";
import CommentsSection from "./CommentsSection";
import { useSelector } from "react-redux";

const CommentPage = ({ postId }) => {
    const { addComm } = useAddComm();
    const { getPostComments, data } = useGetPostComments();
    const loggedInUserInfo = useSelector((state) => state.auth.userData);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    // Fetch comments for the given postId
    const fetchComments = async () => {
        await getPostComments(postId); // Fetch comments from API
    };



    useEffect(() => {
        fetchComments(); // Fetch comments on mount or when postId changes
    }, [postId]);

    useEffect(() => {
        if (data) {
            setComments(data.data);
        }
    }, [data])





    // // console.log(comments) // Update comments when new data is fetched
    // Handle submitting a new comment
    const submitComment = async () => {
        if (!content.trim()) return; // Prevent submitting empty comments
        await addComm(postId, content); // Submit the comment
        setContent(""); // Clear input field
        fetchComments(); // Refresh comments
    };

    return (
        <div className="min-h-screen text-gray-300 py-8 px-4">
            <div className="bg-gray-50 md:px-40  py-4 border-t">
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className="w-full h-24 border border-gray-700 rounded-lg p-2 text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    placeholder="Write your comment here..."
                ></textarea>
                <button onClick={() => submitComment()} className="mt-3 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-950">
                    Leave a Comment
                </button>
            </div>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-center text-gray-600 mb-6">Comments</h1>
                <div className="rounded-lg shadow-md p-6 space-y-6">
                    {comments.map((comment) => (
                        <div key={comment._id} className="">
                            <CommentsSection comment={comment} userId={comment.author} loggedInUserId={loggedInUserInfo.data._id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentPage;
