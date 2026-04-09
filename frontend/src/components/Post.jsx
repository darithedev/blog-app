import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL;

const Post = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    const getPost = async () => {
        const url = `${API_URL}/posts/${id}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            const result = await response.json();
            setPost(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div className="post-container">
            <h2>{post.title}</h2>
            <span>{post.description}</span>
            <div>
                <span>{post.author}</span>
                <span>{post.created_at}</span>
            </div>
            <p>{post.text}</p>
        </div>
    )
}

export default Post;