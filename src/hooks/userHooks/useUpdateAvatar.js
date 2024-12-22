import { useState } from "react";
import { apiUrl } from "../../config";

function useUpdateAvatar() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateAvatar = async (avatar) => {
        if (!avatar) {
            setError("No file selected");
            console.error("No file selected");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("avatar", avatar);

        try {
            const response = await fetch(`${apiUrl}/user/avatar`, {
                method: "PATCH",
                body: formData,
                credentials:"include"
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

    return { data, error, loading, updateAvatar };
}

export default useUpdateAvatar;
