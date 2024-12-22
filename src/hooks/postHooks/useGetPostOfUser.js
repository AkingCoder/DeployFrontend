import { useState } from "react";
import { apiUrl } from "../../config"

function useGetPostOfUser() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPostOfUser = async (userId) => {

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/post/user/${userId}`, {
                method: "GET",
            });
            // console.log(response);
            if (response.ok) {
                const jsonData = await response.json();
                // console.log(jsonData);
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

    return { data, error, loading, getPostOfUser };
}

export default useGetPostOfUser;
