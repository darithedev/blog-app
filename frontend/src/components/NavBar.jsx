import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ user, postList, setFiltered, loggedIn, isLoggedIn }) => {
    const [search, setSearch] = useState("");
    const content = ["Music", "Movies", "Books", "Food"];
    const fontColor = ["red", "blue", "blueviolet", "orange"];
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            
        </div>
    )
}

export default NavBar;