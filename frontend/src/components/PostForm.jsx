import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        user_id: id,
        title: "",
        description: "",
        text: "",
        tags: []
    });

    const handleTitle = (event) => {
        const title = event.target.value;
        setPost((t) => ({ ...t, title }));
    };

    const handleDescription = (event) => {
        const description = event.target.value;
        setPost((desc) => ({ ...desc, description }));
    };

    const handleText = (event) => {
        const text = event.target.value;
        setPost((t) => ({ ...t, text }));
    };

    const handleTags = (event) => {
        const value = event.target.value;

        const tags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        setPost((t) => ({ ...t, tags }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Form 
            className="post-form"
            onSubmit={handleSubmit}
        >
            
        </Form>
    )

}

export default PostForm; 