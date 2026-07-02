export type PanInput = {
  forward: number
  strafe: number
}

let panInput: PanInput = { forward: 0, strafe: 0 }

export function getPanInput(): PanInput {
  return panInput
}

export function setPanForward(forward: number): void {
  if (panInput.forward === forward) return
  panInput = { ...panInput, forward }
}

export function setPanStrafe(strafe: number): void {
  if (panInput.strafe === strafe) return
  panInput = { ...panInput, strafe }
}

export function clearPanInput(): void {
  if (panInput.forward === 0 && panInput.strafe === 0) return
  panInput = { forward: 0, strafe: 0 }
}
