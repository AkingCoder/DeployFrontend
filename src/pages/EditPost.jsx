import React from 'react'
import EditPostComponent from '../components/EditPost.jsx'
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const { postId } = useParams();
    return (
        <EditPostComponent postId={postId} />
    )
}

export default EditPost
