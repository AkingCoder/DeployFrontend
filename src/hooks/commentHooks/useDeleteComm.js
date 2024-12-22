import { useState } from "react";
import { apiUrl } from "../../config"

function useDeleteComm() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteComm = async (commentId) => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/comment/c/${commentId}`, {
                method: "DELETE",
                credentials: 'include' // Include the user's authentication token in the request

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

    return { data, error, loading, deleteComm };
}

export default useDeleteComm;
