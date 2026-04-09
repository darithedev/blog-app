import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PostsList from './components/PostsList.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
    </Routes>
  )
}

export default App
