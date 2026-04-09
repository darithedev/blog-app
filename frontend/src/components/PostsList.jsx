import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

const PostsList = () => {
    const [postList, setPostList] = useState([]);

    const getPosts = async () => {
        const url = `${API_URL}/posts`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            const result = await response.json();
            setPostList(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="posts-container">
        
        </div>
    )
}

export default PostsList;