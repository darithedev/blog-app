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
                <div className="post-card" key={post.id}>
                    <li>{post.author}</li>
                    
                    <Link to={`/posts/${post.id}`}>
                        <h3>{post.title}</h3>
                    </Link>

                    <li>{post.description}</li>
                </div>
            ))}
        </ul>
    )
}

export default PostsList;