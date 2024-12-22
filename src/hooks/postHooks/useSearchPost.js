import { useState } from "react";
import { apiUrl } from "../../config"

function useSearchPost() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchPost = async (query, page = 1, limit = 4) => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/post/search?query=${query}&page=${page}&limit=${limit}`, {
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

    return { data, error, loading, searchPost };
}

export default useSearchPost;
