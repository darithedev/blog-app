import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PostsList from './components/PostsList.jsx'
import Post from './components/Post.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/posts/:id" element={<Post />} />
    </Routes>
  )
}

export default App
