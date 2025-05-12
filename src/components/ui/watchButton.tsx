'use client'

type WatchButtonProps = {
  instrumentId: number
  isCurrentlyWatching?: boolean
  includeText?: boolean
}

const WatchButton = ({ instrumentId, isCurrentlyWatching = false, includeText = false }: WatchButtonProps) => {
  const text = includeText ? isCurrentlyWatching ? 'Watching' : 'Watch' : ''
  const indicator = isCurrentlyWatching ? '-' : '+'
  const textColor = isCurrentlyWatching ? 'text-red-500' : 'text-green-500'

  const onClick = () => {
    console.log('Toggle watch state for', instrumentId)
  }

  return (
    <button onClick={onClick} className="px-8 hover:font-bold">
      <span className={textColor}>{text} {indicator}</span>
    </button>
  )
}

export default WatchButton