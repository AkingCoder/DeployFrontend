import { useState } from "react";
import { apiUrl } from "../../config";
import { login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function useLogin() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = async (username, password) => {

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
                dispatch(authLogin(jsonData))
                setError(null); // Clear any previous errors
            } else {
                const errorText =  response.statusText;
                setError(errorText);
            }
        } catch (fetchError) {
            setError(fetchError.message);
            console.error("Fetch Error:", fetchError);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, login };
}

export default useLogin;
