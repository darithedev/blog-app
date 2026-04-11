import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Me from './Me.jsx'

afterEach(() => {
    cleanup()
})

describe('Me Component', () => {
    test('Me component renders', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                <Route path="/" element={<Me />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    });
});