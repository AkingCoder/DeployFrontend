import { useState } from "react";
import { apiUrl } from "../../config"

function useUpdatePost() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updatePost = async (postId, title, content, postPicture, privateMode) => {

        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("private", privateMode);
        formData.append("image", postPicture);

        console.log(postId)
        console.log(title)
        // console.log(updatePostData)
        console.log(privateMode)
        console.log(content)
        console.log(postPicture)

        try {
            const response = await fetch(`${apiUrl}/post/${postId}`, {
                method: "PATCH",
                body: formData,
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

    return { data, error, loading, updatePost };
}

export default useUpdatePost;
