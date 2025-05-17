import React from 'react'
import { render } from '@testing-library/react'
import LoadingSpinner from './loading_spinner'

describe('LoadingSpinner', () => {
  it('renders with default className', () => {
    const { container } = render(<LoadingSpinner />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('animate-spin')
    expect(svg).toHaveClass('h-4')
    expect(svg).toHaveClass('w-4')
    expect(svg).toHaveClass('text-cyan-500')
  })

  it('renders with custom className', () => {
    const customClass = 'h-8 w-8 text-red-500'
    const { container } = render(<LoadingSpinner className={customClass} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('animate-spin')
    expect(svg).toHaveClass('h-8')
    expect(svg).toHaveClass('w-8')
    expect(svg).toHaveClass('text-red-500')
  })

  it('maintains SVG structure', () => {
    const { container } = render(<LoadingSpinner />)
    const svg = container.querySelector('svg')

    expect(svg?.querySelector('circle')).toBeInTheDocument()
    expect(svg?.querySelector('path')).toBeInTheDocument()
  })
})
