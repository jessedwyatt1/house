import { useEffect, useState } from 'react'
import type { CameraPreset, SectionAxis } from '../../model/cameraPresets.ts'
import { PanelHeader } from './PanelHeader.tsx'
import { useCompactLayout } from './useCompactLayout.ts'

export type SectionState = {
  enabled: boolean
  axis: SectionAxis
  offset: number
}

type ViewPanelProps = {
  section: SectionState
  sectionRange: [min: number, max: number]
  xrayEnabled: boolean
  onSectionChange: (section: SectionState) => void
  onXrayChange: (enabled: boolean) => void
  onPreset: (preset: CameraPreset) => void
}

const PRESET_LABELS: Record<CameraPreset, string> = {
  plan: 'Plan',
  elevation: 'Elevation',
  interior: 'Interior',
  reset: 'Reset',
}

const AXIS_LABELS: Record<SectionAxis, string> = {
  x: 'X (east)',
  y: 'Y (up)',
  z: 'Z (north)',
}

export function ViewPanel({
  section,
  sectionRange,
  xrayEnabled,
  onSectionChange,
  onXrayChange,
  onPreset,
}: ViewPanelProps) {
  const compact = useCompactLayout()
  const [collapsed, setCollapsed] = useState(compact)

  useEffect(() => {
    if (compact) setCollapsed(true)
  }, [compact])
  const [min, max] = sectionRange

  return (
    <aside
      className={`view-panel overlay-panel${collapsed ? ' overlay-panel--collapsed' : ''}`}
      aria-label="View controls"
    >
      <PanelHeader
        title="View"
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      {!collapsed && (
        <div className="overlay-panel__body">
          <div className="view-panel__group">
            <h3 className="view-panel__heading">Camera</h3>
            <div className="view-panel__buttons">
              {(['plan', 'elevation', 'interior', 'reset'] as const).map(
                (preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="view-panel__button"
                    onClick={() => onPreset(preset)}
                  >
                    {PRESET_LABELS[preset]}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="view-panel__group">
            <h3 className="view-panel__heading">Section cut</h3>
            <label className="view-panel__row">
              <input
                type="checkbox"
                checked={section.enabled}
                onChange={(event) =>
                  onSectionChange({ ...section, enabled: event.target.checked })
                }
              />
              <span>Enable</span>
            </label>
            <label className="view-panel__row">
              <span className="view-panel__label">Axis</span>
              <select
                className="view-panel__select"
                value={section.axis}
                disabled={!section.enabled}
                onChange={(event) =>
                  onSectionChange({
                    ...section,
                    axis: event.target.value as SectionAxis,
                  })
                }
              >
                {(Object.keys(AXIS_LABELS) as SectionAxis[]).map((axis) => (
                  <option key={axis} value={axis}>
                    {AXIS_LABELS[axis]}
                  </option>
                ))}
              </select>
            </label>
            <label className="view-panel__row view-panel__row--slider">
              <span className="view-panel__label">
                Offset <strong>{section.offset.toFixed(1)} ft</strong>
              </span>
              <input
                type="range"
                className="view-panel__slider"
                min={min}
                max={max}
                step={0.25}
                value={section.offset}
                disabled={!section.enabled}
                onChange={(event) =>
                  onSectionChange({
                    ...section,
                    offset: Number(event.target.value),
                  })
                }
              />
            </label>
          </div>

          <div className="view-panel__group">
            <h3 className="view-panel__heading">X-ray</h3>
            <label className="view-panel__row">
              <input
                type="checkbox"
                checked={xrayEnabled}
                onChange={(event) => onXrayChange(event.target.checked)}
              />
              <span>Fade envelope &amp; glazing</span>
            </label>
          </div>
        </div>
      )}
    </aside>
  )
}
