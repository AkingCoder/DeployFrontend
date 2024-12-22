import { useState } from "react";
import { apiUrl } from "../../config"

function useGetPostComments() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPostComments = async (postId) => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/comment/${postId}`, {
                method: "GET",
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
                setError(null); // Clear any previous errors
            } else {
                const errorText = await response.text();
                setError(errorText);
                console.error("Error:", errorText);
            }
        } catch (fetchError) {
            setError(fetchError.message);
            console.error("Fetch Error:", fetchError);
        } finally {
            setLoading(false);
        }

    };

    return { data, error, loading, getPostComments };
}

export default useGetPostComments;
