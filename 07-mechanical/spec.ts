import type { Entity } from '../viewer/model/schema.ts'

/**
 * Mechanical equipment — server room HVAC, racks, and house electrical.
 *
 * Server room footprint matches 05-floor-plan: x 0–12, z 15–25.
 * North wall (z = 25) is exterior / partially bermed; west wall (x = 0) is exterior corner.
 *
 * Plan (z ↑ north):
 *
 *     z=25  ┌────────────────────────────┐  ○ AC head
 *           │         ┌──rack──rack──┐   │  panels →
 *     z=20  │         │   (center)   │   │  [main ]
 *           │         └──────────────┘   │  [spare]
 *     z=15  └──────── door ─────────────┘
 *           0                          12
 */

const SERVER_WIDTH = 12
const SERVER_SOUTH_Z = 15
const SERVER_DEPTH = 10
const SERVER_NORTH_Z = SERVER_SOUTH_Z + SERVER_DEPTH
const SERVER_CENTER_X = SERVER_WIDTH / 2
const SERVER_CENTER_Z = SERVER_SOUTH_Z + SERVER_DEPTH / 2

// 42U full-size floor rack (24" × 48" footprint, ~7' tall).
const RACK_WIDTH = 2
const RACK_DEPTH = 4
const RACK_HEIGHT = 7
const RACK_GAP = 1 / 12 // 1" between cabinets so both read separately in the viewer
const RACK_PAIR_WIDTH = RACK_WIDTH * 2 + RACK_GAP
// Pair centered in room — ~3' clearance N/S, ~3–4' E/W (walk all sides).
const RACK_START_X = SERVER_CENTER_X - RACK_PAIR_WIDTH / 2
const RACK_START_Z = SERVER_CENTER_Z - RACK_DEPTH / 2
const RACK_2_X = RACK_START_X + RACK_WIDTH + RACK_GAP

// North wall interior face (south face of envelope wall-north).
const NORTH_WALL_INTERIOR_Z = SERVER_NORTH_Z - 0.5 // wall 0.5' thick at z 24.5–25

// Wall-mounted mini-split head — projects into room from north wall.
const HEAD_WIDTH = 3.25 // ~39"
const HEAD_HEIGHT = 1 // ~12"
const HEAD_DEPTH = 8 / 12 // ~8" off wall
const HEAD_MOUNT_AFF = 7.5
const HEAD_Z = NORTH_WALL_INTERIOR_Z - HEAD_DEPTH

// Wall-mounted panels on west face (extend into room +X).
const PANEL_DEPTH = 1.25
const PANEL_MAIN: [number, number, number] = [PANEL_DEPTH, 6, 2.5] // tall main service
const PANEL_SPARE: [number, number, number] = [PANEL_DEPTH, 4, 2] // future expansion

const CONDENSER_SIZE: [number, number, number] = [3, 2.5, 1]

export const MODULE_ID = '07-mechanical'

function rack(id: string, x: number, z: number, label: string): Entity {
  return {
    id,
    layer: 'mechanical',
    kind: 'box',
    position: [x, 0, z],
    size: [RACK_WIDTH, RACK_HEIGHT, RACK_DEPTH],
    label,
    meta: {
      role: 'it-equipment',
      room: 'server-room',
      rackUnits: 42,
      widthIn: 24,
      depthIn: 48,
      color: '#3d3d3d',
      note: 'Full-size 42U floor rack; centered pair — walk-around on all sides',
    },
  }
}

function wallPanel(
  id: string,
  z: number,
  size: [number, number, number],
  label: string,
  meta: Record<string, unknown>,
): Entity {
  return {
    id,
    layer: 'mechanical',
    kind: 'box',
    position: [0, 0, z],
    size,
    label,
    meta: { room: 'server-room', wall: 'west', ...meta },
  }
}

export function getSpecEntities(): Entity[] {
  const rackCenterX = SERVER_CENTER_X

  return [
    rack(
      'rack-server-1',
      RACK_START_X,
      RACK_START_Z,
      'Server rack 1 — 42U (west of pair)',
    ),
    rack(
      'rack-server-2',
      RACK_2_X,
      RACK_START_Z,
      'Server rack 2 — 42U (east of pair)',
    ),
    wallPanel(
      'panel-electrical-main',
      19.75,
      PANEL_MAIN,
      'Main electrical panel — house service',
      {
        role: 'electrical',
        panelType: 'main',
        note: 'Service entrance, PV inverter tie-in, house loads',
      },
    ),
    wallPanel(
      'panel-electrical-spare',
      16.5,
      PANEL_SPARE,
      'Spare electrical panel — future expansion',
      {
        role: 'electrical',
        panelType: 'spare',
        note: 'Reserved capacity for future circuits, EV, shop, etc.',
      },
    ),
    {
      id: 'hvac-server-minisplit-head',
      layer: 'mechanical',
      kind: 'box',
      position: [
        rackCenterX - HEAD_WIDTH / 2,
        HEAD_MOUNT_AFF,
        HEAD_Z,
      ],
      size: [HEAD_WIDTH, HEAD_HEIGHT, HEAD_DEPTH],
      label: 'Server room mini-split — indoor head (north wall)',
      meta: {
        role: 'dedicated cooling',
        room: 'server-room',
        wall: 'north',
        separateFromHouseHvac: true,
        color: '#d8eef5',
        note: 'Projects into room from north wall; sized for IT + inverter/panel heat',
      },
    },
    {
      id: 'hvac-server-minisplit-condenser',
      layer: 'mechanical',
      kind: 'box',
      position: [
        rackCenterX - CONDENSER_SIZE[0] / 2,
        0,
        SERVER_NORTH_Z,
      ],
      size: CONDENSER_SIZE,
      label: 'Server room mini-split — outdoor condenser (north exterior)',
      meta: {
        role: 'dedicated cooling',
        room: 'server-room',
        wall: 'north',
        location: 'exterior',
        pairsWith: 'hvac-server-minisplit-head',
        color: '#8a9098',
        note: 'On bermed north side; short refrigerant run to indoor head',
      },
    },
  ]
}
