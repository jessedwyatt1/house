import type { Entity } from '../viewer/model/schema.ts'

/**
 * Interior partitions — NW server room + NE service core.
 *
 * Convention (schema.ts): origin = SW corner of slab top, Y = 0 = finish floor.
 * +X east, +Z north, feet.
 *
 *     z=25  ┌──────────┬──────┬─────────────────┐  north shell
 *           │  SERVER  │ CLST │    HALL   │ BATH│
 *     z=20  │   ROOM   │ N/S  │     ├─────┤     │
 *           │ 12'×10'  │ 6×10 │     │UTIL │     │
 *     z=15  ├──────────┴──────┴─────┴─────────┤
 *           │         KITCHEN                 │
 *     z=10  └─────────────────────────────────┘
 *           │         open living             │
 *           0   12    18  26  40         52   60 → E
 */

const FOOTPRINT_WIDTH = 60
const FOOTPRINT_DEPTH = 25

const WALL_HEIGHT = 10
const WALL_THICK = 0.5

const BATH_WIDTH = 8
const BATH_WEST_X = FOOTPRINT_WIDTH - BATH_WIDTH // 52
const UTIL_WIDTH = 12
const SERVICE_WEST_X = BATH_WEST_X - UTIL_WIDTH // 40 — service core west edge
const SERVICE_SOUTH_Z = 10 // south edge of service block (faces open living)

const UTIL_WEST_X = SERVICE_WEST_X
const HALL_WIDTH = BATH_WEST_X - SERVICE_WEST_X // 12 — hall to bath partition
const SERVICE_WIDTH = FOOTPRINT_WIDTH - SERVICE_WEST_X // 20

// Bands south → north.
const WET_NORTH_Z = 15 // shared wet wall — south face of utility + bath
const HALL_DEPTH = 5
const HALL_SOUTH_Z = FOOTPRINT_DEPTH - HALL_DEPTH // 20

const KITCHEN_DEPTH = WET_NORTH_Z - SERVICE_SOUTH_Z // 5'
const UTIL_DEPTH = HALL_SOUTH_Z - WET_NORTH_Z // 5'
const BATH_DEPTH = FOOTPRINT_DEPTH - WET_NORTH_Z // 10'

const BATH_DOOR_WIDTH = 2 + 8 / 12 // 2'-8"
const BATH_DOOR_HEIGHT = 6 + 8 / 12 // 6'-8"
const BATH_DOOR_Z =
  HALL_SOUTH_Z + (HALL_DEPTH - BATH_DOOR_WIDTH) / 2 // centered in hall band

const UTIL_BARN_WIDTH = 6 // pair of sliding barn doors
const UTIL_BARN_HEIGHT = 7
const UTIL_BARN_X = UTIL_WEST_X + (UTIL_WIDTH - UTIL_BARN_WIDTH) / 2 // centered in utility

// Northwest server room — house electrical + 2× 42U racks.
const SERVER_WIDTH = 12 // x 0–12; 4' rack pair + 4' aisle + west electrical wall
const SERVER_EAST_X = SERVER_WIDTH
const SERVER_SOUTH_Z = WET_NORTH_Z // z 15 — aligns with service wet wall
const SERVER_DEPTH = FOOTPRINT_DEPTH - SERVER_SOUTH_Z // 10' (z 15–25)

const SERVER_DOOR_WIDTH = 3
const SERVER_DOOR_HEIGHT = 6 + 8 / 12 // 6'-8"
const SERVER_DOOR_X = 1 // near west wall (was centered)
const SERVER_DOOR_EAST_X = SERVER_DOOR_X + SERVER_DOOR_WIDTH
const SERVER_DOOR_LINTEL_HEIGHT = WALL_HEIGHT - SERVER_DOOR_HEIGHT
const SERVER_DOOR_THICK = 1.75 / 12

// East of server room — 6'×10' closet pair (3'×5' each, N/S split).
const CLOSET_WIDTH = 6
const CLOSET_EAST_X = SERVER_EAST_X + CLOSET_WIDTH // 18
const CLOSET_DEPTH = SERVER_DEPTH // 10' — matches server room (z 15–25)
const CLOSET_HALF_DEPTH = CLOSET_DEPTH / 2 // 5'
const CLOSET_SPLIT_Z = SERVER_SOUTH_Z + CLOSET_HALF_DEPTH // 20 — divider between halves

// Floating bedroom partition — projects east from the closet, parallel to south wall.
const BEDROOM_WALL_X = CLOSET_EAST_X
const BEDROOM_WALL_Z = SERVER_SOUTH_Z
const BEDROOM_WALL_LENGTH = 12 // east-west run off the closet; does not reach service core
const BEDROOM_EAST_X = BEDROOM_WALL_X + BEDROOM_WALL_LENGTH // 30 — east end of nook

const BEDROOM_BARN_WIDTH = 4 // single oversized barn door on rails
const BEDROOM_BARN_HEIGHT = 7
const BEDROOM_BARN_NORTH_CLEARANCE = 0.5
const BEDROOM_BARN_SOUTH_SHIFT = 1 // nudge whole door assembly toward south wall
const BEDROOM_BARN_Z =
  BEDROOM_WALL_Z +
  CLOSET_DEPTH -
  BEDROOM_BARN_WIDTH -
  BEDROOM_BARN_NORTH_CLEARANCE -
  BEDROOM_BARN_SOUTH_SHIFT // near north end; slides south to open
const BEDROOM_BARN_OPEN_Z = BEDROOM_BARN_Z - BEDROOM_BARN_WIDTH
const BEDROOM_BARN_RAIL_Z = BEDROOM_BARN_OPEN_Z
const BEDROOM_BARN_RAIL_LENGTH = BEDROOM_BARN_WIDTH * 2
const BEDROOM_BARN_FACE_X = BEDROOM_EAST_X + WALL_THICK + 0.05
const BEDROOM_BARN_LINTEL_HEIGHT = WALL_HEIGHT - BEDROOM_BARN_HEIGHT
const BEDROOM_BARN_NORTH_Z = BEDROOM_BARN_Z + BEDROOM_BARN_WIDTH
const BEDROOM_BARN_NORTH_STUB_LENGTH =
  BEDROOM_WALL_Z + CLOSET_DEPTH - BEDROOM_BARN_NORTH_Z

// Queen bed — head against south partition, centered in bedroom nook.
const QUEEN_WIDTH = 60 / 12 // 60" head–foot width (east–west)
const QUEEN_LENGTH = 80 / 12 // 80" length (north–south)
const BED_FRAME_HEIGHT = 24 / 12
const BED_MATTRESS_THICK = 12 / 12
const BED_HEADBOARD_HEIGHT = 48 / 12
const BED_HEADBOARD_THICK = 3 / 12
const BED_WALL_INSET = WALL_THICK // flush to interior face of south partition
const BED_X = BEDROOM_WALL_X + (BEDROOM_WALL_LENGTH - QUEEN_WIDTH) / 2
const BED_HEADBOARD_Z = BEDROOM_WALL_Z + BED_WALL_INSET
const BED_Z = BED_HEADBOARD_Z + BED_HEADBOARD_THICK
const NIGHTSTAND_WIDTH = 20 / 12
const NIGHTSTAND_DEPTH = 16 / 12
const NIGHTSTAND_HEIGHT = 24 / 12
const NIGHTSTAND_BED_GAP = 3 / 12
const NIGHTSTAND_WEST_X = BED_X - NIGHTSTAND_BED_GAP - NIGHTSTAND_WIDTH
const NIGHTSTAND_EAST_X = BED_X + QUEEN_WIDTH + NIGHTSTAND_BED_GAP
const NIGHTSTAND_Z = BED_Z

// Open living — floor-to-ceiling bookshelf on bedroom south partition.
const GAP_BOOKSHELF_DEPTH = 12 / 12
const GAP_BOOKSHELF_UPRIGHT = 1.5 / 12
const GAP_BOOKSHELF_BOARD = 0.75 / 12
const GAP_BOOKSHELF_LEVELS_AFF = [0, 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.5]
const BOOK_STACK_ALONG_SHELF = 9 / 12 // book width along shelf (+X); spines face south
const BOOK_STACK_SPINE_DEPTH = 10 / 12 // spine-to-page depth (+Z) on 12" shelf
const BOOK_SPINE_COLORS = [
  '#6b3a2a',
  '#8b4513',
  '#2f4f4f',
  '#556b2f',
  '#704214',
  '#4a3728',
  '#8b2500',
  '#1e3a5f',
  '#5c4033',
  '#7a5230',
  '#3d5a45',
  '#6b4423',
]

// Desks — workstation west wall.
const DESK_WIDTH = 72 / 12 // 72" along wall
const DESK_DEPTH = 32 / 12 // 32" into open living
const DESK_TOP_THICK = 1.5 / 12
const DESK_LEG = 2 / 12
const DESK_LEG_HEIGHT = 29 / 12
const DESK_LEG_INSET = 3 / 12
const DESK_SURFACE_Y = DESK_LEG_HEIGHT + DESK_TOP_THICK

const CM = 1 / 30.48 // centimeters → feet

// Bamboo dual monitor riser (~100 × 23 × 11 cm).
const STAND_LENGTH = 100 * CM
const STAND_DEPTH = 23 * CM
const STAND_HEIGHT = 11 * CM

// 24" class monitors (pair on riser).
const MONITOR_WIDTH = 21 / 12
const MONITOR_HEIGHT = 16 / 12
const MONITOR_DEPTH = 2.5 / 12
const MONITOR_GAP = 1 / 12

// Desk pad + input devices (front of desk).
const PAD_WIDTH = 30 / 12
const PAD_DEPTH = 16 / 12
const PAD_THICK = 0.125 / 12
const KEYBOARD_WIDTH = 17.5 / 12
const KEYBOARD_DEPTH = 6 / 12
const KEYBOARD_HEIGHT = 0.75 / 12
const MOUSE_WIDTH = 4.5 / 12
const MOUSE_DEPTH = 2.75 / 12
const MOUSE_HEIGHT = 1.25 / 12

// Office chair — east of west-wall workstation.
const OFFICE_CHAIR_SEAT = 22 / 12
const OFFICE_CHAIR_SEAT_H = 20 / 12
const OFFICE_CHAIR_BACK_H = 22 / 12
const OFFICE_CHAIR_BACK_D = 2 / 12
const OFFICE_CHAIR_DESK_GAP = 6 / 12

const CLOSET_DOOR_WIDTH = 2 + 8 / 12 // 2'-8"
const CLOSET_DOOR_HEIGHT = 6 + 8 / 12 // 6'-8"
const CLOSET_DOOR_LINTEL_HEIGHT = WALL_HEIGHT - CLOSET_DOOR_HEIGHT
const CLOSET_DOOR_THICK = 1.75 / 12
const CLOSET_SOUTH_DOOR_Z =
  SERVER_SOUTH_Z + (CLOSET_HALF_DEPTH - CLOSET_DOOR_WIDTH) / 2 // south half, on wall-server-east
const CLOSET_SOUTH_DOOR_NORTH_Z = CLOSET_SOUTH_DOOR_Z + CLOSET_DOOR_WIDTH
const CLOSET_NORTH_DOOR_Z =
  CLOSET_SPLIT_Z + (CLOSET_HALF_DEPTH - CLOSET_DOOR_WIDTH) / 2 // north half, on wall-closet-east
const CLOSET_NORTH_DOOR_NORTH_Z = CLOSET_NORTH_DOOR_Z + CLOSET_DOOR_WIDTH

// Large L sectional — service core south partition; L return on west end.
const SECTIONAL_MAIN_LENGTH = 12 // main run along partition (+X)
const SECTIONAL_RETURN_LENGTH = 8 // west leg into living room (−Z)
const COUCH_LENGTH = 8 // reference length for west-wall desk z band
const COUCH_DEPTH = 3 // seat depth into room (+X or +Z)
const COUCH_SEAT_HEIGHT = 18 / 12
const COUCH_BACK_HEIGHT = 18 / 12
const COUCH_BACK_DEPTH = 14 / 12 // back cushion depth from wall
const COUCH_X = WALL_THICK // interior face of wall-west — west-wall desk z reference
const COUCH_Z = (SERVER_SOUTH_Z - COUCH_LENGTH) / 2 // centered in open living depth

// Library reading chair — near utility west wall, below hall band.
const LIBRARY_CHAIR_SEAT_W = 2.5 // along wall (+Z)
const LIBRARY_CHAIR_SEAT_D = 2.5 // into open living (-X)
const LIBRARY_CHAIR_SOUTH_SHIFT = 1.5 // nudge south from north end of utility west wall
const LIBRARY_CHAIR_WALL_GAP = 2 // clearance west of utility west partition interior face
const LIBRARY_CHAIR_Z =
  WET_NORTH_Z + UTIL_DEPTH - LIBRARY_CHAIR_SEAT_W - LIBRARY_CHAIR_SOUTH_SHIFT
const LIBRARY_CHAIR_Y_ROT = 45 // NW toward bookshelf

// Workstation desk — west shell wall; faces east into open living.
const DESK_WEST_X = WALL_THICK
const DESK_WEST_SOUTH_SHIFT = 9 / 12 // nudge south along west wall
const DESK_WEST_Z = COUCH_Z + (COUCH_LENGTH - DESK_WIDTH) / 2 - DESK_WEST_SOUTH_SHIFT
const DESK_WEST_CENTER_Z = DESK_WEST_Z + DESK_WIDTH / 2

// Office chair — east of workstation desk (faces west toward monitors).
const OFFICE_CHAIR_X = DESK_WEST_X + DESK_DEPTH + OFFICE_CHAIR_DESK_GAP
const OFFICE_CHAIR_Z = DESK_WEST_CENTER_Z - OFFICE_CHAIR_SEAT / 2

const SERVICE_CORE_WALL_CENTER_X = BEDROOM_EAST_X / 2 // x 15 — server + closet + bedroom
const SECTIONAL_WEST_SHIFT = 1 // nudge whole sectional west along partition
const COUCH_SERVICE_X = SERVICE_CORE_WALL_CENTER_X - SECTIONAL_MAIN_LENGTH / 2 - SECTIONAL_WEST_SHIFT
const COUCH_SERVICE_Z = SERVER_SOUTH_Z - COUCH_DEPTH
const GAP_BOOKSHELF_WIDTH = COUCH_LENGTH
const GAP_BOOKSHELF_WALL_Z = BEDROOM_WALL_Z // z 15 — bedroom float partition south face
const GAP_BOOKSHELF_Z = GAP_BOOKSHELF_WALL_Z - GAP_BOOKSHELF_DEPTH
const GAP_BOOKSHELF_EAST_SHIFT = 1 // nudge east along bedroom float wall
const GAP_BOOKSHELF_WEST_X =
  BEDROOM_WALL_X + (BEDROOM_WALL_LENGTH - GAP_BOOKSHELF_WIDTH) / 2 + GAP_BOOKSHELF_EAST_SHIFT
const COFFEE_TABLE_MAJOR = 4.5 // 54" long axis (east–west)
const COFFEE_TABLE_MINOR = 2.5 // 30" short axis (north–south)
const COFFEE_TABLE_HEIGHT = 18 / 12
const COFFEE_TABLE_COUCH_CLEARANCE = 1.5 // south of couch seat front
const COFFEE_CENTER_X = COUCH_SERVICE_X + SECTIONAL_MAIN_LENGTH / 2
const COFFEE_CENTER_Z = COUCH_SERVICE_Z - COFFEE_TABLE_COUCH_CLEARANCE - COFFEE_TABLE_MINOR / 2

// Kitchen — one-wall run on wet wall (z=15), west → east along x 40–60.
const KITCHEN_WEST_X = SERVICE_WEST_X
const KITCHEN_RUN_DEPTH = 24 / 12
const KITCHEN_RUN_Z = WET_NORTH_Z - KITCHEN_RUN_DEPTH // backed to wet wall
const KITCHEN_BASE_H = 34.5 / 12
const KITCHEN_COUNTER_THICK = 1.5 / 12
const KITCHEN_TOP_Y = KITCHEN_BASE_H + KITCHEN_COUNTER_THICK
const KITCHEN_FRIDGE_W = 36 / 12
const KITCHEN_FRIDGE_H = 70 / 12
const KITCHEN_FRIDGE_D = 30 / 12
const KITCHEN_SINK_W = 36 / 12
const KITCHEN_DW_W = 24 / 12
const KITCHEN_RANGE_W = 30 / 12
const KITCHEN_RANGE_H = KITCHEN_TOP_Y
const KITCHEN_HOOD_W = 30 / 12
const KITCHEN_HOOD_D = 20 / 12
const KITCHEN_HOOD_H = 24 / 12
const KITCHEN_HOOD_Y = 5.5 // ~66" AFF
const KITCHEN_EAST_INSET = 1.5 // island clearance from east shell
const KITCHEN_ISLAND_W = 6
const KITCHEN_ISLAND_D = 3
const KITCHEN_ISLAND_X = FOOTPRINT_WIDTH - KITCHEN_EAST_INSET - KITCHEN_ISLAND_W
const KITCHEN_ISLAND_CENTER_X = KITCHEN_ISLAND_X + KITCHEN_ISLAND_W / 2
const KITCHEN_RANGE_X = KITCHEN_ISLAND_CENTER_X - KITCHEN_RANGE_W / 2 // centered over island
const KITCHEN_ISLAND_Z = KITCHEN_RUN_Z - 3 - KITCHEN_ISLAND_D // 3' aisle south of wall run
const KITCHEN_STEEL_COLOR = '#b8bcc0'
const KITCHEN_COOKTOP_THICK = 0.25 / 12
const KITCHEN_COOKTOP_INSET = 2 / 12
const KITCHEN_BURNER_D = 7 / 12
const KITCHEN_BURNER_H = 0.125 / 12

// Open plant shelves — south glazing west + east bays, centered in each bay.
const TANK_WEST_X = 7.5 // matches 03-passive-solar / 04-water-tanks
const TANK_EAST_X = TANK_WEST_X + 30 // 37.5 — east tank west face
const TANK_EAST_END = 52.5
const TANK_WIDTH = 15 // matches 04-water-tanks
const TANK_DEPTH = 1.5
const TANK_DRAIN_WIDTH = 0.5
const TANK_EAST_CENTER_X = TANK_EAST_X + TANK_WIDTH / 2 // 45
const TANK_NORTH_DRAIN_Z = TANK_DEPTH + TANK_DRAIN_WIDTH // 2 — north edge of tank drain

// Projector — wall-mounted shelf on bedroom south partition, aimed at west tank curtain.
const PROJECTOR_SCREEN_ID = 'curtain-tank-west'
const PROJECTOR_SCREEN_CENTER_X = TANK_WEST_X + TANK_WIDTH / 2 // x 15
const PROJECTOR_SHELF_W = 2.25 // 27" shelf, enough for projector + ventilation
const PROJECTOR_SHELF_D = 1.25 // 15" projection off wall
const PROJECTOR_SHELF_THICK = 1.5 / 12
const PROJECTOR_SHELF_Y = 6.5
const PROJECTOR_SHELF_X = PROJECTOR_SCREEN_CENTER_X - PROJECTOR_SHELF_W / 2
const PROJECTOR_SHELF_Z = BEDROOM_WALL_Z - PROJECTOR_SHELF_D // mounted on south face of wall-bedroom-float
const PROJECTOR_BRACKET_W = 1.5 / 12
const PROJECTOR_BRACKET_H = 10 / 12
const PROJECTOR_BRACKET_D = 10 / 12
const PROJECTOR_W = 16 / 12
const PROJECTOR_D = 12 / 12
const PROJECTOR_H = 5 / 12
const PROJECTOR_X = PROJECTOR_SCREEN_CENTER_X - PROJECTOR_W / 2
const PROJECTOR_Z = PROJECTOR_SHELF_Z + (PROJECTOR_SHELF_D - PROJECTOR_D) / 2
const PROJECTOR_Y = PROJECTOR_SHELF_Y + PROJECTOR_SHELF_THICK
const PROJECTOR_LENS_D = 2 / 12
const PROJECTOR_LENS_W = 4 / 12
const PROJECTOR_LENS_H = 2 / 12
const PROJECTOR_LENS_X = PROJECTOR_SCREEN_CENTER_X - PROJECTOR_LENS_W / 2
const PROJECTOR_LENS_Y = PROJECTOR_Y + PROJECTOR_H * 0.45
const PROJECTOR_LENS_Z = PROJECTOR_Z - PROJECTOR_LENS_D // lens faces south, toward lower z

// Dining — rectangular table + chairs north of east tank (solar buffer).
const DINING_TABLE_LENGTH = 6 // 72" E–W, centered on tank
const DINING_TABLE_DEPTH = 3.5 // 42" N–S
const DINING_TABLE_TOP_AFF = 30 / 12
const DINING_TABLE_TOP_THICK = 1.5 / 12
const DINING_TABLE_LEG = 2.5 / 12
const DINING_CHAIR_SEAT = 18 / 12
const DINING_CHAIR_SEAT_H = 18 / 12
const DINING_CHAIR_BACK_H = 20 / 12
const DINING_CHAIR_BACK_D = 2 / 12
const DINING_CHAIR_GAP = 0.5 // clearance from table edge
const DINING_TABLE_Z =
  TANK_NORTH_DRAIN_Z + DINING_CHAIR_GAP + DINING_CHAIR_SEAT + DINING_CHAIR_GAP
const DINING_TABLE_X = TANK_EAST_CENTER_X - DINING_TABLE_LENGTH / 2
const GLAZING_SOUTH_WEST_W = TANK_WEST_X // 7.5'
const GLAZING_SOUTH_EAST_W = FOOTPRINT_WIDTH - TANK_EAST_END // 7.5'
const GLAZING_SOUTH_WEST_CENTER_X = GLAZING_SOUTH_WEST_W / 2
const GLAZING_SOUTH_EAST_CENTER_X = TANK_EAST_END + GLAZING_SOUTH_EAST_W / 2
const SOUTH_GLAZING_THICK = 0.25 // matches 03-passive-solar
const PLANT_SHELF_W = 5
const PLANT_SHELF_D = 14 / 12
const PLANT_SHELF_WEST_X = GLAZING_SOUTH_WEST_CENTER_X - PLANT_SHELF_W / 2
const PLANT_SHELF_EAST_X = GLAZING_SOUTH_EAST_CENTER_X - PLANT_SHELF_W / 2
const PLANT_SHELF_Z = SOUTH_GLAZING_THICK
const PLANT_SHELF_UPRIGHT_W = 1.5 / 12
const PLANT_SHELF_BOARD_THICK = 0.75 / 12
const PLANT_SHELF_HEIGHT = 6
const PLANT_SHELF_LEVELS_AFF = [1, 2.5, 4, 5.5] // shelf board bottoms, ft
const PLANT_POT_D = 8 / 12
const PLANT_POT_H = 7 / 12
const PLANT_SLOT_INSET = 0.35

// Entry — bench each side of door; shelf west, coat rack east (mirrored layout).
const ENTRY_DOOR_WIDTH = 3
const ENTRY_DOOR_CENTER_X = 30 // ENTRY_BAY_CENTER in 03-passive-solar
const ENTRY_DOOR_WEST_X = ENTRY_DOOR_CENTER_X - ENTRY_DOOR_WIDTH / 2 // 28.5
const ENTRY_DOOR_EAST_X = ENTRY_DOOR_CENTER_X + ENTRY_DOOR_WIDTH / 2 // 31.5
const ENTRY_SIDE_GAP = 0.5 // clearance from door jamb
const ENTRY_SET_Z = SOUTH_GLAZING_THICK
const ENTRY_SHELF_WIDTH_X = 2 // runs east–west, matching coat rack
const ENTRY_SHELF_DEPTH_Z = 14 / 12
const ENTRY_SHELF_UNIT_H = 5
const ENTRY_SHELF_UPRIGHT = 1.5 / 12
const ENTRY_SHELF_BOARD_THICK = 0.75 / 12
const ENTRY_SHELF_LEVELS_AFF = [1, 2.5, 4]
const ENTRY_RACK_WIDTH_X = 2 // hanging rod runs east–west
const ENTRY_RACK_DEPTH_Z = 14 / 12
const ENTRY_RACK_GAP_X = 0.25 // clearance from bench end and tank west face
const ENTRY_RACK_POST = 2 / 12
const ENTRY_RACK_H = 6
const ENTRY_RACK_ROD_Y = 5 + 6 / 12 // ~66" AFF hanging rod
const ENTRY_RACK_ROD_D = 1.25 / 12
const ENTRY_BENCH_W = 3
const ENTRY_BENCH_D = 16 / 12
const ENTRY_BENCH_SEAT_H = 18 / 12
const ENTRY_BENCH_SEAT_THICK = 2 / 12
const PLANT_POT_COLOR = '#b5522a'

export const MODULE_ID = '05-floor-plan'

function wallAlongX(
  id: string,
  x: number,
  z: number,
  length: number,
  label: string,
  meta?: Record<string, unknown>,
): Entity {
  return {
    id,
    layer: 'partitions',
    kind: 'wall-segment',
    position: [x, 0, z],
    size: [length, WALL_HEIGHT, WALL_THICK],
    label,
    meta: { orientation: 'x', ...meta },
  }
}

function wallAlongZ(
  id: string,
  x: number,
  z: number,
  length: number,
  label: string,
  meta?: Record<string, unknown>,
): Entity {
  return {
    id,
    layer: 'partitions',
    kind: 'wall-segment',
    position: [x, 0, z],
    size: [length, WALL_HEIGHT, WALL_THICK],
    label,
    meta: { orientation: 'z', ...meta },
  }
}

function wallAlongZBand(
  id: string,
  x: number,
  z: number,
  length: number,
  y: number,
  height: number,
  label: string,
  meta?: Record<string, unknown>,
): Entity {
  return {
    id,
    layer: 'partitions',
    kind: 'wall-segment',
    position: [x, y, z],
    size: [length, height, WALL_THICK],
    label,
    meta: { orientation: 'z', ...meta },
  }
}

function wallAlongXBand(
  id: string,
  x: number,
  z: number,
  length: number,
  y: number,
  height: number,
  label: string,
  meta?: Record<string, unknown>,
): Entity {
  return {
    id,
    layer: 'partitions',
    kind: 'wall-segment',
    position: [x, y, z],
    size: [length, height, WALL_THICK],
    label,
    meta: { orientation: 'x', ...meta },
  }
}

/** Simple desk — bamboo top + four square legs (width along +X, depth along +Z). */
function deskAgainstWall(
  idPrefix: string,
  x: number,
  z: number,
  widthAlongX: number,
  depthAlongZ: number,
  label: string,
  hostWallId: string,
): Entity[] {
  const legPositions: [string, number, number][] = [
    ['sw', x + DESK_LEG_INSET, z + DESK_LEG_INSET],
    ['se', x + widthAlongX - DESK_LEG - DESK_LEG_INSET, z + DESK_LEG_INSET],
    ['nw', x + DESK_LEG_INSET, z + depthAlongZ - DESK_LEG - DESK_LEG_INSET],
    ['ne', x + widthAlongX - DESK_LEG - DESK_LEG_INSET, z + depthAlongZ - DESK_LEG - DESK_LEG_INSET],
  ]

  return [
    {
      id: `${idPrefix}-top`,
      layer: 'annotations',
      kind: 'box',
      position: [x, DESK_LEG_HEIGHT, z],
      size: [widthAlongX, DESK_TOP_THICK, depthAlongZ],
      label: `${label} — bamboo top`,
      meta: {
        role: 'furniture',
        material: 'bamboo',
        color: '#c9a86c',
        sizeIn: '72 × 32',
        hostWallId,
        note: 'Centered on server/closet/bedroom south partitions; faces south into open living',
      },
    },
    ...legPositions.map(([corner, legX, legZ]) => ({
      id: `${idPrefix}-leg-${corner}`,
      layer: 'annotations' as const,
      kind: 'box' as const,
      position: [legX, 0, legZ],
      size: [DESK_LEG, DESK_LEG_HEIGHT, DESK_LEG] as [number, number, number],
      label: `${label} — leg ${corner.toUpperCase()}`,
      meta: {
        role: 'furniture',
        material: 'wood',
        color: '#8b7355',
        hostWallId,
      },
    })),
  ]
}

/** Simple desk — bamboo top + four square legs (width along +Z, depth along +X); back to west wall. */
function deskAgainstWestWall(
  idPrefix: string,
  x: number,
  z: number,
  widthAlongZ: number,
  depthAlongX: number,
  label: string,
  hostWallId: string,
  note = 'West wall; back to shell, faces east into open living',
): Entity[] {
  const legPositions: [string, number, number][] = [
    ['sw', x + DESK_LEG_INSET, z + DESK_LEG_INSET],
    ['se', x + depthAlongX - DESK_LEG - DESK_LEG_INSET, z + DESK_LEG_INSET],
    ['nw', x + DESK_LEG_INSET, z + widthAlongZ - DESK_LEG - DESK_LEG_INSET],
    ['ne', x + depthAlongX - DESK_LEG - DESK_LEG_INSET, z + widthAlongZ - DESK_LEG - DESK_LEG_INSET],
  ]

  return [
    {
      id: `${idPrefix}-top`,
      layer: 'annotations',
      kind: 'box',
      position: [x, DESK_LEG_HEIGHT, z],
      size: [depthAlongX, DESK_TOP_THICK, widthAlongZ],
      label: `${label} — bamboo top`,
      meta: {
        role: 'furniture',
        material: 'bamboo',
        color: '#c9a86c',
        sizeIn: '72 × 32',
        hostWallId,
        note,
      },
    },
    ...legPositions.map(([corner, legX, legZ]) => ({
      id: `${idPrefix}-leg-${corner}`,
      layer: 'annotations' as const,
      kind: 'box' as const,
      position: [legX, 0, legZ],
      size: [DESK_LEG, DESK_LEG_HEIGHT, DESK_LEG] as [number, number, number],
      label: `${label} — leg ${corner.toUpperCase()}`,
      meta: {
        role: 'furniture',
        material: 'wood',
        color: '#8b7355',
        hostWallId,
      },
    })),
  ]
}

function furnBox(
  id: string,
  position: [number, number, number],
  size: [number, number, number],
  label: string,
  meta: Record<string, unknown>,
  rotation?: [number, number, number],
): Entity {
  return {
    id,
    layer: 'annotations',
    kind: 'box',
    position,
    size,
    label,
    ...(rotation ? { rotation } : {}),
    meta: { role: 'furniture', ...meta },
  }
}

/** Queen bed — mattress + headboard; head against south partition, width along +X. */
function queenBedHeadSouth(idPrefix: string, label: string): Entity[] {
  const meta = {
    material: 'bedding',
    room: 'bedroom',
    sizeIn: '60 × 80 queen',
    note: 'Head against south partition; centered in bedroom nook',
  }

  return [
    furnBox(
      `${idPrefix}-frame`,
      [BED_X, 0, BED_Z],
      [QUEEN_WIDTH, BED_FRAME_HEIGHT, QUEEN_LENGTH],
      `${label} — frame`,
      { ...meta, material: 'wood', color: '#6b5344' },
    ),
    furnBox(
      `${idPrefix}-mattress`,
      [BED_X, BED_FRAME_HEIGHT, BED_Z],
      [QUEEN_WIDTH, BED_MATTRESS_THICK, QUEEN_LENGTH],
      `${label} — mattress`,
      { ...meta, color: '#e8e4dc' },
    ),
    furnBox(
      `${idPrefix}-headboard`,
      [BED_X, BED_FRAME_HEIGHT, BED_HEADBOARD_Z],
      [QUEEN_WIDTH, BED_HEADBOARD_HEIGHT, BED_HEADBOARD_THICK],
      `${label} — headboard`,
      { ...meta, material: 'upholstery', color: '#4a5568' },
    ),
  ]
}

/** Pair of nightstands flanking the queen bed at the headboard. */
function bedroomNightstands(idPrefix: string): Entity[] {
  const meta = {
    material: 'wood',
    color: '#6b5344',
    room: 'bedroom',
    sizeIn: '20 × 16',
    note: 'Flanking queen bed at south headboard',
  }

  return [
    furnBox(
      `${idPrefix}-west`,
      [NIGHTSTAND_WEST_X, 0, NIGHTSTAND_Z],
      [NIGHTSTAND_WIDTH, NIGHTSTAND_HEIGHT, NIGHTSTAND_DEPTH],
      'Nightstand — west',
      meta,
    ),
    furnBox(
      `${idPrefix}-east`,
      [NIGHTSTAND_EAST_X, 0, NIGHTSTAND_Z],
      [NIGHTSTAND_WIDTH, NIGHTSTAND_HEIGHT, NIGHTSTAND_DEPTH],
      'Nightstand — east',
      meta,
    ),
  ]
}

/** Seat slab + backrest slab — width along +Z, depth along +X, back against west wall. */
function couchAgainstWestWall(
  idPrefix: string,
  x: number,
  z: number,
  lengthAlongZ: number,
  seatDepth: number,
  label: string,
  hostWallId: string,
): Entity[] {
  const meta = {
    material: 'upholstery',
    color: '#4a5568',
    hostWallId,
    note: '8\' along west wall; faces east into open living',
  }

  return [
    furnBox(
      `${idPrefix}-seat`,
      [x, 0, z],
      [seatDepth, COUCH_SEAT_HEIGHT, lengthAlongZ],
      `${label} — seat`,
      { ...meta, sizeIn: '96 × 36 seat' },
    ),
    furnBox(
      `${idPrefix}-back`,
      [x, COUCH_SEAT_HEIGHT, z],
      [COUCH_BACK_DEPTH, COUCH_BACK_HEIGHT, lengthAlongZ],
      `${label} — backrest`,
      { ...meta, sizeIn: '96 × 18 back' },
    ),
  ]
}

/** L sectional — main run on south partition; return leg on west end extends south. */
function sectionalLWest(
  idPrefix: string,
  x: number,
  z: number,
  mainLength: number,
  returnLength: number,
  seatDepth: number,
  label: string,
  hostWallId: string,
): Entity[] {
  const meta = {
    material: 'upholstery',
    color: '#4a5568',
    hostWallId,
    note: 'Large L sectional; main faces south; west return extends into living room',
  }

  return [
    furnBox(
      `${idPrefix}-main-seat`,
      [x, 0, z],
      [mainLength, COUCH_SEAT_HEIGHT, seatDepth],
      `${label} — main seat`,
      { ...meta, sizeIn: `${mainLength}' × 36 main seat` },
    ),
    furnBox(
      `${idPrefix}-main-back`,
      [x, COUCH_SEAT_HEIGHT, z + seatDepth - COUCH_BACK_DEPTH],
      [mainLength, COUCH_BACK_HEIGHT, COUCH_BACK_DEPTH],
      `${label} — main backrest`,
      { ...meta, sizeIn: `${mainLength}' × 18 main back` },
    ),
    furnBox(
      `${idPrefix}-return-seat`,
      [x, 0, z - returnLength],
      [seatDepth, COUCH_SEAT_HEIGHT, returnLength],
      `${label} — west return seat`,
      { ...meta, sizeIn: `36 × ${returnLength}' return seat` },
    ),
    furnBox(
      `${idPrefix}-return-back`,
      [x, COUCH_SEAT_HEIGHT, z - returnLength],
      [COUCH_BACK_DEPTH, COUCH_BACK_HEIGHT, returnLength],
      `${label} — west return backrest`,
      { ...meta, sizeIn: `18 × ${returnLength}' return back` },
    ),
    furnBox(
      `${idPrefix}-corner-back`,
      [x, COUCH_SEAT_HEIGHT, z],
      [COUCH_BACK_DEPTH, COUCH_BACK_HEIGHT, seatDepth - COUCH_BACK_DEPTH],
      `${label} — corner backrest`,
      { ...meta, sizeIn: '18 × 22 corner back' },
    ),
  ]
}

/** Simple chair — seat and back only; assembled and rotated toward the bookshelf. */
function libraryReadingChair(): Entity[] {
  const z = LIBRARY_CHAIR_Z
  const backEastX = UTIL_WEST_X - LIBRARY_CHAIR_WALL_GAP
  const seatX = backEastX - LIBRARY_CHAIR_SEAT_D
  const backHeight = COUCH_SEAT_HEIGHT + COUCH_BACK_HEIGHT
  const assemblyMeta = {
    material: 'upholstery',
    color: '#3d4f3a',
    hostWallId: 'wall-util-west',
    room: 'living',
    purpose: 'seating',
    note: 'Near utility west wall; angled NW toward bookshelf',
    assemblyPivot: [backEastX, 0, z] as [number, number, number],
    assemblyYaw: LIBRARY_CHAIR_Y_ROT,
  }

  return [
    {
      ...furnBox(
        'furn-library-chair-seat',
        [seatX, 0, z],
        [LIBRARY_CHAIR_SEAT_D, COUCH_SEAT_HEIGHT, LIBRARY_CHAIR_SEAT_W],
        'Reading chair — seat',
        { ...assemblyMeta, sizeIn: '30 × 30 seat' },
      ),
      assemblyId: 'furn-library-chair',
    },
    {
      ...furnBox(
        'furn-library-chair-back',
        [backEastX - COUCH_BACK_DEPTH, 0, z],
        [COUCH_BACK_DEPTH, backHeight, LIBRARY_CHAIR_SEAT_W],
        'Reading chair — backrest',
        { ...assemblyMeta, sizeIn: '30 × 18 back' },
      ),
      assemblyId: 'furn-library-chair',
    },
  ]
}

/** Dining chair — seat + back; axis-aligned to face the table. */
function diningChair(
  id: string,
  seatX: number,
  seatZ: number,
  facing: 'north' | 'south' | 'east' | 'west',
  label: string,
  meta: Record<string, unknown>,
): Entity[] {
  const backH = DINING_CHAIR_SEAT_H + DINING_CHAIR_BACK_H
  const seatDepth = DINING_CHAIR_SEAT - DINING_CHAIR_BACK_D

  switch (facing) {
    case 'north': // sits north of table; back to north (+Z)
      return [
        furnBox(
          `${id}-seat`,
          [seatX, 0, seatZ],
          [DINING_CHAIR_SEAT, DINING_CHAIR_SEAT_H, seatDepth],
          `${label} — seat`,
          meta,
        ),
        furnBox(
          `${id}-back`,
          [seatX, 0, seatZ + seatDepth],
          [DINING_CHAIR_SEAT, backH, DINING_CHAIR_BACK_D],
          `${label} — back`,
          meta,
        ),
      ]
    case 'south': // sits south of table; back to south (tank side)
      return [
        furnBox(
          `${id}-seat`,
          [seatX, 0, seatZ + DINING_CHAIR_BACK_D],
          [DINING_CHAIR_SEAT, DINING_CHAIR_SEAT_H, seatDepth],
          `${label} — seat`,
          meta,
        ),
        furnBox(
          `${id}-back`,
          [seatX, 0, seatZ],
          [DINING_CHAIR_SEAT, backH, DINING_CHAIR_BACK_D],
          `${label} — back`,
          meta,
        ),
      ]
    case 'east': // sits east of table; back to east (+X)
      return [
        furnBox(
          `${id}-seat`,
          [seatX, 0, seatZ],
          [seatDepth, DINING_CHAIR_SEAT_H, DINING_CHAIR_SEAT],
          `${label} — seat`,
          meta,
        ),
        furnBox(
          `${id}-back`,
          [seatX + seatDepth, 0, seatZ],
          [DINING_CHAIR_BACK_D, backH, DINING_CHAIR_SEAT],
          `${label} — back`,
          meta,
        ),
      ]
    case 'west': // sits west of table; back to west (-X)
      return [
        furnBox(
          `${id}-seat`,
          [seatX + DINING_CHAIR_BACK_D, 0, seatZ],
          [seatDepth, DINING_CHAIR_SEAT_H, DINING_CHAIR_SEAT],
          `${label} — seat`,
          meta,
        ),
        furnBox(
          `${id}-back`,
          [seatX, 0, seatZ],
          [DINING_CHAIR_BACK_D, backH, DINING_CHAIR_SEAT],
          `${label} — back`,
          meta,
        ),
      ]
  }
}

/** Rectangular dining table — top slab + four legs. */
function diningTable(
  idPrefix: string,
  x: number,
  z: number,
  lengthX: number,
  depthZ: number,
  label: string,
  meta: Record<string, unknown>,
): Entity[] {
  const topY = DINING_TABLE_TOP_AFF - DINING_TABLE_TOP_THICK
  const legH = topY
  const legInset = DINING_TABLE_LEG * 2
  const legMeta = { ...meta, sizeIn: '72 × 42 top' }

  const legPositions: [string, number, number][] = [
    ['sw', x + legInset, z + legInset],
    ['se', x + lengthX - legInset - DINING_TABLE_LEG, z + legInset],
    ['nw', x + legInset, z + depthZ - legInset - DINING_TABLE_LEG],
    ['ne', x + lengthX - legInset - DINING_TABLE_LEG, z + depthZ - legInset - DINING_TABLE_LEG],
  ]

  return [
    furnBox(
      `${idPrefix}-top`,
      [x, topY, z],
      [lengthX, DINING_TABLE_TOP_THICK, depthZ],
      `${label} — top`,
      legMeta,
    ),
    ...legPositions.map(([corner, lx, lz]) =>
      furnBox(
        `${idPrefix}-leg-${corner}`,
        [lx, 0, lz],
        [DINING_TABLE_LEG, legH, DINING_TABLE_LEG],
        `${label} — leg ${corner}`,
        legMeta,
      ),
    ),
  ]
}

/** Six-seat dining set north of the east water tank. */
function diningSetEastTank(): Entity[] {
  const tableX = DINING_TABLE_X
  const tableZ = DINING_TABLE_Z
  const tableMeta = {
    material: 'wood',
    color: '#5c4033',
    hostWallId: 'tank-east',
    room: 'living',
    purpose: 'dining',
    note: 'North of east tank; faces into open living',
  }
  const chairMeta = {
    material: 'wood',
    color: '#4a3728',
    hostWallId: 'tank-east',
    room: 'living',
    purpose: 'dining',
    sizeIn: '18 × 18 seat',
  }

  const southChairZ = TANK_NORTH_DRAIN_Z + DINING_CHAIR_GAP
  const northChairZ = tableZ + DINING_TABLE_DEPTH + DINING_CHAIR_GAP
  const westChairX = tableX - DINING_CHAIR_GAP - DINING_CHAIR_SEAT
  const eastChairX = tableX + DINING_TABLE_LENGTH + DINING_CHAIR_GAP

  const southChairs = [0, 1].flatMap((i) => {
    const seatX = tableX + (DINING_TABLE_LENGTH / 3) * (i + 0.5) - DINING_CHAIR_SEAT / 2
    return diningChair(
      `furn-dining-east-chair-s${i + 1}`,
      seatX,
      southChairZ,
      'south',
      `Dining chair — south ${i + 1}`,
      chairMeta,
    )
  })
  const northChairs = [0, 1].flatMap((i) => {
    const seatX = tableX + (DINING_TABLE_LENGTH / 3) * (i + 0.5) - DINING_CHAIR_SEAT / 2
    return diningChair(
      `furn-dining-east-chair-n${i + 1}`,
      seatX,
      northChairZ,
      'north',
      `Dining chair — north ${i + 1}`,
      chairMeta,
    )
  })
  const endChairZ = tableZ + DINING_TABLE_DEPTH / 2 - DINING_CHAIR_SEAT / 2

  return [
    ...diningTable(
      'furn-dining-east-table',
      tableX,
      tableZ,
      DINING_TABLE_LENGTH,
      DINING_TABLE_DEPTH,
      'Dining table — east tank',
      tableMeta,
    ),
    ...southChairs,
    ...northChairs,
    ...diningChair(
      'furn-dining-east-chair-w',
      westChairX,
      endChairZ,
      'west',
      'Dining chair — west end',
      chairMeta,
    ),
    ...diningChair(
      'furn-dining-east-chair-e',
      eastChairX,
      endChairZ,
      'east',
      'Dining chair — east end',
      chairMeta,
    ),
  ]
}

/** Oval coffee table — pill shape from three box slabs (caps + center). */
function ovalCoffeeTable(
  idPrefix: string,
  centerX: number,
  centerZ: number,
  majorAlongX: number,
  minorAlongZ: number,
  height: number,
  label: string,
): Entity[] {
  const capMajor = majorAlongX * 0.22
  const midMajor = majorAlongX - 2 * capMajor
  const capMinor = minorAlongZ * 0.78
  const meta = {
    material: 'wood',
    color: '#5c4033',
    shape: 'oval',
    sizeIn: '54 × 30',
    note: 'Pill approximation; centered in front of service couch',
  }

  const westCapX = centerX - majorAlongX / 2
  const midX = centerX - midMajor / 2
  const eastCapX = centerX + majorAlongX / 2 - capMajor
  const midZ = centerZ - minorAlongZ / 2
  const capZ = centerZ - capMinor / 2

  return [
    furnBox(
      `${idPrefix}-cap-west`,
      [westCapX, 0, capZ],
      [capMajor, height, capMinor],
      `${label} — west cap`,
      meta,
    ),
    furnBox(
      `${idPrefix}-mid`,
      [midX, 0, midZ],
      [midMajor, height, minorAlongZ],
      `${label} — center`,
      meta,
    ),
    furnBox(
      `${idPrefix}-cap-east`,
      [eastCapX, 0, capZ],
      [capMajor, height, capMinor],
      `${label} — east cap`,
      meta,
    ),
  ]
}

/** Wall shelf and projector aimed south at the white west tank curtain. */
function projectorShelfWestTank(): Entity[] {
  const hostWallId = 'wall-bedroom-float'
  const shelfMeta = {
    material: 'wood',
    color: '#6b5344',
    hostWallId,
    room: 'living',
    purpose: 'projector',
    targetScreenId: PROJECTOR_SCREEN_ID,
    note: 'Wall-mounted shelf on bedroom south partition; centered on west tank curtain',
  }
  const bracketXs = [
    PROJECTOR_SHELF_X + 0.35,
    PROJECTOR_SHELF_X + PROJECTOR_SHELF_W - 0.35 - PROJECTOR_BRACKET_W,
  ]

  return [
    furnBox(
      'furn-projector-shelf-board',
      [PROJECTOR_SHELF_X, PROJECTOR_SHELF_Y, PROJECTOR_SHELF_Z],
      [PROJECTOR_SHELF_W, PROJECTOR_SHELF_THICK, PROJECTOR_SHELF_D],
      'Projector shelf — wall mounted',
      shelfMeta,
    ),
    ...bracketXs.map((x, i) =>
      furnBox(
        `furn-projector-shelf-bracket-${i + 1}`,
        [x, PROJECTOR_SHELF_Y - PROJECTOR_BRACKET_H, BEDROOM_WALL_Z - PROJECTOR_BRACKET_D],
        [PROJECTOR_BRACKET_W, PROJECTOR_BRACKET_H, PROJECTOR_BRACKET_D],
        `Projector shelf — bracket ${i + 1}`,
        { ...shelfMeta, material: 'steel', color: '#2f2f2f' },
      ),
    ),
    furnBox(
      'equip-projector-body',
      [PROJECTOR_X, PROJECTOR_Y, PROJECTOR_Z],
      [PROJECTOR_W, PROJECTOR_H, PROJECTOR_D],
      'Projector — aimed at west tank curtain',
      {
        role: 'equipment',
        material: 'plastic',
        color: '#2a2a2a',
        hostWallId,
        on: 'furn-projector-shelf-board',
        targetScreenId: PROJECTOR_SCREEN_ID,
        facing: 'south',
        note: 'Uses the white interior face of curtain-tank-west as the projection screen',
      },
    ),
    furnBox(
      'equip-projector-lens',
      [PROJECTOR_LENS_X, PROJECTOR_LENS_Y, PROJECTOR_LENS_Z],
      [PROJECTOR_LENS_W, PROJECTOR_LENS_H, PROJECTOR_LENS_D],
      'Projector lens — south-facing',
      {
        role: 'equipment',
        material: 'glass',
        color: '#111111',
        hostWallId,
        partOf: 'equip-projector-body',
        targetScreenId: PROJECTOR_SCREEN_ID,
      },
    ),
  ]
}

/** Office chair — east of west-wall desk, facing west toward workstation. */
function officeChairFacingDesk(idPrefix: string, label: string): Entity[] {
  const meta = {
    material: 'upholstery',
    color: '#2d3748',
    room: 'living',
    purpose: 'seating',
    sizeIn: '22 × 22',
    note: 'East of workstation desk on west wall; faces west',
  }
  const seatDepth = OFFICE_CHAIR_SEAT - OFFICE_CHAIR_BACK_D
  const backH = OFFICE_CHAIR_SEAT_H + OFFICE_CHAIR_BACK_H

  return [
    furnBox(
      `${idPrefix}-seat`,
      [OFFICE_CHAIR_X, 0, OFFICE_CHAIR_Z],
      [seatDepth, OFFICE_CHAIR_SEAT_H, OFFICE_CHAIR_SEAT],
      `${label} — seat`,
      meta,
    ),
    furnBox(
      `${idPrefix}-back`,
      [OFFICE_CHAIR_X + seatDepth, 0, OFFICE_CHAIR_Z],
      [OFFICE_CHAIR_BACK_D, backH, OFFICE_CHAIR_SEAT],
      `${label} — backrest`,
      meta,
    ),
  ]
}

/** Monitor riser, dual screens, desk pad, keyboard, and mouse on the west-wall workstation. */
function deskWorkstation(idPrefix: string): Entity[] {
  const standX = DESK_WEST_X
  const standZ = DESK_WEST_CENTER_Z - STAND_LENGTH / 2

  const monitorY = DESK_SURFACE_Y + STAND_HEIGHT
  const monitorPairWidth = MONITOR_WIDTH * 2 + MONITOR_GAP
  const monitorLeftZ = DESK_WEST_CENTER_Z - monitorPairWidth / 2
  const monitorRightZ = monitorLeftZ + MONITOR_WIDTH + MONITOR_GAP
  const monitorX = standX + STAND_DEPTH - MONITOR_DEPTH

  const padX = DESK_WEST_X + DESK_DEPTH - PAD_DEPTH - 0.15
  const padZ = DESK_WEST_CENTER_Z - PAD_WIDTH / 2

  const keyboardX = padX + PAD_DEPTH - KEYBOARD_DEPTH - 2 / 12
  const keyboardZ = padZ + PAD_WIDTH - KEYBOARD_WIDTH - 2 / 12

  const mouseX = keyboardX + KEYBOARD_DEPTH + 3 / 12
  const mouseZ = keyboardZ + (KEYBOARD_WIDTH - MOUSE_DEPTH) / 2

  return [
    furnBox(
      `${idPrefix}-monitor-stand`,
      [standX, DESK_SURFACE_Y, standZ],
      [STAND_DEPTH, STAND_HEIGHT, STAND_LENGTH],
      'Dual monitor riser — bamboo',
      {
        material: 'bamboo',
        color: '#c9a86c',
        sizeCm: '100 × 23 × 11',
        onDesk: 'furn-desk-server-top',
      },
    ),
    furnBox(
      `${idPrefix}-monitor-left`,
      [monitorX, monitorY, monitorLeftZ],
      [MONITOR_DEPTH, MONITOR_HEIGHT, MONITOR_WIDTH],
      'Monitor — left (24")',
      { material: 'display', color: '#1a1a1a', sizeIn: '24"' },
    ),
    furnBox(
      `${idPrefix}-monitor-right`,
      [monitorX, monitorY, monitorRightZ],
      [MONITOR_DEPTH, MONITOR_HEIGHT, MONITOR_WIDTH],
      'Monitor — right (24")',
      { material: 'display', color: '#1a1a1a', sizeIn: '24"' },
    ),
    furnBox(
      `${idPrefix}-desk-pad`,
      [padX, DESK_SURFACE_Y, padZ],
      [PAD_DEPTH, PAD_THICK, PAD_WIDTH],
      'Desk pad — black',
      { material: 'felt', color: '#1c1c1c', sizeIn: '30 × 16' },
    ),
    furnBox(
      `${idPrefix}-keyboard`,
      [keyboardX, DESK_SURFACE_Y + PAD_THICK, keyboardZ],
      [KEYBOARD_DEPTH, KEYBOARD_HEIGHT, KEYBOARD_WIDTH],
      'Keyboard — full size',
      { material: 'plastic', color: '#6b1a1a', sizeIn: '17.5 × 6' },
    ),
    furnBox(
      `${idPrefix}-mouse`,
      [mouseX, DESK_SURFACE_Y + PAD_THICK, mouseZ],
      [MOUSE_DEPTH, MOUSE_HEIGHT, MOUSE_WIDTH],
      'Mouse',
      { material: 'plastic', color: '#6b1a1a' },
    ),
  ]
}

function kitchenBase(
  id: string,
  x: number,
  width: number,
  height: number,
  depth: number,
  z: number,
  label: string,
  meta: Record<string, unknown>,
): Entity {
  return furnBox(
    id,
    [x, 0, z],
    [width, height, depth],
    label,
    { role: 'kitchen', hostWallId: 'wall-wet-south', ...meta },
  )
}

function kitchenCounterTop(
  id: string,
  x: number,
  width: number,
  label: string,
  meta: Record<string, unknown> = {},
): Entity {
  return furnBox(
    id,
    [x, KITCHEN_TOP_Y - KITCHEN_COUNTER_THICK, KITCHEN_RUN_Z],
    [width, KITCHEN_COUNTER_THICK, KITCHEN_RUN_DEPTH],
    label,
    {
      role: 'kitchen',
      material: 'stone',
      color: '#c8c2b8',
      hostWallId: 'wall-wet-south',
      ...meta,
    },
  )
}

/** Glass cooktop + four burners on the range. */
function kitchenStovetop(rangeX: number): Entity[] {
  const cooktopW = KITCHEN_RANGE_W - 2 * KITCHEN_COOKTOP_INSET
  const cooktopD = KITCHEN_RUN_DEPTH - 2 * KITCHEN_COOKTOP_INSET
  const cooktopX = rangeX + KITCHEN_COOKTOP_INSET
  const cooktopZ = KITCHEN_RUN_Z + KITCHEN_COOKTOP_INSET
  const cooktopY = KITCHEN_TOP_Y

  const cooktopMeta = {
    role: 'kitchen',
    appliance: 'cooktop',
    material: 'glass',
    color: '#1e1e1e',
    hostWallId: 'wall-wet-south',
    on: 'furn-kitchen-range',
  }
  const burnerMeta = {
    role: 'kitchen',
    fixture: 'burner',
    material: 'cast-iron',
    color: '#3d3d3d',
    hostWallId: 'wall-wet-south',
  }

  const burnerInsetX = cooktopW * 0.22
  const burnerInsetZ = cooktopD * 0.22
  const burnerPositions: [string, number, number][] = [
    ['sw', cooktopX + burnerInsetX, cooktopZ + burnerInsetZ],
    ['se', cooktopX + cooktopW - burnerInsetX - KITCHEN_BURNER_D, cooktopZ + burnerInsetZ],
    ['nw', cooktopX + burnerInsetX, cooktopZ + cooktopD - burnerInsetZ - KITCHEN_BURNER_D],
    ['ne', cooktopX + cooktopW - burnerInsetX - KITCHEN_BURNER_D, cooktopZ + cooktopD - burnerInsetZ - KITCHEN_BURNER_D],
  ]

  return [
    furnBox(
      'furn-kitchen-cooktop',
      [cooktopX, cooktopY, cooktopZ],
      [cooktopW, KITCHEN_COOKTOP_THICK, cooktopD],
      'Cooktop surface',
      cooktopMeta,
    ),
    ...burnerPositions.map(([id, bx, bz]) =>
      furnBox(
        `furn-kitchen-burner-${id}`,
        [bx, cooktopY + KITCHEN_COOKTOP_THICK, bz],
        [KITCHEN_BURNER_D, KITCHEN_BURNER_H, KITCHEN_BURNER_D],
        `Burner — ${id}`,
        burnerMeta,
      ),
    ),
  ]
}

/** Wet-wall kitchen run — fridge, counters, sink, DW, range + hood at east end. No uppers. */
function kitchenWetWallRun(): Entity[] {
  const cabMeta = { material: 'cabinet', color: '#d9d0c3' }
  let x = KITCHEN_WEST_X

  const fridgeX = x
  x += KITCHEN_FRIDGE_W

  const counterWestW = 1.5
  const counterWestX = x
  x += counterWestW

  const sinkX = x
  x += KITCHEN_SINK_W

  const dwX = x
  x += KITCHEN_DW_W

  const rangeX = KITCHEN_RANGE_X
  const counterMidX = x
  const counterMidW = rangeX - x
  const counterEastX = rangeX + KITCHEN_RANGE_W
  const counterEastW = FOOTPRINT_WIDTH - counterEastX

  const hoodX = rangeX + (KITCHEN_RANGE_W - KITCHEN_HOOD_W) / 2

  return [
    kitchenBase(
      'furn-kitchen-fridge',
      fridgeX,
      KITCHEN_FRIDGE_W,
      KITCHEN_FRIDGE_H,
      KITCHEN_FRIDGE_D,
      WET_NORTH_Z - KITCHEN_FRIDGE_D,
      'Refrigerator',
      { appliance: 'fridge', material: 'stainless', color: '#b8bcc0', sizeIn: '36 × 30' },
    ),
    kitchenBase(
      'furn-kitchen-base-west',
      counterWestX,
      counterWestW,
      KITCHEN_BASE_H,
      KITCHEN_RUN_DEPTH,
      KITCHEN_RUN_Z,
      'Base cabinet — west run',
      cabMeta,
    ),
    kitchenCounterTop('furn-kitchen-counter-west', counterWestX, counterWestW, 'Counter — west of sink'),
    kitchenBase(
      'furn-kitchen-sink-base',
      sinkX,
      KITCHEN_SINK_W,
      KITCHEN_BASE_H,
      KITCHEN_RUN_DEPTH,
      KITCHEN_RUN_Z,
      'Sink base',
      { ...cabMeta, fixture: 'sink', sizeIn: '36' },
    ),
    kitchenCounterTop('furn-kitchen-counter-sink', sinkX, KITCHEN_SINK_W, 'Counter — sink', {
      fixture: 'sink',
    }),
    kitchenBase(
      'furn-kitchen-dishwasher',
      dwX,
      KITCHEN_DW_W,
      KITCHEN_BASE_H,
      KITCHEN_RUN_DEPTH,
      KITCHEN_RUN_Z,
      'Dishwasher',
      { appliance: 'dishwasher', material: 'stainless', color: '#aeb4ba', sizeIn: '24' },
    ),
    kitchenCounterTop('furn-kitchen-counter-dw', dwX, KITCHEN_DW_W, 'Counter — over dishwasher'),
    kitchenBase(
      'furn-kitchen-base-mid',
      counterMidX,
      counterMidW,
      KITCHEN_BASE_H,
      KITCHEN_RUN_DEPTH,
      KITCHEN_RUN_Z,
      'Base cabinet — between DW and range',
      cabMeta,
    ),
    kitchenCounterTop('furn-kitchen-counter-mid', counterMidX, counterMidW, 'Counter — mid run'),
    kitchenBase(
      'furn-kitchen-range',
      rangeX,
      KITCHEN_RANGE_W,
      KITCHEN_RANGE_H,
      KITCHEN_RUN_DEPTH,
      KITCHEN_RUN_Z,
      'Range / oven',
      { appliance: 'range', material: 'enamel', color: '#2a2a2a', sizeIn: '30' },
    ),
    ...kitchenStovetop(rangeX),
    kitchenCounterTop('furn-kitchen-counter-range', rangeX, KITCHEN_RANGE_W, 'Counter — range cutout', {
      fixture: 'range',
    }),
    furnBox(
      'furn-kitchen-hood',
      [hoodX, KITCHEN_HOOD_Y, KITCHEN_RUN_Z + (KITCHEN_RUN_DEPTH - KITCHEN_HOOD_D) / 2],
      [KITCHEN_HOOD_W, KITCHEN_HOOD_H, KITCHEN_HOOD_D],
      'Range hood',
      {
        role: 'kitchen',
        appliance: 'hood',
        material: 'stainless',
        color: KITCHEN_STEEL_COLOR,
        hostWallId: 'wall-wet-south',
        over: 'furn-kitchen-range',
        sizeIn: '30',
      },
    ),
    kitchenBase(
      'furn-kitchen-base-east',
      counterEastX,
      counterEastW,
      KITCHEN_BASE_H,
      KITCHEN_RUN_DEPTH,
      KITCHEN_RUN_Z,
      'Base cabinet — east end',
      cabMeta,
    ),
    kitchenCounterTop(
      'furn-kitchen-counter-east',
      counterEastX,
      counterEastW,
      'Counter — east end',
    ),
  ]
}

/** Island — east side, inset from shell; 3' aisle from wet-wall run. */
function kitchenIsland(): Entity[] {
  const islandMeta = {
    role: 'kitchen',
    material: 'stainless',
    color: KITCHEN_STEEL_COLOR,
    sizeIn: '72 × 36',
    note: '6\' × 3\' stainless island; prep south of east range, 1.5\' off east wall',
  }
  return [
    furnBox(
      'furn-kitchen-island-base',
      [KITCHEN_ISLAND_X, 0, KITCHEN_ISLAND_Z],
      [KITCHEN_ISLAND_W, KITCHEN_BASE_H, KITCHEN_ISLAND_D],
      'Island base',
      islandMeta,
    ),
    furnBox(
      'furn-kitchen-island-top',
      [KITCHEN_ISLAND_X, KITCHEN_TOP_Y - KITCHEN_COUNTER_THICK, KITCHEN_ISLAND_Z],
      [KITCHEN_ISLAND_W, KITCHEN_COUNTER_THICK, KITCHEN_ISLAND_D],
      'Island top',
      islandMeta,
    ),
  ]
}

type FoodPlantSpec = {
  id: string
  label: string
  species: string
  foliageH: number
  foliageColor: string
  fruitColor?: string
}

const FOOD_PLANTS_BY_SHELF: FoodPlantSpec[][] = [
  [
    { id: 'basil', label: 'Basil', species: 'ocimum-basilicum', foliageH: 0.45, foliageColor: '#3d7a3a' },
    { id: 'cilantro', label: 'Cilantro', species: 'coriandrum-sativum', foliageH: 0.4, foliageColor: '#4e8f45' },
    { id: 'lettuce', label: 'Lettuce', species: 'lactuca-sativa', foliageH: 0.35, foliageColor: '#6daf5c' },
  ],
  [
    {
      id: 'pepper-bell-red',
      label: 'Bell pepper — red',
      species: 'capsicum-annuum',
      foliageH: 0.85,
      foliageColor: '#3d6b35',
      fruitColor: '#c0392b',
    },
    {
      id: 'pepper-bell-yellow',
      label: 'Bell pepper — yellow',
      species: 'capsicum-annuum',
      foliageH: 0.8,
      foliageColor: '#3d6b35',
      fruitColor: '#d4ac0d',
    },
    {
      id: 'pepper-jalapeno',
      label: 'Jalapeño',
      species: 'capsicum-annuum',
      foliageH: 0.7,
      foliageColor: '#3a6334',
      fruitColor: '#2d6a31',
    },
  ],
  [
    {
      id: 'tomato',
      label: 'Tomato',
      species: 'solanum-lycopersicum',
      foliageH: 1.1,
      foliageColor: '#2d5a27',
      fruitColor: '#c0392b',
    },
    {
      id: 'tomato-cherry',
      label: 'Cherry tomato',
      species: 'solanum-lycopersicum',
      foliageH: 0.75,
      foliageColor: '#326b2c',
      fruitColor: '#e74c3c',
    },
    {
      id: 'tomato-2',
      label: 'Tomato',
      species: 'solanum-lycopersicum',
      foliageH: 1,
      foliageColor: '#2d5a27',
      fruitColor: '#c0392b',
    },
  ],
  [
    {
      id: 'pepper-shishito',
      label: 'Shishito pepper',
      species: 'capsicum-annuum',
      foliageH: 0.75,
      foliageColor: '#3d6b35',
      fruitColor: '#6aaf4e',
    },
    {
      id: 'pepper-habanero',
      label: 'Habanero',
      species: 'capsicum-chinense',
      foliageH: 0.65,
      foliageColor: '#3a6334',
      fruitColor: '#e67e22',
    },
    {
      id: 'basil-2',
      label: 'Basil',
      species: 'ocimum-basilicum',
      foliageH: 0.4,
      foliageColor: '#3d7a3a',
    },
  ],
]

function pottedFoodPlant(
  id: string,
  x: number,
  shelfY: number,
  plant: FoodPlantSpec,
  hostWallId: string,
): Entity[] {
  const potZ = PLANT_SHELF_Z + (PLANT_SHELF_D - PLANT_POT_D) / 2
  const shelfTopY = shelfY + PLANT_SHELF_BOARD_THICK
  const foliageW = PLANT_POT_D * 1.45
  const foliageD = PLANT_POT_D * 1.25
  const foliageX = x - (foliageW - PLANT_POT_D) / 2
  const foliageZ = potZ - (foliageD - PLANT_POT_D) / 2
  const foliageY = shelfTopY + PLANT_POT_H
  const plantMeta = {
    role: 'furniture',
    purpose: 'plants',
    hostWallId,
    species: plant.species,
  }

  const entities: Entity[] = [
    furnBox(
      `${id}-pot`,
      [x, shelfTopY, potZ],
      [PLANT_POT_D, PLANT_POT_H, PLANT_POT_D],
      `${plant.label} — pot`,
      { ...plantMeta, material: 'terracotta', color: PLANT_POT_COLOR },
    ),
    furnBox(
      `${id}-foliage`,
      [foliageX, foliageY, foliageZ],
      [foliageW, plant.foliageH, foliageD],
      plant.label,
      { ...plantMeta, material: 'foliage', color: plant.foliageColor },
    ),
  ]

  if (plant.fruitColor) {
    const fruitD = PLANT_POT_D * 0.35
    entities.push(
      furnBox(
        `${id}-fruit`,
        [x + PLANT_POT_D * 0.15, foliageY + plant.foliageH * 0.35, potZ + PLANT_POT_D * 0.2],
        [fruitD, fruitD, fruitD],
        `${plant.label} — fruit`,
        { ...plantMeta, material: 'produce', color: plant.fruitColor },
      ),
    )
  }

  return entities
}

function plantShelfSlots(shelfSpanW: number, shelfX: number): number[] {
  const count = 3
  const innerW = shelfSpanW - 2 * PLANT_SLOT_INSET
  const step = innerW / count
  return Array.from(
    { length: count },
    (_, i) => shelfX + PLANT_SLOT_INSET + step * i + step / 2 - PLANT_POT_D / 2,
  )
}

function foodPlantsOnShelves(
  idPrefix: string,
  shelfSpanW: number,
  shelfX: number,
  hostWallId: string,
): Entity[] {
  return PLANT_SHELF_LEVELS_AFF.flatMap((shelfY, level) => {
    const slots = plantShelfSlots(shelfSpanW, shelfX)
    const plants = FOOD_PLANTS_BY_SHELF[level]
    return plants.flatMap((plant, slot) =>
      pottedFoodPlant(
        `${idPrefix}-l${level + 1}-${plant.id}`,
        slots[slot],
        shelfY,
        plant,
        hostWallId,
      ),
    )
  })
}

function plantShelfUnit(
  idPrefix: string,
  hostWallId: string,
  shelfX: number,
  note: string,
): Entity[] {
  const woodMeta = {
    role: 'furniture',
    material: 'wood',
    color: '#a08060',
    hostWallId,
    purpose: 'plants',
    note,
  }
  const shelfSpanW = PLANT_SHELF_W - 2 * PLANT_SHELF_UPRIGHT_W
  const boardX = shelfX + PLANT_SHELF_UPRIGHT_W

  const uprights: [string, number][] = [
    ['west', shelfX],
    ['east', shelfX + PLANT_SHELF_W - PLANT_SHELF_UPRIGHT_W],
  ]

  return [
    ...uprights.map(([side, ux]) =>
      furnBox(
        `${idPrefix}-upright-${side}`,
        [ux, 0, PLANT_SHELF_Z],
        [PLANT_SHELF_UPRIGHT_W, PLANT_SHELF_HEIGHT, PLANT_SHELF_D],
        `Plant shelf upright — ${side}`,
        woodMeta,
      ),
    ),
    ...PLANT_SHELF_LEVELS_AFF.map((y, i) =>
      furnBox(
        `${idPrefix}-board-${i + 1}`,
        [boardX, y, PLANT_SHELF_Z],
        [shelfSpanW, PLANT_SHELF_BOARD_THICK, PLANT_SHELF_D],
        `Plant shelf — level ${i + 1}`,
        woodMeta,
      ),
    ),
    ...foodPlantsOnShelves(idPrefix, shelfSpanW, boardX, hostWallId),
  ]
}

/** Matching plant shelves on southwest and southeast glazing bays. */
function plantShelvesSouthGlazing(): Entity[] {
  return [
    ...plantShelfUnit(
      'furn-plant-shelf-west',
      'glazing-south-west',
      PLANT_SHELF_WEST_X,
      'Open shelves centered on south glass west bay',
    ),
    ...plantShelfUnit(
      'furn-plant-shelf-east',
      'glazing-south-east',
      PLANT_SHELF_EAST_X,
      'Open shelves centered on south glass east bay; beside kitchen island',
    ),
  ]
}

function bookStacksOnShelf(
  idPrefix: string,
  shelfY: number,
  shelfIndex: number,
  innerX: number,
  innerSpanX: number,
  hostWallId: string,
): Entity[] {
  const shelfTop = shelfY + GAP_BOOKSHELF_BOARD
  const nextShelfY =
    GAP_BOOKSHELF_LEVELS_AFF[shelfIndex + 1] ?? WALL_HEIGHT - GAP_BOOKSHELF_BOARD
  const maxBookH = nextShelfY - shelfTop - 1 / 12

  const stackCount = Math.floor(innerSpanX / BOOK_STACK_ALONG_SHELF)
  const step = innerSpanX / stackCount

  return Array.from({ length: stackCount }, (_, i) => {
    const bookH = Math.min(maxBookH, (8 + ((i + shelfIndex) % 3) * 0.75) / 12)
    const stackX = innerX + step * i + (step - BOOK_STACK_ALONG_SHELF) / 2
    return furnBox(
      `${idPrefix}-s${shelfIndex + 1}-b${i + 1}`,
      [
        stackX,
        shelfTop,
        GAP_BOOKSHELF_Z + (GAP_BOOKSHELF_DEPTH - BOOK_STACK_SPINE_DEPTH) / 2,
      ],
      [BOOK_STACK_ALONG_SHELF, bookH, BOOK_STACK_SPINE_DEPTH],
      `Bookshelf — books shelf ${shelfIndex + 1} stack ${i + 1}`,
      {
        material: 'books',
        color: BOOK_SPINE_COLORS[(i + shelfIndex * 3) % BOOK_SPINE_COLORS.length],
        hostWallId,
        room: 'living',
      },
    )
  })
}

/** Floor-to-ceiling bookshelf on bedroom south partition — living room side. */
function gapBookshelfBedroomFloat(): Entity[] {
  const idPrefix = 'furn-gap-bookshelf'
  const hostWallId = 'wall-bedroom-float'
  const x = GAP_BOOKSHELF_WEST_X
  const woodMeta = {
    material: 'wood',
    color: '#6b5344',
    hostWallId,
    room: 'living',
    purpose: 'storage',
    note: 'Bedroom south partition, living room side; centered on bedroom float wall; faces south',
  }
  const innerX = x + GAP_BOOKSHELF_UPRIGHT
  const innerSpanX = GAP_BOOKSHELF_WIDTH - 2 * GAP_BOOKSHELF_UPRIGHT

  const uprights: [string, number][] = [
    ['west', x],
    ['east', x + GAP_BOOKSHELF_WIDTH - GAP_BOOKSHELF_UPRIGHT],
  ]

  return [
    ...uprights.map(([side, ux]) =>
      furnBox(
        `${idPrefix}-upright-${side}`,
        [ux, 0, GAP_BOOKSHELF_Z],
        [GAP_BOOKSHELF_UPRIGHT, WALL_HEIGHT, GAP_BOOKSHELF_DEPTH],
        `Gap bookshelf — upright ${side}`,
        woodMeta,
      ),
    ),
    furnBox(
      `${idPrefix}-back`,
      [innerX, 0, GAP_BOOKSHELF_WALL_Z - 0.75 / 12],
      [innerSpanX, WALL_HEIGHT, 0.75 / 12],
      'Gap bookshelf — back panel',
      { ...woodMeta, color: '#5a4638' },
    ),
    ...GAP_BOOKSHELF_LEVELS_AFF.map((shelfY, i) =>
      furnBox(
        `${idPrefix}-board-${i + 1}`,
        [innerX, shelfY, GAP_BOOKSHELF_Z],
        [innerSpanX, GAP_BOOKSHELF_BOARD, GAP_BOOKSHELF_DEPTH],
        `Gap bookshelf — shelf ${i + 1}`,
        woodMeta,
      ),
    ),
    ...GAP_BOOKSHELF_LEVELS_AFF.flatMap((shelfY, shelfIndex) =>
      bookStacksOnShelf(idPrefix, shelfY, shelfIndex, innerX, innerSpanX, hostWallId),
    ),
  ]
}

/** Open shelf unit — east–west in gap between west bench and tank, facing glazing. */
function entryShelfWest(westBenchX: number): Entity[] {
  const idPrefix = 'furn-entry-west'
  const shelfX = westBenchX - ENTRY_RACK_GAP_X - ENTRY_SHELF_WIDTH_X
  const shelfZ = ENTRY_SET_Z
  const hostWallId = 'tank-west'
  const woodMeta = {
    role: 'furniture',
    material: 'wood',
    color: '#8b7355',
    hostWallId,
    purpose: 'entry',
    note: 'Open shelves between west bench and tank; faces south glazing',
  }
  const boardSpanX = ENTRY_SHELF_WIDTH_X - 2 * ENTRY_SHELF_UPRIGHT
  const boardSpanZ = ENTRY_SHELF_DEPTH_Z - 2 * ENTRY_SHELF_UPRIGHT
  const boardX = shelfX + ENTRY_SHELF_UPRIGHT
  const boardZ = shelfZ + ENTRY_SHELF_UPRIGHT

  const uprights: [string, number, number][] = [
    ['sw', shelfX, shelfZ],
    ['se', shelfX + ENTRY_SHELF_WIDTH_X - ENTRY_SHELF_UPRIGHT, shelfZ],
    ['nw', shelfX, shelfZ + ENTRY_SHELF_DEPTH_Z - ENTRY_SHELF_UPRIGHT],
    ['ne', shelfX + ENTRY_SHELF_WIDTH_X - ENTRY_SHELF_UPRIGHT, shelfZ + ENTRY_SHELF_DEPTH_Z - ENTRY_SHELF_UPRIGHT],
  ]

  return [
    ...uprights.map(([corner, ux, uz]) =>
      furnBox(
        `${idPrefix}-shelf-upright-${corner}`,
        [ux, 0, uz],
        [ENTRY_SHELF_UPRIGHT, ENTRY_SHELF_UNIT_H, ENTRY_SHELF_UPRIGHT],
        `Entry shelf upright — ${corner}`,
        woodMeta,
      ),
    ),
    ...ENTRY_SHELF_LEVELS_AFF.map((y, i) =>
      furnBox(
        `${idPrefix}-shelf-board-${i + 1}`,
        [boardX, y, boardZ],
        [boardSpanX, ENTRY_SHELF_BOARD_THICK, boardSpanZ],
        `Entry shelf — level ${i + 1}`,
        woodMeta,
      ),
    ),
  ]
}

/** Floor-standing coat rack — rod east–west in gap between bench and east tank. */
function entryHangingRackEast(eastBenchX: number): Entity[] {
  const idPrefix = 'furn-entry-east'
  const rackX = eastBenchX + ENTRY_BENCH_W + ENTRY_RACK_GAP_X
  const rackZ = ENTRY_SET_Z // aligned with benches; x span clears east tank (starts x 37.5)
  const meta = {
    role: 'furniture',
    material: 'metal',
    color: '#3a3a3a',
    hostWallId: 'tank-east',
    purpose: 'entry',
    note: 'Coat rack between bench and east tank; rod runs east–west',
  }

  return [
    furnBox(
      `${idPrefix}-rack-post-w`,
      [rackX, 0, rackZ],
      [ENTRY_RACK_POST, ENTRY_RACK_H, ENTRY_RACK_POST],
      'Entry coat rack — post west',
      meta,
    ),
    furnBox(
      `${idPrefix}-rack-post-e`,
      [rackX + ENTRY_RACK_WIDTH_X - ENTRY_RACK_POST, 0, rackZ],
      [ENTRY_RACK_POST, ENTRY_RACK_H, ENTRY_RACK_POST],
      'Entry coat rack — post east',
      meta,
    ),
    furnBox(
      `${idPrefix}-rack-rod`,
      [rackX + ENTRY_RACK_POST / 2, ENTRY_RACK_ROD_Y, rackZ + ENTRY_RACK_POST / 2],
      [ENTRY_RACK_WIDTH_X - ENTRY_RACK_POST, ENTRY_RACK_ROD_D, ENTRY_RACK_POST * 2],
      'Entry coat rack — hanging rod',
      { ...meta, material: 'metal', color: '#2a2a2a' },
    ),
    furnBox(
      `${idPrefix}-rack-base`,
      [rackX, 0, rackZ],
      [ENTRY_RACK_WIDTH_X, 0.5 / 12, ENTRY_RACK_DEPTH_Z],
      'Entry coat rack — base',
      meta,
    ),
  ]
}

function entryBench(idPrefix: string, benchX: number): Entity[] {
  const woodMeta = {
    role: 'furniture',
    material: 'wood',
    color: '#8b7355',
    hostWallId: 'glazing-south-entry',
    purpose: 'entry',
    sizeIn: '36 × 16',
  }

  return [
    furnBox(
      `${idPrefix}-bench-seat`,
      [benchX, ENTRY_BENCH_SEAT_H, ENTRY_SET_Z],
      [ENTRY_BENCH_W, ENTRY_BENCH_SEAT_THICK, ENTRY_BENCH_D],
      'Entry bench — seat',
      woodMeta,
    ),
    furnBox(
      `${idPrefix}-bench-leg-w`,
      [benchX, 0, ENTRY_SET_Z],
      [2 / 12, ENTRY_BENCH_SEAT_H, ENTRY_BENCH_D],
      'Entry bench — leg west',
      woodMeta,
    ),
    furnBox(
      `${idPrefix}-bench-leg-e`,
      [benchX + ENTRY_BENCH_W - 2 / 12, 0, ENTRY_SET_Z],
      [2 / 12, ENTRY_BENCH_SEAT_H, ENTRY_BENCH_D],
      'Entry bench — leg east',
      woodMeta,
    ),
  ]
}

/** West: shelf on tank + bench. East: bench + floor coat rack on tank. */
function entryFurniture(): Entity[] {
  const westBenchX = ENTRY_DOOR_WEST_X - ENTRY_SIDE_GAP - ENTRY_BENCH_W
  const eastBenchX = ENTRY_DOOR_EAST_X + ENTRY_SIDE_GAP

  return [
    ...entryShelfWest(westBenchX),
    ...entryBench('furn-entry-west', westBenchX),
    ...entryBench('furn-entry-east', eastBenchX),
    ...entryHangingRackEast(eastBenchX),
  ]
}

export function getSpecEntities(): Entity[] {
  return [
    {
      id: 'zone-server-room',
      layer: 'zones',
      kind: 'zone',
      position: [0, 0, SERVER_SOUTH_Z],
      size: [SERVER_WIDTH, WALL_HEIGHT, SERVER_DEPTH],
      label: 'Server room',
      meta: {
        color: '#6a5acd',
        opacity: 0.28,
        room: 'server-room',
        note:
          'House electrical (west wall); 2× 42U racks; dedicated mini-split',
      },
    },
    {
      id: 'zone-closet-south',
      layer: 'zones',
      kind: 'zone',
      position: [SERVER_EAST_X, 0, SERVER_SOUTH_Z],
      size: [CLOSET_WIDTH, WALL_HEIGHT, CLOSET_HALF_DEPTH],
      label: 'Closet — south (server room access)',
      meta: {
        color: '#9b8bb8',
        opacity: 0.24,
        room: 'closet',
        note: '6\'×5\' south half; door from server room on wall-server-east',
      },
    },
    {
      id: 'zone-closet-north',
      layer: 'zones',
      kind: 'zone',
      position: [SERVER_EAST_X, 0, CLOSET_SPLIT_Z],
      size: [CLOSET_WIDTH, WALL_HEIGHT, CLOSET_HALF_DEPTH],
      label: 'Closet — north (living access)',
      meta: {
        color: '#8a7aa8',
        opacity: 0.24,
        room: 'closet',
        note: '6\'×5\' north half; door east into open living / bedroom',
      },
    },
    {
      id: 'zone-bedroom',
      layer: 'zones',
      kind: 'zone',
      position: [BEDROOM_WALL_X, 0, BEDROOM_WALL_Z],
      size: [BEDROOM_WALL_LENGTH, WALL_HEIGHT, CLOSET_DEPTH],
      label: 'Bedroom nook',
      meta: {
        color: '#b8a0c8',
        opacity: 0.2,
        room: 'bedroom',
        note: 'East of closet; south wall-bedroom-float; east wall-bedroom-east-* with barn door',
      },
    },
    {
      id: 'zone-kitchen',
      layer: 'zones',
      kind: 'zone',
      position: [SERVICE_WEST_X, 0, SERVICE_SOUTH_Z],
      size: [SERVICE_WIDTH, WALL_HEIGHT, KITCHEN_DEPTH],
      label: 'Kitchen',
      meta: {
        color: '#e8a838',
        opacity: 0.25,
        room: 'kitchen',
        note: 'One-wall run on wet wall (z=15); no upper cabinets yet',
      },
    },
    {
      id: 'zone-utility',
      layer: 'zones',
      kind: 'zone',
      position: [UTIL_WEST_X, 0, WET_NORTH_Z],
      size: [UTIL_WIDTH, WALL_HEIGHT, UTIL_DEPTH],
      label: 'Utility / laundry',
      meta: { color: '#8fbc8f', opacity: 0.25, room: 'utility' },
    },
    {
      id: 'zone-hallway',
      layer: 'zones',
      kind: 'zone',
      position: [SERVICE_WEST_X, 0, HALL_SOUTH_Z],
      size: [HALL_WIDTH, WALL_HEIGHT, HALL_DEPTH],
      label: 'Hallway',
      meta: {
        color: '#c9b896',
        opacity: 0.22,
        room: 'hallway',
        note: '5\' deep; runs to bath partition (x 40–52)',
      },
    },
    {
      id: 'zone-bathroom',
      layer: 'zones',
      kind: 'zone',
      position: [BATH_WEST_X, 0, WET_NORTH_Z],
      size: [BATH_WIDTH, WALL_HEIGHT, BATH_DEPTH],
      label: 'Bathroom',
      meta: { color: '#5b9bd5', opacity: 0.25, room: 'bathroom' },
    },
    wallAlongX(
      'wall-server-south-west',
      0,
      SERVER_SOUTH_Z,
      SERVER_DOOR_X,
      'Server room / open living (west of door)',
      { room: 'server-room', faces: 'south' },
    ),
    wallAlongXBand(
      'wall-server-south-lintel',
      SERVER_DOOR_X,
      SERVER_SOUTH_Z,
      SERVER_DOOR_WIDTH,
      SERVER_DOOR_HEIGHT,
      SERVER_DOOR_LINTEL_HEIGHT,
      'Server room / open living (door lintel)',
      { room: 'server-room', faces: 'south', note: 'Header above server room door opening' },
    ),
    wallAlongX(
      'wall-server-south-east',
      SERVER_DOOR_EAST_X,
      SERVER_SOUTH_Z,
      SERVER_WIDTH - SERVER_DOOR_EAST_X,
      'Server room / open living (east of door)',
      { room: 'server-room', faces: 'south' },
    ),
    wallAlongZ(
      'wall-server-east-south',
      SERVER_EAST_X,
      SERVER_SOUTH_Z,
      CLOSET_SOUTH_DOOR_Z - SERVER_SOUTH_Z,
      'Server room / closet (south of south door)',
      { room: 'server-room', sharedWith: 'closet' },
    ),
    wallAlongZBand(
      'wall-server-east-south-lintel',
      SERVER_EAST_X,
      CLOSET_SOUTH_DOOR_Z,
      CLOSET_DOOR_WIDTH,
      CLOSET_DOOR_HEIGHT,
      CLOSET_DOOR_LINTEL_HEIGHT,
      'Server room / closet (south door lintel)',
      {
        room: 'server-room',
        sharedWith: 'closet',
        note: 'Header above south closet door opening from server room',
      },
    ),
    wallAlongZ(
      'wall-server-east-mid',
      SERVER_EAST_X,
      CLOSET_SOUTH_DOOR_NORTH_Z,
      CLOSET_SPLIT_Z - CLOSET_SOUTH_DOOR_NORTH_Z,
      'Server room / closet (between south door and split)',
      { room: 'server-room', sharedWith: 'closet' },
    ),
    wallAlongZ(
      'wall-server-east-north',
      SERVER_EAST_X,
      CLOSET_SPLIT_Z,
      CLOSET_HALF_DEPTH,
      'Server room / closet (north half)',
      { room: 'server-room', sharedWith: 'closet' },
    ),
    wallAlongX(
      'wall-closet-south',
      SERVER_EAST_X,
      SERVER_SOUTH_Z,
      CLOSET_WIDTH,
      'Closet south partition',
      { room: 'closet', faces: 'south' },
    ),
    wallAlongX(
      'wall-closet-divider',
      SERVER_EAST_X,
      CLOSET_SPLIT_Z,
      CLOSET_WIDTH,
      'Closet north / south split',
      { room: 'closet', faces: 'south' },
    ),
    wallAlongZ(
      'wall-closet-east-south',
      CLOSET_EAST_X,
      SERVER_SOUTH_Z,
      CLOSET_HALF_DEPTH,
      'Closet east partition (south half)',
      { room: 'closet', faces: 'east' },
    ),
    wallAlongZ(
      'wall-closet-east-north-lower',
      CLOSET_EAST_X,
      CLOSET_SPLIT_Z,
      CLOSET_NORTH_DOOR_Z - CLOSET_SPLIT_Z,
      'Closet east partition (north half, below door)',
      { room: 'closet', faces: 'east' },
    ),
    wallAlongZBand(
      'wall-closet-east-north-lintel',
      CLOSET_EAST_X,
      CLOSET_NORTH_DOOR_Z,
      CLOSET_DOOR_WIDTH,
      CLOSET_DOOR_HEIGHT,
      CLOSET_DOOR_LINTEL_HEIGHT,
      'Closet east partition (north door lintel)',
      {
        room: 'closet',
        faces: 'east',
        note: 'Header above north closet door opening into open living',
      },
    ),
    wallAlongZ(
      'wall-closet-east-north-upper',
      CLOSET_EAST_X,
      CLOSET_NORTH_DOOR_NORTH_Z,
      SERVER_SOUTH_Z + CLOSET_DEPTH - CLOSET_NORTH_DOOR_NORTH_Z,
      'Closet east partition (north half, above door)',
      { room: 'closet', faces: 'east' },
    ),
    wallAlongX(
      'wall-bedroom-float',
      BEDROOM_WALL_X,
      BEDROOM_WALL_Z,
      BEDROOM_WALL_LENGTH,
      'Bedroom — floating partition',
      {
        role: 'floating',
        room: 'bedroom',
        faces: 'south',
        note: 'East-west wall projecting from closet southeast corner; separates bedroom nook',
      },
    ),
    wallAlongZ(
      'wall-bedroom-east-south',
      BEDROOM_EAST_X,
      BEDROOM_WALL_Z,
      BEDROOM_BARN_Z - BEDROOM_WALL_Z,
      'Bedroom nook — east partition (south of door)',
      {
        role: 'floating',
        room: 'bedroom',
        faces: 'east',
        note: 'Solid wall below door travel pocket',
      },
    ),
    wallAlongZBand(
      'wall-bedroom-east-lintel',
      BEDROOM_EAST_X,
      BEDROOM_BARN_Z,
      BEDROOM_BARN_WIDTH,
      BEDROOM_BARN_HEIGHT,
      BEDROOM_BARN_LINTEL_HEIGHT,
      'Bedroom nook — east partition (door lintel)',
      {
        role: 'floating',
        room: 'bedroom',
        faces: 'east',
        note: 'Header above barn door opening',
      },
    ),
    ...(BEDROOM_BARN_NORTH_STUB_LENGTH > 0
      ? [
          wallAlongZ(
            'wall-bedroom-east-north',
            BEDROOM_EAST_X,
            BEDROOM_BARN_NORTH_Z,
            BEDROOM_BARN_NORTH_STUB_LENGTH,
            'Bedroom nook — east partition (north of door)',
            {
              role: 'floating',
              room: 'bedroom',
              faces: 'east',
              note: 'Short north stub above door opening',
            },
          ),
        ]
      : []),
    {
      id: 'hardware-bedroom-barn-rail-upper',
      layer: 'partitions',
      kind: 'box',
      position: [BEDROOM_BARN_FACE_X, BEDROOM_BARN_HEIGHT + 0.25, BEDROOM_BARN_RAIL_Z],
      size: [0.12, 0.12, BEDROOM_BARN_RAIL_LENGTH],
      label: 'Bedroom barn door — upper rail',
      meta: {
        color: '#2f2f2f',
        hostWallId: 'wall-bedroom-east-lintel',
        room: 'bedroom',
        note: '8\' rail above opening and south travel pocket',
      },
    },
    {
      id: 'hardware-bedroom-barn-rail-floor-guide',
      layer: 'partitions',
      kind: 'box',
      position: [BEDROOM_BARN_FACE_X, 0.05, BEDROOM_BARN_RAIL_Z],
      size: [0.08, 0.08, BEDROOM_BARN_RAIL_LENGTH],
      label: 'Bedroom barn door — floor guide',
      meta: {
        color: '#2f2f2f',
        hostWallId: 'wall-bedroom-east-lintel',
        room: 'bedroom',
        note: 'Floor guide follows the same north-south travel path',
      },
    },
    {
      id: 'panel-bedroom-barn-door-open',
      layer: 'partitions',
      kind: 'box',
      position: [BEDROOM_BARN_FACE_X + 0.02, 0, BEDROOM_BARN_OPEN_Z],
      size: [0.18, BEDROOM_BARN_HEIGHT, BEDROOM_BARN_WIDTH],
      label: 'Bedroom barn door panel — open south',
      meta: {
        color: '#8b5a2b',
        hostWallId: 'wall-bedroom-east-lintel',
        room: 'bedroom',
        doorType: 'barn-sliding',
        note: 'Shown slid south of the opening along the east wall',
      },
    },
    wallAlongX(
      'wall-wet-south',
      SERVICE_WEST_X,
      WET_NORTH_Z,
      SERVICE_WIDTH,
      'Wet wall — utility + bathroom (south face)',
      {
        role: 'wet-wall',
        serves: ['bathroom', 'utility', 'kitchen'],
        faces: 'south',
      },
    ),
    wallAlongX(
      'wall-hall-south',
      UTIL_WEST_X,
      HALL_SOUTH_Z,
      UTIL_WIDTH,
      'Hall / utility',
      { room: 'hallway' },
    ),
    wallAlongZ(
      'wall-util-west',
      UTIL_WEST_X,
      WET_NORTH_Z,
      UTIL_DEPTH,
      'Utility west partition',
      { room: 'utility' },
    ),
    wallAlongZ(
      'wall-bath-west',
      BATH_WEST_X,
      WET_NORTH_Z,
      BATH_DEPTH,
      'Bathroom / hall+utility',
      { room: 'bathroom' },
    ),
    {
      id: 'opening-closet-south-door',
      layer: 'partitions',
      kind: 'opening',
      position: [SERVER_EAST_X, 0, CLOSET_SOUTH_DOOR_Z],
      size: [WALL_THICK + 0.05, CLOSET_DOOR_HEIGHT, CLOSET_DOOR_WIDTH],
      label: 'South closet door — from server room',
      meta: {
        hostWallId: 'wall-server-east-south-lintel',
        swing: 'west',
        room: 'closet',
        opacity: 0.08,
        note: 'South half (z 15–20); shown open into server room',
      },
    },
    {
      id: 'panel-closet-south-door-open',
      layer: 'partitions',
      kind: 'box',
      position: [SERVER_EAST_X - CLOSET_DOOR_WIDTH, 0, CLOSET_SOUTH_DOOR_Z],
      size: [CLOSET_DOOR_WIDTH, CLOSET_DOOR_HEIGHT, CLOSET_DOOR_THICK],
      label: 'South closet door panel — open into server room',
      meta: {
        color: '#6b4423',
        hostWallId: 'wall-server-east-south-lintel',
        room: 'closet',
        doorType: 'solid',
        swing: 'west',
        note: 'Shown open 90 degrees into server room, hinged at south jamb',
      },
    },
    {
      id: 'opening-closet-north-door',
      layer: 'partitions',
      kind: 'opening',
      position: [CLOSET_EAST_X, 0, CLOSET_NORTH_DOOR_Z],
      size: [WALL_THICK + 0.05, CLOSET_DOOR_HEIGHT, CLOSET_DOOR_WIDTH],
      label: 'North closet door — into open living',
      meta: {
        hostWallId: 'wall-closet-east-north-lintel',
        swing: 'east',
        room: 'closet',
        opacity: 0.08,
        note: 'North half (z 20–25); shown open east with panel at north jamb',
      },
    },
    {
      id: 'panel-closet-north-door-open',
      layer: 'partitions',
      kind: 'box',
      position: [CLOSET_EAST_X, 0, CLOSET_NORTH_DOOR_NORTH_Z - CLOSET_DOOR_THICK],
      size: [CLOSET_DOOR_WIDTH, CLOSET_DOOR_HEIGHT, CLOSET_DOOR_THICK],
      label: 'North closet door panel — open toward north wall',
      meta: {
        color: '#6b4423',
        hostWallId: 'wall-closet-east-north-lintel',
        room: 'closet',
        doorType: 'solid',
        swing: 'east',
        note: 'Shown open east into living, hinged at north jamb toward north wall',
      },
    },
    {
      id: 'opening-server-door',
      layer: 'partitions',
      kind: 'opening',
      position: [SERVER_DOOR_X, 0, SERVER_SOUTH_Z],
      size: [SERVER_DOOR_WIDTH, SERVER_DOOR_HEIGHT, WALL_THICK + 0.05],
      label: 'Server room door — solid, lockable',
      meta: {
        hostWallId: 'wall-server-south-lintel',
        swing: 'south',
        room: 'server-room',
        doorType: 'solid',
        opacity: 0.08,
        note: '3\' opening near west end; door shown open outward into living room',
      },
    },
    {
      id: 'panel-server-door-open',
      layer: 'partitions',
      kind: 'box',
      position: [SERVER_DOOR_X, 0, SERVER_SOUTH_Z - SERVER_DOOR_WIDTH],
      size: [SERVER_DOOR_THICK, SERVER_DOOR_HEIGHT, SERVER_DOOR_WIDTH],
      label: 'Server room door panel — open outward',
      meta: {
        color: '#6b4423',
        hostWallId: 'wall-server-south-lintel',
        room: 'server-room',
        doorType: 'solid',
        swing: 'south',
        note: 'Shown open 90 degrees into open living, hinged at west jamb',
      },
    },
    ...deskAgainstWestWall(
      'furn-desk-server',
      DESK_WEST_X,
      DESK_WEST_Z,
      DESK_WIDTH,
      DESK_DEPTH,
      'Desk — west wall workstation',
      'wall-west',
    ),
    ...deskWorkstation('furn-desk-server'),
    ...officeChairFacingDesk('furn-office-chair-desk', 'Office chair — workstation'),
    ...queenBedHeadSouth('furn-bed-bedroom', 'Bed — queen'),
    ...bedroomNightstands('furn-nightstand-bedroom'),
    ...gapBookshelfBedroomFloat(),
    ...libraryReadingChair(),
    ...diningSetEastTank(),
    ...sectionalLWest(
      'furn-couch-service',
      COUCH_SERVICE_X,
      COUCH_SERVICE_Z,
      SECTIONAL_MAIN_LENGTH,
      SECTIONAL_RETURN_LENGTH,
      COUCH_DEPTH,
      'Sectional — service core partition',
      'wall-bedroom-float',
    ),
    ...ovalCoffeeTable(
      'furn-coffee-table',
      COFFEE_CENTER_X,
      COFFEE_CENTER_Z,
      COFFEE_TABLE_MAJOR,
      COFFEE_TABLE_MINOR,
      COFFEE_TABLE_HEIGHT,
      'Coffee table — large oval',
    ),
    ...projectorShelfWestTank(),
    ...kitchenWetWallRun(),
    ...kitchenIsland(),
    ...plantShelvesSouthGlazing(),
    ...entryFurniture(),
    {
      id: 'opening-bath-door',
      layer: 'partitions',
      kind: 'opening',
      position: [BATH_WEST_X, 0, BATH_DOOR_Z],
      size: [WALL_THICK + 0.05, BATH_DOOR_HEIGHT, BATH_DOOR_WIDTH],
      label: 'Bathroom door — swings west into hall',
      meta: {
        hostWallId: 'wall-bath-west',
        swing: 'west',
        room: 'bathroom',
        note: 'In hall band (z 20–25); bath west face',
      },
    },
    {
      id: 'opening-util-barn-doors',
      layer: 'partitions',
      kind: 'opening',
      position: [UTIL_BARN_X, 0, HALL_SOUTH_Z],
      size: [UTIL_BARN_WIDTH, UTIL_BARN_HEIGHT, WALL_THICK + 0.05],
      label: 'Utility — barn sliding doors from hall',
      meta: {
        hostWallId: 'wall-hall-south',
        doorType: 'barn-sliding',
        swing: 'sliding',
        room: 'utility',
        note: '6\' opening; centered in 12\' utility width',
      },
    },
    {
      id: 'opening-bedroom-barn-door',
      layer: 'partitions',
      kind: 'opening',
      position: [BEDROOM_EAST_X, 0, BEDROOM_BARN_Z],
      size: [WALL_THICK + 0.05, BEDROOM_BARN_HEIGHT, BEDROOM_BARN_WIDTH],
      label: 'Bedroom nook — barn sliding door',
      meta: {
        hostWallId: 'wall-bedroom-east-lintel',
        doorType: 'barn-sliding',
        swing: 'sliding',
        room: 'bedroom',
        color: '#aad4ff',
        opacity: 0.15,
        note: '4\' single door near north end; slides south along rail to open',
      },
    },
  ]
}
