import type { ScaleBarState } from '../viewer/measurements.ts'
import { formatFeet } from '../viewer/measurements.ts'
import { useScaleBarState } from './useScaleBarState.ts'

type ScaleBarProps = {
  scale?: ScaleBarState
}

export function ScaleBar({ scale: scaleProp }: ScaleBarProps) {
  const scaleFromStore = useScaleBarState()
  const scale = scaleProp ?? scaleFromStore
  return (
    <div className="scale-bar" aria-label={`Scale: ${formatFeet(scale.lengthFt)} feet`}>
      <div className="scale-bar__line" style={{ width: `${scale.barPx}px` }}>
        <span className="scale-bar__tick scale-bar__tick--start" />
        <span className="scale-bar__tick scale-bar__tick--end" />
      </div>
      <span className="scale-bar__label">{formatFeet(scale.lengthFt)} ft</span>
    </div>
  )
}
