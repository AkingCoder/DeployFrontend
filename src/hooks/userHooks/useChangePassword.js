import { useState } from "react";
import { apiUrl } from "../../config";

function useChangePassword() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const changePassword = async (oldPassword,newPassword) => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/user/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ oldPassword, newPassword}),
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

    return { data, error, loading, changePassword };
}

export default useChangePassword;
