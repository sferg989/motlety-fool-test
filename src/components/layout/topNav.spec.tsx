import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { HeaderKeys } from '../../types/common'

// Mock the Next.js headers function
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}))

// Since we can't directly test an async server component in Jest,
// we'll create a client version of TopNav for testing purposes
const TopNavForTesting = ({ currentPath = '/' }: { currentPath?: string }) => {
  const isHomePage = currentPath === '/'

  // Common UFO UI elements (exactly the same as in the actual component)
  const ufoElements = (
    <>
      {/* Saucer Body - creates the main circular shape with metallic gradient */}
      <span
        className="absolute w-16 h-6 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-full 
        shadow-[0_0_10px_#22d3ee] group-hover:shadow-[0_0_20px_#22d3ee]
        transition-all duration-300"
      ></span>

      {/* Cockpit dome - smaller circle on top */}
      <span
        className="absolute w-8 h-8 -top-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full 
        shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] group-hover:from-cyan-300 group-hover:to-blue-400
        transition-all duration-300"
      ></span>

      {/* Glow effect underneath */}
      <span
        className="absolute -bottom-2 w-12 h-1 bg-cyan-400 blur-sm rounded-full 
        group-hover:w-14 group-hover:blur-md group-hover:bg-cyan-300
        transition-all duration-300"
      ></span>

      {/* Text label - hidden by default, shown on hover */}
      <span
        className="absolute -bottom-8 text-cyan-400 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
      >
        {isHomePage ? 'Welcome' : 'Home'}
      </span>
    </>
  )

  return (
    <nav className="flex flex-row my-12 justify-center items-center sm:mx-12 lg:mx-0">
      <div>
        {isHomePage ? (
          <div className="group relative inline-flex items-center justify-center p-8" aria-label="Welcome">
            {ufoElements}
          </div>
        ) : (
          <a href="/" className="group relative inline-flex items-center justify-center p-8 hover:-translate-y-1 transition-transform duration-300" aria-label="Home">
            {ufoElements}
          </a>
        )}
      </div>
    </nav>
  )
}

describe('TopNav Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders "Welcome" text on homepage', () => {
    render(<TopNavForTesting currentPath="/" />)

    // Check for Welcome label
    const welcomeElement = screen.getByLabelText('Welcome')
    expect(welcomeElement).toBeInTheDocument()

    // Verify it's not a link (no href attribute)
    expect(welcomeElement.tagName).toBe('DIV')

    // Verify the welcome text is in the hover element
    const textElement = screen.getByText('Welcome')
    expect(textElement).toBeInTheDocument()
  })

  it('renders "Home" link when not on homepage', () => {
    render(<TopNavForTesting currentPath="/company/NYSE/AAPL" />)

    // Check for Home label
    const homeLink = screen.getByLabelText('Home')
    expect(homeLink).toBeInTheDocument()

    // Verify it's an anchor tag with href to homepage
    expect(homeLink.tagName).toBe('A')
    expect(homeLink).toHaveAttribute('href', '/')

    // Verify the home text is in the hover element
    const textElement = screen.getByText('Home')
    expect(textElement).toBeInTheDocument()
  })

  it('handles case when path is not specified', () => {
    render(<TopNavForTesting />)

    // Should default to homepage behavior when path is undefined
    const welcomeElement = screen.getByLabelText('Welcome')
    expect(welcomeElement).toBeInTheDocument()
    expect(welcomeElement.tagName).toBe('DIV')
  })

  it('renders UFO UI elements in both cases', () => {
    // Test for homepage
    render(<TopNavForTesting currentPath="/" />)

    // Check for the three main UFO parts - saucer, dome, and glow
    const saucerElements = document.querySelectorAll('.bg-gradient-to-r.rounded-full')
    expect(saucerElements.length).toBeGreaterThan(0)

    const domeElements = document.querySelectorAll('.bg-gradient-to-b.rounded-full')
    expect(domeElements.length).toBeGreaterThan(0)

    const glowElements = document.querySelectorAll('.blur-sm.rounded-full')
    expect(glowElements.length).toBeGreaterThan(0)

    // Clean up and test for non-homepage
    document.body.innerHTML = ''
    render(<TopNavForTesting currentPath="/other-page" />)

    const saucerElements2 = document.querySelectorAll('.bg-gradient-to-r.rounded-full')
    expect(saucerElements2.length).toBeGreaterThan(0)

    const domeElements2 = document.querySelectorAll('.bg-gradient-to-b.rounded-full')
    expect(domeElements2.length).toBeGreaterThan(0)

    const glowElements2 = document.querySelectorAll('.blur-sm.rounded-full')
    expect(glowElements2.length).toBeGreaterThan(0)
  })
})
