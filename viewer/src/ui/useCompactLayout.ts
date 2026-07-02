import { useEffect, useState } from 'react'

const COMPACT_LAYOUT_QUERY = '(max-width: 640px), (pointer: coarse) and (max-width: 900px)'

export function useCompactLayout(): boolean {
  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(COMPACT_LAYOUT_QUERY).matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_LAYOUT_QUERY)
    const update = () => setCompact(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return compact
}
