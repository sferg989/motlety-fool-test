import React from 'react'
import { render } from '@testing-library/react'
import LoadingSpinner from './loading_spinner'

describe('LoadingSpinner', () => {
  describe('Spinner variant (default)', () => {
    it('renders with default props', () => {
      const { container } = render(<LoadingSpinner />)
      const svg = container.querySelector('svg')

      expect(svg).toHaveClass('animate-spin')
      expect(svg).toHaveClass('h-8') // medium size
      expect(svg).toHaveClass('w-8')
      expect(svg).toHaveClass('text-cyan-500')
    })

    it('renders with custom className', () => {
      const customClass = 'custom-class'
      const { container } = render(<LoadingSpinner className={customClass} />)
      const svg = container.querySelector('svg')

      expect(svg).toHaveClass('custom-class')
    })

    it('maintains SVG structure', () => {
      const { container } = render(<LoadingSpinner />)
      const svg = container.querySelector('svg')

      expect(svg?.querySelector('circle')).toBeInTheDocument()
      expect(svg?.querySelector('path')).toBeInTheDocument()
    })

    it('applies different sizes correctly', () => {
      const { container: smallContainer } = render(<LoadingSpinner size="small" />)
      const { container: largeContainer } = render(<LoadingSpinner size="large" />)

      expect(smallContainer.querySelector('svg')).toHaveClass('h-4', 'w-4')
      expect(largeContainer.querySelector('svg')).toHaveClass('h-12', 'w-12')
    })
  })

  describe('Circle variant', () => {
    it('renders circle variant with default props', () => {
      const { container } = render(<LoadingSpinner variant="circle" />)
      const spinner = container.querySelector('div.animate-spin')

      expect(spinner).toHaveClass('animate-spin')
      expect(spinner).toHaveClass('border-2')
      expect(spinner).toHaveClass('border-t-transparent')
      expect(spinner).toHaveClass('rounded-full')
      expect(spinner?.parentElement).toHaveClass('flex', 'justify-center', 'items-center')
    })

    it('applies different sizes correctly for circle variant', () => {
      const { container: smallContainer } = render(<LoadingSpinner variant="circle" size="small" />)
      const { container: largeContainer } = render(<LoadingSpinner variant="circle" size="large" />)

      const smallSpinner = smallContainer.querySelector('div.animate-spin')
      const largeSpinner = largeContainer.querySelector('div.animate-spin')

      expect(smallSpinner).toHaveClass('h-4', 'w-4', 'border-2')
      expect(largeSpinner).toHaveClass('h-12', 'w-12', 'border-4')
    })

    it('applies custom color to circle variant', () => {
      const { container } = render(<LoadingSpinner variant="circle" color="text-blue-500" />)
      const spinner = container.querySelector('div.animate-spin')

      expect(spinner).toHaveClass('text-blue-500')
    })
  })
})
