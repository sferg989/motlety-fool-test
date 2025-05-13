import { render, screen, fireEvent } from '@testing-library/react'
import WatchButton from './watchButton'
import { useWatchedCompaniesStore } from '../../store/watchedCompaniesStore'
import { WatchedCompany } from '../../types/company'

// Use a proper cast approach instead of extending Jest types
type MockStore = ReturnType<typeof useWatchedCompaniesStore>

// Mock the Zustand store
jest.mock('../../store/watchedCompaniesStore', () => ({
  useWatchedCompaniesStore: jest.fn(),
}))

describe('WatchButton', () => {
  const mockToggleWatchedCompany = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders unwatched state correctly', () => {
    // Mock the store state for an unwatched company
    const mockedStore = useWatchedCompaniesStore as jest.MockedFunction<any>
    mockedStore.mockReturnValue({
      isWatched: () => false,
      toggleWatchedCompany: mockToggleWatchedCompany,
    })

    render(<WatchButton instrumentId={123} />)

    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Watch')
  })

  test('renders watched state correctly', () => {
    // Mock the store state for a watched company
    const mockedStore = useWatchedCompaniesStore as jest.MockedFunction<any>
    mockedStore.mockReturnValue({
      isWatched: () => true,
      toggleWatchedCompany: mockToggleWatchedCompany,
    })

    render(<WatchButton instrumentId={123} />)

    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Unwatch')
  })

  test('renders text when includeText is true', () => {
    const mockedStore = useWatchedCompaniesStore as jest.MockedFunction<any>
    mockedStore.mockReturnValue({
      isWatched: () => false,
      toggleWatchedCompany: mockToggleWatchedCompany,
    })

    render(<WatchButton instrumentId={123} includeText={true} />)

    expect(screen.getByText('Watch +')).toBeInTheDocument()
  })

  test('calls toggleWatchedCompany with correct data when clicked', () => {
    const mockedStore = useWatchedCompaniesStore as jest.MockedFunction<any>
    mockedStore.mockReturnValue({
      isWatched: () => false,
      toggleWatchedCompany: mockToggleWatchedCompany,
    })

    const props = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    render(<WatchButton {...props} />)

    fireEvent.click(screen.getByRole('button'))

    const expectedCompany: WatchedCompany = {
      instrumentId: props.instrumentId,
      symbol: props.symbol,
      name: props.name,
    }

    expect(mockToggleWatchedCompany).toHaveBeenCalledTimes(1)
    expect(mockToggleWatchedCompany).toHaveBeenCalledWith(expectedCompany)
  })

  test('respects isCurrentlyWatching prop over store state', () => {
    // Mock the store state as unwatched, but provide prop as watched
    const mockedStore = useWatchedCompaniesStore as jest.MockedFunction<any>
    mockedStore.mockReturnValue({
      isWatched: () => false,
      toggleWatchedCompany: mockToggleWatchedCompany,
    })

    render(<WatchButton instrumentId={123} isCurrentlyWatching={true} />)

    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Unwatch')
  })
})
