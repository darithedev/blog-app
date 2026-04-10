import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const API_URL = import.meta.env.VITE_API_URL;

const PostForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        postContactForm(contact);
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