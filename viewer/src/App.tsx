import { useCallback, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { getActiveComposeProfile, getHouseModel } from '../model/compose.ts'
import {
  defaultSectionOffset,
  sectionRange,
  type CameraPreset,
} from '../model/cameraPresets.ts'
import { computeCameraFrame, computeModelBounds, boundsKey } from '../model/bounds.ts'
import { countByLayer, layersInModel } from '../model/layers.ts'
import type { LayerId, Entity } from '../model/schema.ts'
import { LayersPanel } from './ui/LayersPanel.tsx'
import { Compass } from './ui/Compass.tsx'
import { ScaleBar } from './ui/ScaleBar.tsx'
import { SelectionPanel } from './ui/SelectionPanel.tsx'
import { ViewPanel, type SectionState } from './ui/ViewPanel.tsx'
import { CameraPresetController } from './viewer/CameraPresetController.tsx'
import { CameraSetup } from './viewer/CameraSetup.tsx'
import { ClippingSetup } from './viewer/clipping.ts'
import { DevTools } from './viewer/DevTools.tsx'
import { GroundGrid } from './viewer/GroundGrid.tsx'
import { NavigationControls } from './viewer/NavigationControls.tsx'
import { ScaleReporter } from './viewer/ScaleReporter.tsx'
import { CompassReporter } from './viewer/CompassReporter.tsx'
import { ModelFrame } from './viewer/ModelFrame.tsx'
import { Scene } from './viewer/Scene.tsx'

export default function App() {
  const [showAxes, setShowAxes] = useState(false)

  // Re-read on each render so Vite HMR picks up fixture / registry edits.
  const model = getHouseModel()
  const composeProfile = getActiveComposeProfile()

  const bounds = useMemo(
    () => computeModelBounds(model.entities),
    [model.entities],
  )

  const boundsStableKey = boundsKey(bounds)

  const cameraTarget = useMemo(
    () => computeCameraFrame(bounds).target,
    [boundsStableKey],
  )

  const activeLayers = useMemo(
    () => layersInModel(model.entities),
    [model.entities],
  )

  const activeLayersKey = activeLayers.join(',')

  const entityCounts = useMemo(
    () => countByLayer(model.entities),
    [model.entities],
  )

  const [visibleLayers, setVisibleLayers] = useState<Set<LayerId>>(
    () => new Set(activeLayers),
  )

  useEffect(() => {
    setVisibleLayers(new Set(activeLayers))
  }, [activeLayersKey])

  const [section, setSection] = useState<SectionState>(() => ({
    enabled: false,
    axis: 'y',
    offset: defaultSectionOffset(bounds, 'y'),
  }))

  const [xrayEnabled, setXrayEnabled] = useState(false)
  const [cameraPreset, setCameraPreset] = useState<CameraPreset | null>(null)
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)

  const selectedId = selectedEntity?.id ?? null

  useEffect(() => {
    if (
      selectedEntity &&
      !model.entities.some((entity) => entity.id === selectedEntity.id)
    ) {
      setSelectedEntity(null)
    }
  }, [model.entities, selectedEntity])

  const currentSectionRange = useMemo(
    () => sectionRange(bounds, section.axis),
    [bounds, section.axis],
  )

  const toggleLayer = useCallback((layer: LayerId) => {
    setVisibleLayers((current) => {
      const next = new Set(current)
      if (next.has(layer)) {
        next.delete(layer)
      } else {
        next.add(layer)
      }
      return next
    })
  }, [])

  const handleSectionChange = useCallback(
    (next: SectionState) => {
      if (next.axis !== section.axis) {
        setSection({
          ...next,
          offset: defaultSectionOffset(bounds, next.axis),
        })
        return
      }
      setSection(next)
    },
    [bounds, section.axis],
  )

  const handlePreset = useCallback((preset: CameraPreset) => {
    setCameraPreset(preset)
  }, [])

  const handlePresetApplied = useCallback(() => {
    setCameraPreset(null)
  }, [])

  const handleSelect = useCallback((entity: Entity) => {
    setSelectedEntity(entity)
  }, [])

  const handleClearSelection = useCallback(() => {
    setSelectedEntity(null)
  }, [])

  return (
    <div className="app">
      <Canvas
        style={{ touchAction: 'none' }}
        camera={{ fov: 50, near: 0.1, far: 1000, up: [0, 1, 0] }}
        onPointerMissed={handleClearSelection}
      >
        <color attach="background" args={['#1a1a1a']} />
        <ClippingSetup />
        <CameraSetup bounds={bounds} />
        <CameraPresetController
          preset={cameraPreset}
          bounds={bounds}
          onApplied={handlePresetApplied}
        />
        <ambientLight intensity={0.55} />
        <directionalLight position={[40, 60, 30]} intensity={1.3} />
        <ModelFrame bounds={bounds}>
          <GroundGrid bounds={bounds} />
          <Scene
            visibleLayers={visibleLayers}
            xrayEnabled={xrayEnabled}
            sectionEnabled={section.enabled}
            sectionAxis={section.axis}
            sectionOffset={section.offset}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
          {showAxes && <axesHelper args={[15]} position={[0, 0, 0]} />}
        </ModelFrame>
        <NavigationControls bounds={bounds} />
        <ScaleReporter target={cameraTarget} />
        <CompassReporter />
      </Canvas>
      <Compass />
      <ScaleBar />
      <ViewPanel
        section={section}
        sectionRange={currentSectionRange}
        xrayEnabled={xrayEnabled}
        onSectionChange={handleSectionChange}
        onXrayChange={setXrayEnabled}
        onPreset={handlePreset}
      />
      <LayersPanel
        layers={activeLayers}
        visibleLayers={visibleLayers}
        entityCounts={entityCounts}
        onToggle={toggleLayer}
      />
      <SelectionPanel
        selectedEntity={selectedEntity}
        entities={model.entities}
        onSelect={handleSelect}
        onClear={handleClearSelection}
      />
      <DevTools
        showAxes={showAxes}
        onToggleAxes={() => setShowAxes((value) => !value)}
        composeProfile={composeProfile}
        moduleCount={model.entities.length}
      />
    </div>
  )
}
