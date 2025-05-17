import { render, screen } from '@testing-library/react'
import UfoElement from './ufo_element'

describe('UfoElement', () => {
  it('renders without crashing', () => {
    render(<UfoElement label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders all UFO parts', () => {
    const { container } = render(<UfoElement label="Test Label" />)

    // Check for all spans that make up the UFO
    const spans = container.getElementsByTagName('span')
    expect(spans).toHaveLength(4) // Should have 4 spans: body, dome, glow, and label

    // Check for specific classes that identify each UFO part
    expect(spans[0]).toHaveClass('bg-gradient-to-r') // Saucer body
    expect(spans[1]).toHaveClass('bg-gradient-to-b') // Cockpit dome
    expect(spans[2]).toHaveClass('blur-sm') // Glow effect
    expect(spans[3]).toHaveClass('opacity-0') // Label
  })
})
