import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findPosts } from "../store/postSlice";
import useSearchPost from "../hooks/postHooks/useSearchPost";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const dispatch = useDispatch(); // Redux dispatch
  const { searchPost, data, loading } = useSearchPost(); // API hook
  const navigate = useNavigate(); // React Router navigation
  const [query, setQuery] = useState(""); // Search query state

  const handleSearch = (e) => {
    e.preventDefault(); // Fixed typo

    
    if (query.trim() === "") {
      location.reload();
      return;
    }
    searchPost(query);
    
  };
  useEffect(() => {
    console.log(data)
    dispatch(findPosts(data)); // Dispatch action to update posts state in Redux store
    if (data) {
      navigate("/blogs")
    }
  }, [data])


  return (
    <div className="min-w-[61vw]">
      {/* Search Form */}
      <form className="relative w-full" onSubmit={handleSearch}>
        {/* Search Input */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for posts..."
          className="relative w-full py-3 px-4 text-white bg-black opacity-70 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="absolute inset-y-0 right-4 flex items-center text-blue-600 hover:text-blue-800 focus:text-blue-800"
        >
          {loading ? (
            <div className="absolute inset-y-0 right-[0.12rem] flex items-center">
              <div className="animate-spin  rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
            </div>
          )
            :
            <svg
              className="w-6 h-6 text-gray-500 hover:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 4.5a7.5 7.5 0 015.4 12.15l4.35 4.35z"
              />
            </svg>
          }
        </button>
      </form>

      {/* Loading State */}

    </div>
  );
};

export default SearchComponent;
