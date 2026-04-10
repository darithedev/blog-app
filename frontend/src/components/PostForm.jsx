import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const API_URL = import.meta.env.VITE_API_URL;

const PostForm = () => {
    const { id } = useParams();
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