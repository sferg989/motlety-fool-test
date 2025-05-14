export function formatPercent(value: number, multHundred = false): string {
  if (isNaN(value)) {
    return '-'
  }
  const multiplier = multHundred ? 100 : 1
  return `${(value * multiplier).toFixed(2)}%`
}

export function formatCurrency(value: number, currencyCode = 'USD'): string {
  if (isNaN(value)) {
    return '-'
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value)
}

export function formatNumber(value: number, decimals = 2): string {
  if (isNaN(value)) {
    return '-'
  }
  
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(value)
}

export function formatMillions(value: number, currencyCode?: string): string {
  if (isNaN(value)) {
    return '-'
  }
  
  const inMillions = value / 1000000;
  
  if (currencyCode) {
    return `${formatCurrency(inMillions, currencyCode)}M`
  }
  
  return `${formatNumber(inMillions)}M`
}
