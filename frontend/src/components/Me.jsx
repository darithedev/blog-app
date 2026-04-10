import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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
            {userList.map((user) => (
                <div className="user-card" key={user.id}>
                    <span>{user.first_name}</span>
                    <button onClick={() => { setUser(user), isLoggedIn(true), navigate("/posts") }}>
                        Select
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Me;