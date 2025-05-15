interface DebugProps {
  data: any
  title?: string
  height?: string
  expand?: boolean
}

/**
 * Debug component for development purposes.
 * Displays data in a formatted pre tag.
 */
export default function Debug({ data, title, height = 'auto', expand = false }: DebugProps) {
  return (
    <div
      className="bg-slate-900 text-green-400 p-4 rounded-md my-2 overflow-auto"
      style={{
        maxHeight: expand ? 'none' : height,
        height: expand ? 'auto' : height,
      }}
    >
      {title && <h3 className="text-white font-bold mb-2">{title}</h3>}
      <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
