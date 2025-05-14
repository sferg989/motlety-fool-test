import { formatPercent, formatCurrency, formatNumber, formatMillions } from './formatters'

describe('formatters', () => {
  describe('formatPercent', () => {
    it('should format decimal as percentage', () => {
      expect(formatPercent(0.1234)).toBe('0.12%')
    })

    it('should format decimal as percentage with multiplication by 100', () => {
      expect(formatPercent(0.1234, true)).toBe('12.34%')
    })

    it('should handle negative values', () => {
      expect(formatPercent(-0.1234, true)).toBe('-12.34%')
    })

    it('should handle zero', () => {
      expect(formatPercent(0)).toBe('0.00%')
    })

    it('should handle NaN', () => {
      expect(formatPercent(NaN)).toBe('-')
    })
  })

  describe('formatCurrency', () => {
    it('should format number as USD currency by default', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })

    it('should format number with specified currency code', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56')
    })

    it('should handle negative values', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    })

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should handle NaN', () => {
      expect(formatCurrency(NaN)).toBe('-')
    })
  })

  describe('formatNumber', () => {
    it('should format number with default decimal places', () => {
      expect(formatNumber(1234.56789)).toBe('1,234.57')
    })

    it('should format number with specified decimal places', () => {
      expect(formatNumber(1234.56789, 3)).toBe('1,234.568')
    })

    it('should handle negative values', () => {
      expect(formatNumber(-1234.56789)).toBe('-1,234.57')
    })

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0.00')
    })

    it('should handle NaN', () => {
      expect(formatNumber(NaN)).toBe('-')
    })
  })

  describe('formatMillions', () => {
    it('should format number in millions', () => {
      expect(formatMillions(1234567)).toBe('1.23M')
    })

    it('should format number in millions with currency code', () => {
      expect(formatMillions(1234567, 'USD')).toBe('$1.23M')
    })

    it('should handle small numbers', () => {
      expect(formatMillions(123)).toBe('0.00M')
    })

    it('should handle negative values', () => {
      expect(formatMillions(-1234567)).toBe('-1.23M')
    })

    it('should handle zero', () => {
      expect(formatMillions(0)).toBe('0.00M')
    })

    it('should handle NaN', () => {
      expect(formatMillions(NaN)).toBe('-')
    })
  })
}) 