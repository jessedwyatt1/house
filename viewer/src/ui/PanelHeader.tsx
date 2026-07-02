type PanelHeaderProps = {
  title: string
  collapsed: boolean
  onToggle: () => void
}

export function PanelHeader({ title, collapsed, onToggle }: PanelHeaderProps) {
  return (
    <div className="overlay-panel__header">
      <h2 className="overlay-panel__title">{title}</h2>
      <button
        type="button"
        className="overlay-panel__collapse"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
      >
        {collapsed ? '+' : '−'}
      </button>
    </div>
  )
}
