import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

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
            <div className="nav-left">
                <Link to={'/posts'}>
                    <h3 id="review-text">
                        Review <span style={{ color: fontColor[index] }}>{content[index]}</span>
                    </h3>
                </Link>
                {loggedIn && (
                    <input 
                        className="search-bar" 
                        type="text" 
                        value={search}
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}
            </div>
            <div className="nav-right">
                {loggedIn && (
                    <button 
                        className="create-button"
                        onClick={() => {
                            if (!user) return;
                            navigate(`/new-post/${user.id}`)
                        }}
                    >
                        Create Post
                    </button>
                )}
                {loggedIn && user && (
                    <>
                        <Link 
                            to={`/users/${user.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                alert("This feature is coming soon.")
                            }}
                        >
                            <span id="user-icon-navbar">{user.first_name.charAt(0)}</span>
                        </Link>
                        <button 
                            className="create-button"
                            onClick={() => { 
                                navigate('/')
                                isLoggedIn(false);
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default NavBar;