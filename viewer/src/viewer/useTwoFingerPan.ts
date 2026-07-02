import { useEffect, type RefObject } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

function touchCenter(touches: TouchList): { x: number; y: number } {
  let x = 0
  let y = 0
  for (let i = 0; i < touches.length; i++) {
    x += touches[i].clientX
    y += touches[i].clientY
  }
  return { x: x / touches.length, y: y / touches.length }
}

export function useTwoFingerPan(
  controlsRef: RefObject<OrbitControlsImpl | null>,
  enabled: boolean,
) {
  const gl = useThree((state) => state.gl)
  const camera = useThree((state) => state.camera)

  useEffect(() => {
    if (!enabled) return

    const canvas = gl.domElement
    let lastCenter: { x: number; y: number } | null = null
    let panning = false
    const panRight = new Vector3()
    const panUp = new Vector3()

    function applyPan(dx: number, dy: number) {
      const controls = controlsRef.current
      if (!controls) return

      const targetDistance = camera.position.distanceTo(controls.target)
      const panX = (2 * dx * targetDistance) / canvas.clientHeight
      const panY = (2 * dy * targetDistance) / canvas.clientHeight

      panRight.setFromMatrixColumn(camera.matrix, 0).multiplyScalar(-panX)
      panUp.setFromMatrixColumn(camera.matrix, 1).multiplyScalar(panY)

      controls.target.add(panRight).add(panUp)
      camera.position.add(panRight).add(panUp)
      controls.update()
    }

    function onTouchStart(event: TouchEvent) {
      if (event.touches.length >= 2) {
        lastCenter = touchCenter(event.touches)
        panning = true
        const controls = controlsRef.current
        if (controls) controls.enabled = false
        event.preventDefault()
      }
    }

    function onTouchMove(event: TouchEvent) {
      if (!panning || event.touches.length < 2 || !lastCenter) return
      event.preventDefault()
      const center = touchCenter(event.touches)
      applyPan(center.x - lastCenter.x, center.y - lastCenter.y)
      lastCenter = center
    }

    function endPan(event: TouchEvent) {
      if (event.touches.length >= 2) {
        lastCenter = touchCenter(event.touches)
        return
      }

      lastCenter = null
      panning = false
      const controls = controlsRef.current
      if (controls) controls.enabled = true
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', endPan)
    canvas.addEventListener('touchcancel', endPan)

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', endPan)
      canvas.removeEventListener('touchcancel', endPan)
      const controls = controlsRef.current
      if (controls) controls.enabled = true
    }
  }, [enabled, gl, camera, controlsRef])
}
