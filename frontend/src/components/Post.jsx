import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Post.css'

const API_URL = import.meta.env.VITE_API_URL;

const Post = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

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

    const textAudio = async () => {
        const url = `${API_URL}/text-to-speech`;
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ text: post.text })
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const speechAudio = new Audio(URL.createObjectURL(await response.blob()));
            speechAudio.play();
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            alert("Could not convert text to speech. Please try again.");
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div className="post-container">
            <h1>{post.title}</h1>
            <p className="post-desc">{post.description}</p>
            <span>{new Date(post.created_at).toDateString()}</span>

            <Link 
                to={`/users/${post.user_id}`} 
                className="post-author-section"
                onClick={(e) => {
                    e.preventDefault()
                    alert("This feature is coming soon.")
                }}
            >
                <span id="post-user-icon">{post.author?.charAt(0)}</span>
                <p>{post.author}</p>
            </Link>

            <button onClick={textAudio} >
                {loading ? "Loading..." : "▷ Play Audio"}
            </button>

            <p>{post.text}</p>
        </div>
    )
}

export default Post;