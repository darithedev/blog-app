import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi } from 'vitest'
import PostsList from './PostsList.jsx'

afterEach(() => {
    cleanup()
})

describe('PostsList Component', () => {
    test('PostsList component renders', async () => {
        render(
            <MemoryRouter initialEntries={['/posts']}>
                <Routes>
                <Route path="/posts" element={<PostsList pList={vi.fn()} filtered={[]} />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByRole('list')).toBeInTheDocument()
    });
});