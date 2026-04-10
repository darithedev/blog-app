import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ user, postList, setFiltered, loggedIn, isLoggedIn }) => {
    const [search, setSearch] = useState("");
    const content = ["Music", "Movies", "Books", "Food"];
    const fontColor = ["red", "blue", "blueviolet", "orange"];
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIndex((prev) => (prev + 1) % content.length);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [index]);

    useEffect(() => {
        if(!search) {
            setFiltered(postList);
            return;
        }
        
        const filtered = postList.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase()) ||
            post.author.toLowerCase().includes(search.toLowerCase())
        );

        setFiltered(filtered);
    }, [search, postList]);

    return (
        <div className="navbar-container">
            
        </div>
    )
}

export default NavBar;