import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import PostsList from './components/PostsList.jsx'
import Post from './components/Post.jsx'
import PostForm from './components/PostForm.jsx'

function App() {

  return (
    <>
      <NavBar loggedUser={loggedUser} />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/new-post/:id" element={<PostForm />} />
      </Routes>
    </>
  )
}

export default App
