import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

const PostsList = () => {
    const [postList, setPostList] = useState([]);

    return (
        <div className="posts-container">
        
        </div>
    )
}

export default PostsList;