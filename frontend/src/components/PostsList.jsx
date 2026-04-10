import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './PostsList.css'

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

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <ul className="posts-container">
            {postList.map((post) => (
                <li className="post-card" key={post.id}>
                    <span id="user-icon">{post.author.charAt(0)}</span>
                    <p>{post.author}</p>
                    
                    <Link to={`/posts/${post.id}`}>
                        <h3>{post.title}</h3>
                    </Link>

                    <p className="post-description">{post.description}</p>

                    <span className="created-at-date">{new Date(post.created_at).toDateString()}</span>
                </li>
            ))}
        </ul>
    )
}

export default PostsList;