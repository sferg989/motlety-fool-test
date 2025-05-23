const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^~components/(.*)$': '<rootDir>/src/components/$1',
    '^~lib/(.*)$': '<rootDir>/src/lib/$1',
    '^~styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~utils/(.*)$': '<rootDir>/src/utils/$1',
    '^~data/(.*)$': '<rootDir>/src/data/$1',
    '^~types/(.*)$': '<rootDir>/src/types/$1',
    '^~hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/lib/**', '!src/components/debug.tsx', '!src/**/*.d.ts', '!**/node_modules/**', '!**/.next/**'],
  coverageThreshold: {
    global: {
      branches: 38,
      statements: 38,
    },
  },
  coverageDirectory: 'coverage',
}

module.exports = createJestConfig(customJestConfig)
