import {
  setPanForward,
  setPanStrafe,
} from '../viewer/cameraPanStore.ts'
import { useCoarsePointer } from './useCoarsePointer.ts'

type PanButtonProps = {
  label: string
  className: string
  onPress: () => void
  onRelease: () => void
}

function PanButton({ label, className, onPress, onRelease }: PanButtonProps) {
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onPointerDown={(event) => {
        event.preventDefault()
        event.currentTarget.setPointerCapture(event.pointerId)
        onPress()
      }}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      onLostPointerCapture={onRelease}
    >
      {label === 'Forward' && '▲'}
      {label === 'Back' && '▼'}
      {label === 'Left' && '◀'}
      {label === 'Right' && '▶'}
    </button>
  )
}

export function CameraPanPad() {
  const coarsePointer = useCoarsePointer()

  if (!coarsePointer) return null

  return (
    <div className="pan-pad" aria-label="Move camera">
      <PanButton
        label="Forward"
        className="pan-pad__btn pan-pad__btn--up"
        onPress={() => setPanForward(1)}
        onRelease={() => setPanForward(0)}
      />
      <div className="pan-pad__row">
        <PanButton
          label="Left"
          className="pan-pad__btn pan-pad__btn--left"
          onPress={() => setPanStrafe(-1)}
          onRelease={() => setPanStrafe(0)}
        />
        <span className="pan-pad__center" aria-hidden />
        <PanButton
          label="Right"
          className="pan-pad__btn pan-pad__btn--right"
          onPress={() => setPanStrafe(1)}
          onRelease={() => setPanStrafe(0)}
        />
      </div>
      <PanButton
        label="Back"
        className="pan-pad__btn pan-pad__btn--down"
        onPress={() => setPanForward(-1)}
        onRelease={() => setPanForward(0)}
      />
    </div>
  )
}
