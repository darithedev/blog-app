import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Me.css'

const API_URL = import.meta.env.VITE_API_URL;

const Me = ({ setUser, isLoggedIn }) => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const url = `${API_URL}/users`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                
                const result = await response.json();
                setUserList(result);
            } catch (error) {
                console.error(error.message);
            }
        }
        getUsers();
    }, []);

    return (
        <div className="me-container">
            <h3>Welcome Back</h3>
            <p>Select your email below</p>
            {userList.map((user) => (
                <div className="user-card" key={user.id}>
                    <span>{user.email}</span>
                    <button onClick={() => { setUser(user), isLoggedIn(true), navigate("/posts") }}>
                        Select
                    </button>
                </div>
            ))}
            <p id="create-account">Don't see your email? <a href="#" onClick={(() => alert("Feature coming soon."))}>Create An Account</a></p>
        </div>
    )
}

export default Me;