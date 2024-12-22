import { useState } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
function useSignup() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const signup = async (email, username, password, avatar) => {
        if (!avatar) {
            setError("No file selected");
            console.error("No file selected");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("avatar", avatar);
        try {
            const response = await fetch(`${apiUrl}/user/register`, {
                method: "POST",
                body: formData,
                credentials: "include" // Include the user's authentication token in the request
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
                dispatch(authLogin(jsonData));
                setError(null); // Clear any previous errors
            } else {
                const errorText = response.statusText;
                if(response.status === 409){
                    setError("User already exists");
                }else{
                    setError(errorText);
                }
                console.error("Error:", errorText);
            }
        } catch (fetchError) {
            setError(fetchError.message);
            console.error("Fetch Error:", fetchError);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, signup };
}

export default useSignup;
