import { useMemo, useState } from 'react'
import type { Entity } from '../../model/schema.ts'
import { entityMeasurementRows, formatFeet } from '../viewer/measurements.ts'
import { PanelHeader } from './PanelHeader.tsx'

type SelectionPanelProps = {
  selectedEntity: Entity | null
  entities: Entity[]
  onSelect: (entity: Entity) => void
  onClear: () => void
}

function EntityDetails({ entity }: { entity: Entity }) {
  const measurements = useMemo(
    () => entityMeasurementRows(entity),
    [entity],
  )

  return (
    <dl className="selection-panel__details">
      <div className="selection-panel__row">
        <dt>ID</dt>
        <dd>{entity.id}</dd>
      </div>
      <div className="selection-panel__row">
        <dt>Kind</dt>
        <dd>{entity.kind}</dd>
      </div>
      <div className="selection-panel__row">
        <dt>Layer</dt>
        <dd>{entity.layer}</dd>
      </div>
      {entity.label && (
        <div className="selection-panel__row">
          <dt>Label</dt>
          <dd>{entity.label}</dd>
        </div>
      )}
      <div className="selection-panel__row">
        <dt>Position</dt>
        <dd>
          {formatFeet(entity.position[0])} ft east of west wall,{' '}
          {formatFeet(entity.position[2])} ft north of south wall, up{' '}
          {formatFeet(entity.position[1])} ft
        </dd>
      </div>
      {measurements.length > 0 && (
        <>
          <div className="selection-panel__section-label">Measurements</div>
          {measurements.map((row) => (
            <div className="selection-panel__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </>
      )}
    </dl>
  )
}

export function SelectionPanel({
  selectedEntity,
  entities,
  onSelect,
  onClear,
}: SelectionPanelProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [showList, setShowList] = useState(false)

  const filteredEntities = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return entities
    return entities.filter(
      (entity) =>
        entity.id.toLowerCase().includes(query) ||
        entity.kind.toLowerCase().includes(query) ||
        entity.layer.toLowerCase().includes(query) ||
        entity.label?.toLowerCase().includes(query),
    )
  }, [entities, search])

  return (
    <aside
      className={`selection-panel overlay-panel${collapsed ? ' overlay-panel--collapsed' : ''}`}
      aria-label="Entity inspection"
    >
      <PanelHeader
        title="Selection"
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      {!collapsed && (
        <div className="overlay-panel__body">
          {selectedEntity ? (
            <>
              <EntityDetails entity={selectedEntity} />
              <button
                type="button"
                className="selection-panel__clear"
                onClick={onClear}
              >
                Clear
              </button>
            </>
          ) : (
            <p className="selection-panel__hint">Click an entity in the scene</p>
          )}

          <div className="selection-panel__list-section">
            <button
              type="button"
              className="selection-panel__list-toggle"
              onClick={() => setShowList((value) => !value)}
            >
              {showList ? 'Hide entity list' : 'Show entity list'}
            </button>
            {showList && (
              <>
                <input
                  type="search"
                  className="selection-panel__search"
                  placeholder="Search id, kind, layer…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <ul className="selection-panel__list">
                  {filteredEntities.map((entity) => (
                    <li key={entity.id}>
                      <button
                        type="button"
                        className={`selection-panel__list-item${
                          selectedEntity?.id === entity.id
                            ? ' selection-panel__list-item--active'
                            : ''
                        }`}
                        onClick={() => onSelect(entity)}
                      >
                        <span className="selection-panel__list-id">{entity.id}</span>
                        <span className="selection-panel__list-meta">
                          {entity.kind} · {entity.layer}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                {filteredEntities.length === 0 && (
                  <p className="selection-panel__hint">No matches</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
