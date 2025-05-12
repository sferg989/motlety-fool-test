type CompanyDataProps  = {}

const CompanyData = () => {
  return (
    <div className="bg-gradient-to-r from-black via-slate-900 to-black p-6 font-mono text-slate-300 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
      <dl className="grid grid-cols-2 gap-6">
        <div>
          <dt className="text-cyan-400 mb-1">Daily Change</dt>
          <dd className="text-blue-400">+8.74% | $0.18</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Daily Range</dt>
          <dd>$2.02 - $2.39</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">52-Week Range</dt>
          <dd>$1.16 - $10.65</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Beta (Volatility)</dt>
          <dd>1.93 <span className="text-red-400">High</span></dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Market Cap</dt>
          <dd>$561.41M</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Employees</dt>
          <dd>796</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Market Cap / Employee</dt>
          <dd>$0.71M</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">Gross Margin</dt>
          <dd>12.31%</dd>
        </div>
        
        <div>
          <dt className="text-cyan-400 mb-1">CEO</dt>
          <dd>Christian O. Henry, MBA</dd>
        </div>
      </dl>
    </div>
  )
}

export default CompanyData