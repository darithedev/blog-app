import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Post from './Post.jsx'

afterEach(() => {
    cleanup()
})

describe('Post Component', () => {
    test('Post component renders', () => {
        render(
            <MemoryRouter initialEntries={['/posts/:id']}>
                <Routes>
                <Route path="/posts/:id" element={<Post />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByRole('button', { name: /play audio/i })).toBeInTheDocument();
    });
});