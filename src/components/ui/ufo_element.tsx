interface UfoElementProps {
  label: string
}

const UfoElement = ({ label }: UfoElementProps) => {
  return (
    <>
      {/* Saucer Body - creates the main circular shape with metallic gradient */}
      <span
        className="absolute w-16 h-6 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-full 
        shadow-[0_0_10px_#22d3ee] group-hover:shadow-[0_0_20px_#22d3ee]
        transition-all duration-300"
      ></span>

      {/* Cockpit dome - smaller circle on top */}
      <span
        className="absolute w-8 h-8 -top-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full 
        shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] group-hover:from-cyan-300 group-hover:to-blue-400
        transition-all duration-300"
      ></span>

      {/* Glow effect underneath */}
      <span
        className="absolute -bottom-2 w-12 h-1 bg-cyan-400 blur-sm rounded-full 
        group-hover:w-14 group-hover:blur-md group-hover:bg-cyan-300
        transition-all duration-300"
      ></span>

      {/* Text label - hidden by default, shown on hover */}
      <span
        className="absolute -bottom-8 text-cyan-400 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
      >
        {label}
      </span>
    </>
  )
}

export default UfoElement
