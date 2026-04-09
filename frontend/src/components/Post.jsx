import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Post.css'

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
            <h1>{post.title}</h1>
            <p className="post-desc">{post.description}</p>
            <span>{new Date(post.created_at).toDateString()}</span>

            <Link to={`/users/${post.user_id}`} className="post-author-section">
                <span id="post-user-icon">{post.author?.charAt(0)}</span>
                <p>{post.author}</p>
            </Link>

            <p>{post.text}</p>
        </div>
    )
}

export default Post;