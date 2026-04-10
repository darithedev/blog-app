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

    const postForm = async () => {
        const url = `${API_URL}/posts`; 
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "COntent-Type": "application/json"
                },
                body: JSON.stringify(post)
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            alert("Post was created.");
            navigate("/");
        } catch (error) {
            console.error(error.message);
            alert("Post was not created. Please try again.");
        }
    };

    const clearForm = () => {
        setPost({ 
            user_id: id,
            title: "",
            description: "",
            text: "",
            tags: []
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postForm();
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