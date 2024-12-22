import { useState } from "react";
import { apiUrl } from "../../config";

function useUpdateAcc() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateAcc = async (email, username) => {
        console.log(username, email)

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/user/update-account`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username }),
                credentials: "include"
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

    return { data, error, loading, updateAcc };
}

export default useUpdateAcc;
