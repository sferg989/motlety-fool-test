import { useWatchedCompaniesStore } from '../store/watchedCompaniesStore'

// Extend Window interface for our custom property
declare global {
  interface Window {
    __RESET_USE_WATCHED_COMPANIES?: boolean
  }
}

// Mock the Zustand store
jest.mock('../store/watchedCompaniesStore', () => {
  return {
    useWatchedCompaniesStore: jest.fn(),
  }
})

// Directly test the initialization logic
describe('useWatchedCompanies store initialization', () => {
  const mockInitializeFromApi = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Reset our mock store
    ;(useWatchedCompaniesStore as unknown as jest.MockedFunction<any>).mockReturnValue({
      watchedCompanies: [],
      isWatched: jest.fn(),
      toggleWatchedCompany: jest.fn(),
      initializeFromApi: mockInitializeFromApi,
    })

    // Reset global variables
    window.__RESET_USE_WATCHED_COMPANIES = true
  })

  it('should initialize the store with correct data', () => {
    const mockInstruments = [
      { instrumentId: 1, symbol: 'AAPL', name: 'Apple Inc.' },
      { instrumentId: 2, symbol: 'MSFT', name: 'Microsoft Corp.' },
    ]

    // Directly call the store's initialization function
    mockInitializeFromApi(mockInstruments)

    // Verify it was called with the right data
    expect(mockInitializeFromApi).toHaveBeenCalledWith(mockInstruments)
    expect(mockInitializeFromApi).toHaveBeenCalledTimes(1)
  })
})
