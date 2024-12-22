import { useState } from "react";
import { logout as authLogout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../config";

function useLogout() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/user/logout`, {
                method: "POST",
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
                dispatch(authLogout()); // Dispatch the logout action from the auth slice
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

    return { data, error, loading, logout };
}

export default useLogout;
