import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi } from 'vitest'
import NavBar from './NavBar.jsx'

afterEach(() => {
    cleanup()
})

describe('NavBar Component', () => {
    test('NavBar component renders', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                <Route path="/" element={
                    <NavBar 
                        user={null}
                        postList={[]}
                        setFiltered={vi.fn()}
                        loggedIn={false}
                        isLoggedIn={vi.fn()}
                    />
                } />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Review/i)).toBeInTheDocument();
    });
});