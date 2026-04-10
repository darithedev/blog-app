import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import PostsList from './components/PostsList.jsx'
import Post from './components/Post.jsx'
import PostForm from './components/PostForm.jsx'
import Me from './components/Me.jsx'

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, isLoggedIn] = useState(false);

  return (
    <>
      <NavBar user={user} loggedIn={loggedIn} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Me setUser={setUser} isLoggedIn={isLoggedIn}/>} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/new-post/:id" element={<PostForm />} />
      </Routes>
    </>
  )
}

export default App
