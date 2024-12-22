import { useState } from "react";
import { apiUrl } from "../../config";
import { login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function useGetUser() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const getUser = async () => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/user/current-user`, {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
                dispatch(authLogin(jsonData)); // Update auth state with fetched user data
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

    return { data, error, loading, getUser };
}

export default useGetUser;
