type DevToolsProps = {
  showAxes: boolean
  onToggleAxes: () => void
  composeProfile: string
  moduleCount: number
}

export function DevTools({
  showAxes,
  onToggleAxes,
  composeProfile,
  moduleCount,
}: DevToolsProps) {
  if (!import.meta.env.DEV) return null

  return (
    <div className="dev-tools">
      <button type="button" onClick={onToggleAxes}>
        {showAxes ? 'Hide axes' : 'Show axes'}
      </button>
      <span className="dev-tools__meta">
        {composeProfile} · {moduleCount} entities
      </span>
    </div>
  )
}
