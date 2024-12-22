import { useState, useEffect } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { loadPosts } from "../../store/postSlice";

function useGetAllPosts() {
    let index = 1
    const [data, setData] = useState(null); // Local state to store API response
    const [error, setError] = useState(null); // Local state to handle errors
    const [loading, setLoading] = useState(false); // Loading state for API call
    const dispatch = useDispatch(); // Redux dispatch function

    const getAllPosts = async (page, limit) => {
        setLoading(true); // Set loading to true before the API call
        try {
            const response = await fetch(`${apiUrl}/post?page=${page}&limit=${limit}`, {
                method: "GET",
            });

            if (response.ok) {
                const jsonData = await response.json();

                // Update local data state
                setData(jsonData);
                console.log(index++);
                // Append fetched posts to Redux store
                dispatch(loadPosts(jsonData.data.posts)); // No need for `prev` here

                // Clear any previous errors
                setError(null);
            } else {
                const errorText = await response.text();
                setError(errorText);
                console.error("Error:", errorText);
            }
        } catch (fetchError) {
            setError(fetchError.message);
            console.error("Fetch Error:", fetchError);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return { data, error, loading, getAllPosts }; // Expose state and function
}

export default useGetAllPosts;
