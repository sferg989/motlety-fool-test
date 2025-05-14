import { render, screen, waitFor } from '@testing-library/react'
import CompanyDetailsLink from './companyDetailsLink'
import SymbolMapperService from '~data/services/symbol-mapper-service'
import { useApolloClient } from '@apollo/client'

// Mock Apollo hooks
jest.mock('@apollo/client', () => ({
  useApolloClient: jest.fn(),
}))

// Mock SymbolMapperService
jest.mock('~data/services/symbol-mapper-service', () => ({
  getInstance: jest.fn().mockImplementation(() => ({
    getSymbolByInstrumentId: jest.fn()
      .mockImplementation((id: number) => {
        if (id === 202674) return Promise.resolve('MAR')
        return Promise.resolve(null)
      }),
  })),
}))

describe('CompanyDetailsLink', () => {
  beforeEach(() => {
    // Mock Apollo client
    const mockApolloClient = { cache: {} }
    ;(useApolloClient as jest.Mock).mockReturnValue(mockApolloClient)
  })

  it('should show loading state initially', () => {
    render(<CompanyDetailsLink instrumentId={202674} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render link with symbol when data is loaded', async () => {
    render(<CompanyDetailsLink instrumentId={202674} />)
    
    await waitFor(() => {
      expect(screen.getByText('MAR')).toBeInTheDocument()
    })
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/company/NASDAQ/MAR')
  })

  it('should render link with custom children when provided', async () => {
    render(<CompanyDetailsLink instrumentId={202674}>Marriott</CompanyDetailsLink>)
    
    await waitFor(() => {
      expect(screen.getByText('Marriott')).toBeInTheDocument()
    })
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/company/NASDAQ/MAR')
  })

  it('should show error state when symbol cannot be found', async () => {
    render(<CompanyDetailsLink instrumentId={999999} />)
    
    await waitFor(() => {
      expect(screen.getByText('Unknown company')).toBeInTheDocument()
    })
  })
}) 