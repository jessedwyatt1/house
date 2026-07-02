import { useEffect, useState } from 'react'
import { LAYER_IDS, type LayerId } from '../../model/schema.ts'
import { PanelHeader } from './PanelHeader.tsx'
import { useCompactLayout } from './useCompactLayout.ts'

type LayersPanelProps = {
  /** Layers to list — typically those present in the model, schema-ordered. */
  layers: LayerId[]
  visibleLayers: ReadonlySet<LayerId>
  entityCounts: Map<LayerId, number>
  onToggle: (layer: LayerId) => void
}

function formatLayerLabel(layer: LayerId): string {
  return layer.replace(/-/g, ' ')
}

export function LayersPanel({
  layers,
  visibleLayers,
  entityCounts,
  onToggle,
}: LayersPanelProps) {
  const compact = useCompactLayout()
  const [collapsed, setCollapsed] = useState(compact)

  useEffect(() => {
    if (compact) setCollapsed(true)
  }, [compact])

  return (
    <aside
      className={`layers-panel overlay-panel${collapsed ? ' overlay-panel--collapsed' : ''}`}
      aria-label="Layer visibility"
    >
      <PanelHeader
        title="Layers"
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      {!collapsed && (
        <div className="overlay-panel__body">
          <ul className="layers-panel__list">
            {layers.map((layer) => (
              <li key={layer}>
                <label className="layers-panel__item">
                  <input
                    type="checkbox"
                    checked={visibleLayers.has(layer)}
                    onChange={() => onToggle(layer)}
                  />
                  <span className="layers-panel__label">
                    {formatLayerLabel(layer)}
                  </span>
                  <span className="layers-panel__count">
                    {entityCounts.get(layer) ?? 0}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {layers.length < LAYER_IDS.length && (
            <p className="layers-panel__hint">
              {LAYER_IDS.length - layers.length} unused{' '}
              {LAYER_IDS.length - layers.length === 1 ? 'layer' : 'layers'}{' '}
              omitted
            </p>
          )}
        </div>
      )}
    </aside>
  )
}
