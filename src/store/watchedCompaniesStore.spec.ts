import { act } from '@testing-library/react'
import { useWatchedCompaniesStore } from './watchedCompaniesStore'
import { WatchedCompany } from '../types/company'

describe('watchedCompaniesStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useWatchedCompaniesStore.setState({ watchedCompanies: [] })
    })
  })

  test('should initialize with empty watchedCompanies array', () => {
    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toEqual([])
  })

  test('should add watched company', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    act(() => {
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(1)
    expect(state.watchedCompanies[0]).toEqual(company)
  })

  test('should not add duplicate companies', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    act(() => {
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(1)
  })

  test('should remove watched company', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    act(() => {
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
      useWatchedCompaniesStore.getState().removeWatchedCompany(123)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(0)
  })

  test('isWatched should return true for watched company', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    act(() => {
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
    })

    const isWatched = useWatchedCompaniesStore.getState().isWatched(123)
    expect(isWatched).toBe(true)
  })

  test('isWatched should return false for unwatched company', () => {
    const isWatched = useWatchedCompaniesStore.getState().isWatched(123)
    expect(isWatched).toBe(false)
  })

  test('toggleWatchedCompany should add unwatched company', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    act(() => {
      useWatchedCompaniesStore.getState().toggleWatchedCompany(company)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(1)
    expect(state.watchedCompanies[0]).toEqual(company)
  })

  test('toggleWatchedCompany should remove watched company', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    act(() => {
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
      useWatchedCompaniesStore.getState().toggleWatchedCompany(company)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(0)
  })

  test('initializeFromApi should add companies from API', () => {
    const apiInstruments = [
      { instrumentId: 123, symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
      { instrumentId: 456, symbol: 'MSFT', name: 'Microsoft', exchange: 'NASDAQ' },
    ]

    act(() => {
      useWatchedCompaniesStore.getState().initializeFromApi(apiInstruments)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(2)
    expect(state.watchedCompanies[0].instrumentId).toBe(123)
    expect(state.watchedCompanies[1].instrumentId).toBe(456)
  })

  test('initializeFromApi should not add duplicates', () => {
    const company: WatchedCompany = {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
    }

    const apiInstruments = [
      { instrumentId: 123, symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
      { instrumentId: 456, symbol: 'MSFT', name: 'Microsoft', exchange: 'NASDAQ' },
    ]

    act(() => {
      useWatchedCompaniesStore.getState().addWatchedCompany(company)
      useWatchedCompaniesStore.getState().initializeFromApi(apiInstruments)
    })

    const state = useWatchedCompaniesStore.getState()
    expect(state.watchedCompanies).toHaveLength(2)
  })
})
