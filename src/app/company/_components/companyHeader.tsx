import WatchButton from "~components/ui/watchButton"

export type CompanyHeaderProps = {
  instrumentId: number
  symbol: string
  name: string
  currency: string
  price: number
  change: number
  lastUpdate: string
}

const CompanyHeader = ({ instrumentId, symbol, name, currency, price, change, lastUpdate }: CompanyHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-black via-slate-900 to-black p-6 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] w-full flex flex-grow justify-between items-start">
 <div className="space-y-2 w-2/3">
   <h2 className="text-2xl font-mono text-cyan-400 flex items-center gap-2">
     <span className="text-blue-500">{symbol}</span>
     <span className="text-slate-400">-</span>
     <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">({name})</span>
   </h2>
   
   <div className="flex gap-6 font-mono">
     <p className="text-slate-300">
       Price: <span className="text-cyan-400">{currency} {price}</span>
     </p>
     <p className="text-slate-300">
       Change: <span className="text-cyan-400">{change}</span>
     </p>
   </div>
   
   <p className="text-slate-300 font-mono">
     Last Update: <span className="text-cyan-400">
       {new Date(lastUpdate).toLocaleString()}
     </span>
   </p>
 </div>

 <div>
   <WatchButton instrumentId={instrumentId} includeText={true} />
 </div>
</header>
  )
}

export default CompanyHeader