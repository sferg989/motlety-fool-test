
export function formatPercent(value: number, multHundred = false): string {
  if (isNaN(value)) {
    return '-'
  }
  const multiplier = multHundred ? 100 : 1
  return `${(value * multiplier).toFixed(2)}%`
}