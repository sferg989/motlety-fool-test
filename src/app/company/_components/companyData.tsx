import { Quote, QuoteFundamentals } from '~types/quotes'
import { formatCurrency, formatPercent, formatMillions, formatNumber } from '~utils/formatters'

type CompanyDataProps = {
  quote: Quote;
  quoteFundamentals?: QuoteFundamentals;
}

const CompanyData = ({ quote, quoteFundamentals }: CompanyDataProps) => {
  const currencyCode = quote.currentPrice.currencyCode;
  const dailyChangePercent = quote.percentChange;
  const dailyChangeAmount = quote.priceChange.amount;
  const dailyRangeMin = quote.dailyRange.min.amount;
  const dailyRangeMax = quote.dailyRange.max.amount;
  const weekRangeMin = quote.fiftyTwoWeekRange.min.amount;
  const weekRangeMax = quote.fiftyTwoWeekRange.max.amount;
  const beta = quote.beta5y;
  const marketCap = quote.marketCap.amount;
  
  // Extract employee count from quoteFundamentals
  const employees = quoteFundamentals?.dynamic.numberOfEmployees?.data[0]?.value 
    ? parseInt(quoteFundamentals.dynamic.numberOfEmployees.data[0].value.replace(/,/g, ''), 10) 
    : 0;
    
  const marketCapPerEmployee = employees > 0 ? marketCap / employees : 0;
  const grossMargin = quote.grossMargin;
  
  // Extract CEO name from quoteFundamentals
  const ceo = quoteFundamentals?.dynamic.ceo?.data[0]?.value || 'N/A';

  const getBetaLabel = (beta: number) => {
    if (beta >= 1.5) return <span className="text-red-400">High</span>;
    if (beta >= 0.8 && beta < 1.5) return <span className="text-yellow-400">Medium</span>;
    return <span className="text-green-400">Low</span>;
  };

  return (
    <div className="bg-gradient-to-r from-black via-slate-900 to-black p-6 font-mono text-slate-300 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
      <dl className="grid grid-cols-2 gap-6">
        <div>
          <dt className="text-cyan-400 mb-1">Daily Change</dt>
          <dd className={dailyChangeAmount >= 0 ? "text-blue-400" : "text-red-400"}>
            {formatPercent(dailyChangePercent, true)} | {formatCurrency(dailyChangeAmount, currencyCode)}
          </dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Daily Range</dt>
          <dd>{formatCurrency(dailyRangeMin, currencyCode)} - {formatCurrency(dailyRangeMax, currencyCode)}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">52-Week Range</dt>
          <dd>{formatCurrency(weekRangeMin, currencyCode)} - {formatCurrency(weekRangeMax, currencyCode)}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Beta (Volatility)</dt>
          <dd>
            {formatNumber(beta)} {getBetaLabel(beta)}
          </dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Market Cap</dt>
          <dd>{formatMillions(marketCap, currencyCode)}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Employees</dt>
          <dd>{employees.toLocaleString()}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Market Cap / Employee</dt>
          <dd>{formatMillions(marketCapPerEmployee, currencyCode)}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">Gross Margin</dt>
          <dd>{formatPercent(grossMargin, true)}</dd>
        </div>

        <div>
          <dt className="text-cyan-400 mb-1">CEO</dt>
          <dd>{ceo}</dd>
        </div>
      </dl>
    </div>
  )
}

export default CompanyData
