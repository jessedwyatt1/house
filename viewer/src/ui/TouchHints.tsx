import { useEffect, useState } from 'react'
import { useCoarsePointer } from './useCoarsePointer.ts'

const VISIBLE_MS = 8000
const FADE_MS = 600

const HINTS = [
  {
    icon: '↻',
    label: 'Drag to rotate',
    detail: 'One finger on the model',
  },
  {
    icon: '⊟',
    label: 'Pinch to zoom',
    detail: 'Two fingers in or out',
  },
  {
    icon: '⊕',
    label: 'D-pad to pan',
    detail: 'Hold arrows to move around',
  },
] as const

export function TouchHints() {
  const coarsePointer = useCoarsePointer()
  const [phase, setPhase] = useState<'in' | 'out' | 'hidden'>('in')

  useEffect(() => {
    if (!coarsePointer) return

    const fadeTimer = window.setTimeout(() => setPhase('out'), VISIBLE_MS)
    const hideTimer = window.setTimeout(
      () => setPhase('hidden'),
      VISIBLE_MS + FADE_MS,
    )

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [coarsePointer])

  if (!coarsePointer || phase === 'hidden') return null

  function dismiss() {
    setPhase('out')
    window.setTimeout(() => setPhase('hidden'), FADE_MS)
  }

  return (
    <div
      className={`touch-hints touch-hints--${phase}`}
      role="status"
      aria-live="polite"
      onClick={dismiss}
    >
      <div className="touch-hints__card">
        <p className="touch-hints__title">How to explore</p>
        <ul className="touch-hints__list">
          {HINTS.map((hint) => (
            <li key={hint.label} className="touch-hints__item">
              <span className="touch-hints__icon" aria-hidden>
                {hint.icon}
              </span>
              <span className="touch-hints__text">
                <strong>{hint.label}</strong>
                <span className="touch-hints__detail">{hint.detail}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="touch-hints__dismiss">Tap anywhere to dismiss</p>
      </div>
    </div>
  )
}
