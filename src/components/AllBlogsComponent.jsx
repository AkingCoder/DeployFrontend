import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllPosts from "../hooks/postHooks/useGetAllPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchComponent from './SearchComponent';

const AllBlogsComponent = () => {
  const navigate = useNavigate();
  const postCollection = useSelector((state) => state.post.posts);
  const searchedPosts = useSelector((state) => state.post.searchPosts?.data?.posts);
  const [posts, setPosts] = useState([]); // Local state to store posts
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(4); // Number of posts per page
  const [hasMore, setHasMore] = useState(true); // To track if more posts exist
  const { getAllPosts, data } = useGetAllPosts(); // API hook

  const totalPosts = data?.data?.totalPosts || 0;

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

  // Prioritize displaying searchedPosts when available
  const displayedPosts = searchedPosts?.length > 0 ? searchedPosts : posts;

  return (
    <div className="min-h-screen bg-[#f9f5f0] py-10">
      <div className="md:hidden m-4">
        <SearchComponent/>
      </div>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Scroll to see blogs
      </h1>
      <div className="max-w-7xl mx-auto px-4">
        <InfiniteScroll
          dataLength={displayedPosts.length} // Length of the currently displayed posts
          next={fetchMoreData} // Function to fetch more data
          hasMore={hasMore} // Whether there are more posts to load
          loader={<h4 className="text-center">Loading...</h4>} // Loader component
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {displayedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/blog/${post._id}`)}
            >
              {/* Blog Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src={post.image || "https://via.placeholder.com/300"}
                  alt={post.title || "Untitled Post"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-lg font-bold leading-tight line-clamp-2">
                    {post.title || "Untitled Post"}
                  </h2>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.content || "No content available."}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <img
                    className="w-8 h-8 rounded-full object-cover mr-3"
                    src={post.author?.avatar || "https://via.placeholder.com/50"}
                    alt={post.author?.username || "Anonymous"}
                  />
                  <div>
                    <p className="font-medium">{post.author?.username || "Anonymous"}</p>
                    <p className="text-xs">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown Date"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {!hasMore && (
          <p className="text-center text-gray-500 mt-6">No more blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogsComponent;
