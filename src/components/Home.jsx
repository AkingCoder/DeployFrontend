import React, { useState, useEffect } from "react";
import Home_bg from "./Home_bg";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import useGetAllPosts from "../hooks/postHooks/useGetAllPosts";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
    const postCollection = useSelector((state) => state.post.posts);
    const [posts, setPosts] = useState([]); // Local state to store posts
    const [page, setPage] = useState(1); // Current page
    const [limit] = useState(4); // Number of posts per page
    const [hasMore, setHasMore] = useState(true); // To track if more posts exist
    const { getAllPosts, data, loading } = useGetAllPosts(); // API hook



    const totalPosts = data?.data?.totalPosts;

    // Fetch posts when `page` changes
    useEffect(() => {
        getAllPosts(page, limit);
    }, [page]);

    // Append new posts to the local state and check if more posts are available
    useEffect(() => {
        if (data?.data) {
            const newPosts = data.data.posts;
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);

            if (posts.length + newPosts.length >= totalPosts) {
                setHasMore(false); // No more posts to load
            }
        }
    }, [page]);



    // Load more data when the user scrolls
    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    console.log(posts);

    return (
        <div>
            <Home_bg />
            <div className="text-black text-2xl sm:text-3xl font-bold w-full text-center my-4 sm:my-5">
                Discover Blogs
            </div>
            <div className="bg-gray-200">
                <InfiniteScroll
                    dataLength={posts.length} // Length of the currently displayed posts
                    next={fetchMoreData} // Function to fetch more data
                    hasMore={hasMore} // Whether there are more posts to load
                    loader={<h4>Loading...</h4>} // Loader component
                    className="grid grid-cols-1 sm:grid-cols-2 md:place-items-stretch place-items-center md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 sm:p-6 w-full"
                >
                    {posts.map((post, index) => (
                        <div key={`${post._id}-${index}`}> {/* Composite key for uniqueness */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
            {loading && <p className="text-center text-gray-500 ">Loading more posts...</p>}
            {!hasMore && (
                <p className="text-center text-gray-500">No more posts available.</p>
            )}
        </div>
    );
};

export default HomePage;
