import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PostForm from './PostForm.jsx'

afterEach(() => {
    cleanup()
})

describe('Post Form Component', () => {
    test('Post form renders', () => {
        render(
            <MemoryRouter initialEntries={['/new-post/1']}>
                <Routes>
                <Route path="/new-post/:id" element={<PostForm />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Create New Post/i)).toBeInTheDocument();
    });

    test('user should be able to input post title', async () => {
        render(
            <MemoryRouter initialEntries={['/new-post/1']}>
                <Routes>
                <Route path="/new-post/:id" element={<PostForm />} />
                </Routes>
            </MemoryRouter>
        )
        const titleInput = screen.getByPlaceholderText('Title...')
        await userEvent.type(titleInput, 'This is a title')
        expect(titleInput).toHaveValue('This is a title')
    });
});