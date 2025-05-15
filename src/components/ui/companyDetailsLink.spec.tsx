import { render, screen, act } from '@testing-library/react'
import CompanyDetailsLink from './companyDetailsLink'
import SymbolMapperService from '~data/services/symbol-mapper-service'
import { useApolloClient } from '@apollo/client'
import '@testing-library/jest-dom'

// Mock Apollo hooks
jest.mock('@apollo/client', () => ({
  useApolloClient: jest.fn(),
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  const MockLink = ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

// Mock SymbolMapperService
const mockGetSymbolByInstrumentId = jest.fn()
const mockGetExchangeBySymbol = jest.fn()

jest.mock('~data/services/symbol-mapper-service', () => ({
  getInstance: jest.fn().mockImplementation(() => ({
    getSymbolByInstrumentId: mockGetSymbolByInstrumentId,
    getExchangeBySymbol: mockGetExchangeBySymbol,
  })),
}))

describe('CompanyDetailsLink', () => {
  beforeEach(() => {
    // Mock Apollo client
    const mockApolloClient = { cache: {} }
    ;(useApolloClient as jest.Mock).mockReturnValue(mockApolloClient)

    // Reset mocks
    mockGetSymbolByInstrumentId.mockReset()
    mockGetExchangeBySymbol.mockReset()

    // Mock implementations
    mockGetSymbolByInstrumentId.mockImplementation((id: number) => {
      return Promise.resolve(id === 202674 ? 'MAR' : null)
    })

    mockGetExchangeBySymbol.mockImplementation((symbol: string) => {
      return Promise.resolve(symbol === 'MAR' ? 'NASDAQ' : null)
    })
  })

  it('should show loading state initially', () => {
    render(<CompanyDetailsLink instrumentId={202674} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render link with symbol when data is loaded', async () => {
    // Setup
    render(<CompanyDetailsLink instrumentId={202674} />)

    // Wait for the component to update after async operations complete
    await act(async () => {
      await Promise.resolve() // Wait for all promises to resolve
    })

    // Check the link renders correctly
    const linkText = screen.getByText('MAR')
    expect(linkText).toBeInTheDocument()

    // Find the anchor element containing the text
    const linkElement = linkText.closest('a')
    expect(linkElement).toHaveAttribute('href', '/company/NASDAQ/MAR')
  })

  it('should render link with custom children when provided', async () => {
    // Setup
    render(<CompanyDetailsLink instrumentId={202674}>Marriott</CompanyDetailsLink>)

    // Wait for the component to update after async operations complete
    await act(async () => {
      await Promise.resolve() // Wait for all promises to resolve
    })

    // Check the custom text is rendered
    const linkText = screen.getByText('Marriott')
    expect(linkText).toBeInTheDocument()

    // Find the anchor element containing the custom text
    const linkElement = linkText.closest('a')
    expect(linkElement).toHaveAttribute('href', '/company/NASDAQ/MAR')
  })

  it('should show error state when symbol cannot be found', async () => {
    // Setup - this will result in null symbol
    render(<CompanyDetailsLink instrumentId={999999} />)

    // Wait for the component to update after async operations complete
    await act(async () => {
      await Promise.resolve() // Wait for all promises to resolve
    })

    // Check error state is shown
    expect(screen.getByText('Unknown company')).toBeInTheDocument()
  })
})
