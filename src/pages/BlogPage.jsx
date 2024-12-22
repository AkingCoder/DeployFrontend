import React, { useEffect, useState } from 'react';
import BlogPageComponent from '../components/BlogPageComponent';
import { useParams } from 'react-router-dom';
import useGetPost from '../hooks/postHooks/useGetPost';
import useGetUserById from '../hooks/userHooks/useGetUserById';

const BlogPage = () => {
    const { postId } = useParams();
    const { getPost, data, loading, error } = useGetPost(postId);
    const { getUserById, data: userData, loading: userLoading } = useGetUserById();

    const [postDetail, setPostDetail] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    // Fetch post when the component mounts or postId changes
    useEffect(() => {
        const fetchPost = async () => {
            await getPost(postId); // Fetch post data
        };
        fetchPost();
    }, [postId]);

    // Fetch user details when post data is available
    useEffect(() => {
        const fetchUser = async () => {
            if (data?.data?.author) {
                await getUserById(data.data.author); // Fetch author details
            }
        };
        if (data) {
            // console.log("Post Data Fetched:", data);
            setPostDetail(data.data);
            fetchUser();
        }
    }, [data]);

    // Update `userDetail` when `userData` changes
    useEffect(() => {
        if (userData?.data) {
            // console.log("User Data Fetched:", userData);
            setUserDetail(userData.data);
        }
    }, [userData]);

    // Debugging logs
    // console.log("Post Detail:", postDetail);
    // console.log("User Detail:", userDetail);

    // Fallback for loading or error states
    if (loading || userLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Render component only when `postDetail` and `userDetail` are available
    return (
        <div>
            {postDetail && userDetail ? (
                <BlogPageComponent user={userDetail} post={postDetail} />
            ) : (
                <div>No data available for this post</div>
            )}
        </div>
    );
};

export default BlogPage;
