import { render, screen } from '@testing-library/react'
import SanitizedHtml from './sanitized_html'

describe('SanitizedHtml', () => {
  it('renders HTML content safely', () => {
    render(<SanitizedHtml html="<p>Hello, world!</p>" />)
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
  })

  it('applies className correctly', () => {
    const { container } = render(<SanitizedHtml html="<p>Test</p>" className="test-class" />)
    expect(container.firstChild).toHaveClass('test-class')
  })

  it('sanitizes malicious script tags', () => {
    const maliciousHtml = '<p>Safe text</p><script>alert("XSS attack!")</script>'
    const { container } = render(<SanitizedHtml html={maliciousHtml} />)

    // Script tag should be removed
    expect(container.innerHTML).toContain('<p>Safe text</p>')
    expect(container.innerHTML).not.toContain('<script>')
    expect(container.innerHTML).not.toContain('XSS attack')
  })

  it('sanitizes malicious attributes', () => {
    const maliciousHtml = '<a href="javascript:alert(\'XSS\')" onclick="evil()">Click me</a>'
    render(<SanitizedHtml html={maliciousHtml} />)

    // The text should be preserved but the malicious attributes should be sanitized
    expect(screen.getByText('Click me')).toBeInTheDocument()

    // Get the sanitized HTML and verify no malicious attributes
    const { container } = render(<SanitizedHtml html={maliciousHtml} />)
    expect(container.innerHTML).not.toContain('javascript:')
    expect(container.innerHTML).not.toContain('onclick')
  })
})
