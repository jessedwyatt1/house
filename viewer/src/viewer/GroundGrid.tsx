import { Grid } from '@react-three/drei'
import {
  expandBounds,
  gridCellSize,
  type Bounds,
} from '../../model/bounds.ts'

type GroundGridProps = {
  bounds: Bounds
}

export function GroundGrid({ bounds }: GroundGridProps) {
  const padded = expandBounds(bounds, 5)
  const cellSize = gridCellSize(bounds)
  const sectionSize = cellSize * 4
  const [width, , depth] = padded.size

  return (
    <Grid
      position={[padded.center[0], -0.01, padded.center[2]]}
      args={[width, depth]}
      cellSize={cellSize}
      cellThickness={0.6}
      cellColor="#3a3a3a"
      sectionSize={sectionSize}
      sectionThickness={1.2}
      sectionColor="#555555"
      fadeDistance={Math.max(width, depth) * 3}
      fadeStrength={1}
      infiniteGrid={false}
    />
  )
}
