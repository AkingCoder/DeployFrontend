import { useState } from "react";
import { apiUrl } from "../../config";

function useGetUserById() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const getUserById = async (userId) => {

        setLoading(true);
        // console.log('getUserById', userId)
        try {
            const response = await fetch(`${apiUrl}/user/${userId}`, {
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

    return { data, error, loading, getUserById };
}

export default useGetUserById;
