import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { WatchedCompany } from '../types/company'

interface WatchedCompaniesState {
  watchedCompanies: WatchedCompany[]
  isWatched: (instrumentId: number) => boolean
  addWatchedCompany: (company: WatchedCompany) => void
  removeWatchedCompany: (instrumentId: number) => void
  toggleWatchedCompany: (company: WatchedCompany) => void
  initializeFromApi: (apiInstruments: any[]) => void
  hasLocalData: () => boolean
}

export const useWatchedCompaniesStore = create<WatchedCompaniesState>()(
  devtools(
    persist(
      (set, get) => ({
        watchedCompanies: [],

        hasLocalData: () => {
          return get().watchedCompanies.length > 0
        },

        isWatched: (instrumentId: number) => {
          return get().watchedCompanies.some((company) => company.instrumentId === instrumentId)
        },

        addWatchedCompany: (company: WatchedCompany) => {
          if (!get().isWatched(company.instrumentId)) {
            set(
              (state) => ({
                watchedCompanies: [...state.watchedCompanies, company],
              }),
              false,
              'addWatchedCompany',
            )
          }
        },

        removeWatchedCompany: (instrumentId: number) => {
          set(
            (state) => ({
              watchedCompanies: state.watchedCompanies.filter((company) => company.instrumentId !== instrumentId),
            }),
            false,
            'removeWatchedCompany',
          )
        },

        toggleWatchedCompany: (company: WatchedCompany) => {
          const isCurrentlyWatched = get().isWatched(company.instrumentId)

          if (isCurrentlyWatched) {
            get().removeWatchedCompany(company.instrumentId)
          } else {
            get().addWatchedCompany(company)
          }
        },

        initializeFromApi: (apiInstruments: WatchedCompany[]) => {
          const apiCompanies = apiInstruments.map((instrument) => ({
            instrumentId: instrument.instrumentId,
            symbol: instrument.symbol,
            name: instrument.name,
            exchange: instrument.exchange,
          }))

          set(
            (state) => {
              const existingIds = new Set(state.watchedCompanies.map((c) => c.instrumentId))
              const newCompanies = apiCompanies.filter((c) => !existingIds.has(c.instrumentId))

              return {
                watchedCompanies: [...state.watchedCompanies, ...newCompanies],
              }
            },
            false,
            'initializeFromApi',
          )
        },
      }),
      {
        name: 'watched-companies-storage',
      },
    ),
  ),
)
