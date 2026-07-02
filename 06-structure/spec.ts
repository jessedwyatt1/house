import type { Entity } from '../viewer/model/schema.ts'

/**
 * Foundation — slab-on-grade with north berm, south flush with grade.
 *
 * Convention (schema.ts): origin = SW corner of slab top, Y = 0 = finish floor
 * and exterior grade at the south building line. +X east, +Z north, feet.
 *
 * Site slope (01-site/spec.ts): ~12% rise → north grade ~3' above south at the
 * 25' building depth. The north stem wall (`stem-north`) retains that berm.
 *
 * Tank pads (`slab-tank-*`) carry two 15' × 18" tanks, one centered on each
 * 30' half of the south wall (04-water-tanks). Pads are widened 6" past the
 * interior sides to support the perimeter drain channels.
 *
 * Roof assembly: exposed 2×12 ceiling purlins (`purlin-*`) on perimeter headers,
 * ~4' o.c., 4.5' S cantilever + 25' + 2' N eave (no E/W overhang); 3/4" plywood
 * structural deck + air barrier (`roof-deck`) on purlin tops; rigid polyiso outsulation
 * (`roof-insulation`) above deck; synthetic underlayment (`roof-underlayment`) on
 * insulation. Standing seam steel (`roof-steel`) on underlayment. Cavity insulation
 * (`roof-bay-fill-*`) between purlins; rake/eave closures protect the assembly edges.
 */

const FOOTPRINT_WIDTH = 60 // E–W, south glass wall
const FOOTPRINT_DEPTH = 25 // N–S

// Match 01-site: grade rise across building depth.
const SLOPE_PCT = 0.12
const GRADE_RISE_NORTH = FOOTPRINT_DEPTH * SLOPE_PCT // 3'

const SLAB_THICK = 0.5 // 6" general slab
const TANK_PAD_EXTRA = 0.5 // +6" under tanks → 12" total
const SOUTH_EDGE_DEPTH = 2 // thickened strip runs 2' in from south wall
const SOUTH_EDGE_EXTRA = 0.5 // +6" under south edge → 12" total

const TANK_WIDTH = 15
const TANK_DEPTH = 1.5 // 18" into building from glass line
// One tank centered on each 30' half of the south wall (04-water-tanks):
// tank west spans x 7.5–22.5, tank east spans x 37.5–52.5. Pads are widened
// 6" past each interior side to carry the perimeter drain channels.
const DRAIN_WIDTH = 0.5
const TANK_WEST_X = 7.5
const TANK_EAST_X = 37.5
const PAD_WEST_X = TANK_WEST_X - DRAIN_WIDTH // 7.0
const PAD_EAST_X = TANK_EAST_X - DRAIN_WIDTH // 37.0
const PAD_WIDTH = TANK_WIDTH + DRAIN_WIDTH * 2 // 16'
const PAD_DEPTH = TANK_DEPTH + DRAIN_WIDTH // covers north drain run
const PAD_WEST_END = PAD_WEST_X + PAD_WIDTH // 23.0
const PAD_EAST_END = PAD_EAST_X + PAD_WIDTH // 53.0

const STEM_WALL_THICK = 1
const STEM_FOOTING_DEPTH = 2 // below slab bottom
const STEM_FOOTING_WIDTH = 2 // spread width north of stem (exterior)

// South facade frame — matches 03-passive-solar / 04-water-tanks bay layout.
const SOUTH_EAVE = 10 // ft
const NORTH_WALL_HEIGHT = 12 // ft — matches 02-envelope north wall
const WALL_THICK = 0.5 // match envelope wall thickness
const POST_SIZE = 0.5 // 6" column
const HEADER_DEPTH = 0.5
const HEADER_HEIGHT = 0.5

/** Post x positions at bay boundaries (corners + mullions between glass/tank/door bays). */
const SOUTH_POST_X = [0, 7.5, 22.5, 37.5, 52.5, FOOTPRINT_WIDTH - POST_SIZE] as const

// Roof — exposed ceiling purlins (bottom layer of assembly; deck/insulation/steel above).
const SOUTH_CANTILEVER = 4.5 // ft — matches 03-passive-solar
const EAVE_EXT_N = 2 // ft — north roof overhang only (no E/W structural eave)
const ROOF_RISE = NORTH_WALL_HEIGHT - SOUTH_EAVE // 2'
const ROOF_PITCH = ROOF_RISE / FOOTPRINT_DEPTH // rise per foot of run (+Z)

/** Top of perimeter headers — purlin bottom bears here (not on wall top). */
const SOUTH_BEARING_Y = SOUTH_EAVE + HEADER_HEIGHT // 10.5'
const NORTH_BEARING_Y = NORTH_WALL_HEIGHT + HEADER_HEIGHT // 12.5'

/** Max purlin spacing for 3/4" structural roof deck under heavy snow (~4' o.c.). */
const PURLIN_SPACING_TARGET = 4 // ft — engineer may adjust; 8' is too wide for plywood span

const PURLIN_DEPTH = 11.25 / 12 // 2×12 actual depth, ft
const PURLIN_WIDTH = 0.5 // 6" nominal width (visible face)

const PURLIN_Z_START = -SOUTH_CANTILEVER
const PURLIN_RUN = SOUTH_CANTILEVER + FOOTPRINT_DEPTH + EAVE_EXT_N // 31.5'

/** Purlin bottom (ceiling plane) along the run; bearings at header tops, z = 0 and z = 25. */
function purlinBottomY(z: number): number {
  return SOUTH_BEARING_Y + z * ROOF_PITCH
}

const PURLIN_HEEL_SOUTH = purlinBottomY(PURLIN_Z_START)
const PURLIN_HEEL_NORTH = purlinBottomY(FOOTPRINT_DEPTH + EAVE_EXT_N)

/** Purlin top — structural deck bears here. */
function purlinTopY(z: number): number {
  return purlinBottomY(z) + PURLIN_DEPTH
}

const DECK_THICK = 0.75 / 12 // 3/4" plywood, ft
const DECK_HEEL_SOUTH = purlinTopY(PURLIN_Z_START)
const DECK_HEEL_NORTH = purlinTopY(FOOTPRINT_DEPTH + EAVE_EXT_N)

/** Continuous rigid outsulation above deck — polyiso ~R-6/in; 9" ≈ R-54 (within R-49–60 target). */
const INSULATION_THICK = 9 / 12 // ft
const INSULATION_R_TARGET = 54
const INSULATION_HEEL_SOUTH = DECK_HEEL_SOUTH + DECK_THICK
const INSULATION_HEEL_NORTH = DECK_HEEL_NORTH + DECK_THICK

/** Synthetic roof underlayment on outsulation — under standing seam panels. */
const UNDERLAYMENT_THICK = 1 / 8 / 12 // 1/8" typical synthetic, ft
const UNDERLAYMENT_HEEL_SOUTH = INSULATION_HEEL_SOUTH + INSULATION_THICK
const UNDERLAYMENT_HEEL_NORTH = INSULATION_HEEL_NORTH + INSULATION_THICK

/** Standing seam steel panels — 24ga on underlayment. */
const STEEL_GAUGE = 24
const STEEL_THICK = 0.024 / 12 // 24ga actual thickness, ft
const STEEL_PANEL_WIDTH = 16 / 12 // 16" pan width, ft — seams E–W
const STEEL_RIB_HEIGHT = 2.5 / 12 // raised seam — exaggerated slightly for viewer
const STEEL_RIB_WIDTH = 1.5 / 12 // seam cap width, ft
const STEEL_HEEL_SOUTH = UNDERLAYMENT_HEEL_SOUTH + UNDERLAYMENT_THICK
const STEEL_HEEL_NORTH = UNDERLAYMENT_HEEL_NORTH + UNDERLAYMENT_THICK

/** Full depth from purlin bottom to top of standing seam ribs. */
const ASSEMBLY_DEPTH =
  PURLIN_DEPTH +
  DECK_THICK +
  INSULATION_THICK +
  UNDERLAYMENT_THICK +
  STEEL_THICK +
  STEEL_RIB_HEIGHT

/** Solid blocking at S/N wall lines — headers end here but purlins continue into overhang. */
const ENVELOPE_DAM_THICK = 0.5 // 6" plywood blocking, ft

/** Edge trim / Z-closure at rakes and eaves — protects outsulation from weather. */
const RAKE_CLOSURE_THICK = 0.5 / 12 // 1/2" trim + flashing buildup, ft
const EAVE_CLOSURE_THICK = 0.5 / 12

/** Rake purlins centered on `header-west` / `header-east` (no E/W roof overhang). */
const PURLIN_X_WEST = WALL_THICK / 2
const PURLIN_X_EAST = FOOTPRINT_WIDTH - WALL_THICK / 2

/** Even spacing with a purlin at each rake (west + east eave lines). */
function rakePurlinCenters(
  west: number,
  east: number,
  targetSpacing: number,
): number[] {
  const span = east - west
  const intervals = Math.max(1, Math.round(span / targetSpacing))
  const spacing = span / intervals
  return Array.from({ length: intervals + 1 }, (_, i) => west + i * spacing)
}

const PURLIN_X = rakePurlinCenters(
  PURLIN_X_WEST,
  PURLIN_X_EAST,
  PURLIN_SPACING_TARGET,
)
const PURLIN_SPACING_ACTUAL =
  PURLIN_X.length > 1 ? PURLIN_X[1]! - PURLIN_X[0]! : 0

export const MODULE_ID = '06-structure'

function southPost(id: string, x: number, label: string): Entity {
  return {
    id,
    layer: 'structure',
    kind: 'box',
    position: [x, 0, 0],
    size: [POST_SIZE, SOUTH_EAVE, POST_SIZE],
    label,
    meta: {
      role: 'South facade column — carries roof/eave loads',
      note: 'Roof not bearing on water tanks',
    },
  }
}

function ceilingPurlin(index: number, xCenter: number): Entity {
  const atWestRake = index === 0
  const atEastRake = index === PURLIN_X.length - 1
  const role = atWestRake
    ? 'Rake purlin — on header-west'
    : atEastRake
      ? 'Rake purlin — on header-east'
      : 'Interior purlin'

  return {
    id: `purlin-${index}`,
    layer: 'roof',
    kind: 'wall-segment',
    position: [xCenter - PURLIN_WIDTH / 2, 0, PURLIN_Z_START],
    size: [PURLIN_RUN, PURLIN_DEPTH, PURLIN_WIDTH],
    label: `Ceiling purlin ${index} — 2×12 @ x ${xCenter.toFixed(2)}${atWestRake || atEastRake ? ' (rake)' : ''}`,
    meta: {
      orientation: 'z',
      heelLow: PURLIN_HEEL_SOUTH,
      heelHigh: PURLIN_HEEL_NORTH,
      bandHeight: PURLIN_DEPTH,
      role,
      spacingOcFt: PURLIN_SPACING_ACTUAL,
      note: 'Spans 4.5\' S cantilever + 25\' + 2\' N eave; deck spans E–W between purlins',
    },
  }
}

function slopedZBay(
  id: string,
  label: string,
  xStart: number,
  bayWidth: number,
  zStart: number,
  zRun: number,
  bandHeight: number,
  meta: Record<string, unknown>,
): Entity {
  return {
    id,
    layer: 'roof',
    kind: 'wall-segment',
    position: [xStart, 0, zStart],
    size: [zRun, bandHeight, bayWidth],
    label,
    meta: {
      orientation: 'z',
      heelLow: purlinBottomY(zStart),
      heelHigh: purlinBottomY(zStart + zRun),
      bandHeight,
      ...meta,
    },
  }
}

/** Cavity fill + envelope dams for one E–W bay between adjacent purlins. */
function roofBayEntities(index: number, xStart: number, bayWidth: number): Entity[] {
  const bayIn = (bayWidth * 12).toFixed(1)
  return [
    slopedZBay(
      `roof-bay-cantilever-${index}`,
      `Cantilever cavity bay ${index} — ${bayIn}" (insulated soffit plenum)`,
      xStart,
      bayWidth,
      PURLIN_Z_START,
      SOUTH_CANTILEVER,
      PURLIN_DEPTH,
      {
        role: 'Insulated cantilever bay — south of wall; soffit closes underside between purlins',
        rValue: 38,
        color: '#c9bfb0',
      },
    ),
    slopedZBay(
      `roof-bay-interior-${index}`,
      `Interior cavity bay ${index} — ${bayIn}" (above headers)`,
      xStart,
      bayWidth,
      0,
      FOOTPRINT_DEPTH,
      PURLIN_DEPTH,
      {
        role: 'Mineral wool above headers between purlins — conditioned attic cavity',
        rValue: 38,
        color: '#c9bfb0',
      },
    ),
    slopedZBay(
      `roof-bay-north-eave-${index}`,
      `North eave cavity bay ${index} — ${bayIn}"`,
      xStart,
      bayWidth,
      FOOTPRINT_DEPTH,
      EAVE_EXT_N,
      PURLIN_DEPTH,
      {
        role: 'Insulated north overhang bay — north of wall; enclosed between purlins',
        rValue: 38,
        color: '#c9bfb0',
      },
    ),
    slopedZBay(
      `roof-envelope-dam-south-${index}`,
      `South envelope dam bay ${index} — ${bayIn}"`,
      xStart,
      bayWidth,
      -ENVELOPE_DAM_THICK,
      ENVELOPE_DAM_THICK,
      PURLIN_DEPTH,
      {
        role:
          'Airtight blocking at south wall — seals purlin cavity between headers; deck + outsulation continuous above',
        color: '#a09080',
      },
    ),
    slopedZBay(
      `roof-envelope-dam-north-${index}`,
      `North envelope dam bay ${index} — ${bayIn}"`,
      xStart,
      bayWidth,
      FOOTPRINT_DEPTH - ENVELOPE_DAM_THICK,
      ENVELOPE_DAM_THICK,
      PURLIN_DEPTH,
      {
        role:
          'Airtight blocking at north wall — seals purlin cavity between headers; deck + outsulation continuous above',
        color: '#a09080',
      },
    ),
  ]
}

function rakeClosure(side: 'west' | 'east'): Entity {
  const x = side === 'west' ? 0 : FOOTPRINT_WIDTH - RAKE_CLOSURE_THICK
  return slopedZBay(
    `roof-rake-closure-${side}`,
    `Rake closure — ${side} (Z-flashing + trim)`,
    x,
    RAKE_CLOSURE_THICK,
    PURLIN_Z_START,
    PURLIN_RUN,
    ASSEMBLY_DEPTH,
    {
      role: 'Rake edge closure — caps outsulation stack at E/W wall; prevents weather intrusion',
      color: '#8898a8',
    },
  )
}

function eaveClosure(edge: 'south' | 'north'): Entity {
  const zNorth = FOOTPRINT_DEPTH + EAVE_EXT_N
  const z = edge === 'south' ? PURLIN_Z_START - EAVE_CLOSURE_THICK : zNorth
  const heel =
    edge === 'south' ? PURLIN_HEEL_SOUTH : purlinBottomY(zNorth)

  return {
    id: `roof-eave-closure-${edge}`,
    layer: 'roof',
    kind: 'wall-segment',
    position: [0, 0, z],
    size: [FOOTPRINT_WIDTH, ASSEMBLY_DEPTH, EAVE_CLOSURE_THICK],
    label:
      edge === 'south'
        ? 'South cantilever eave closure — fascia + drip'
        : 'North eave closure — fascia + drip',
    meta: {
      orientation: 'x',
      heelLow: heel,
      heelHigh: heel,
      bandHeight: ASSEMBLY_DEPTH,
      role:
        edge === 'south'
          ? 'Closes south cantilever roof edge — protects assembly from below/wind'
          : 'Closes north overhang edge — drip past berm',
      color: '#8898a8',
    },
  }
}

export function getSpecEntities(): Entity[] {
  const slabBottom = -SLAB_THICK
  const thickenedBottom = slabBottom - TANK_PAD_EXTRA
  const stemBottom = slabBottom - STEM_FOOTING_DEPTH
  const stemHeight = GRADE_RISE_NORTH - stemBottom // top flush with north grade

  return [
    {
      id: 'slab-main',
      layer: 'structure',
      kind: 'slab',
      position: [0, slabBottom, 0],
      size: [FOOTPRINT_WIDTH, SLAB_THICK, FOOTPRINT_DEPTH],
      label: 'Main slab (6")',
      meta: { thicknessIn: 6 },
    },
    {
      id: 'slab-south-edge-west',
      layer: 'structure',
      kind: 'slab',
      position: [0, thickenedBottom, 0],
      size: [PAD_WEST_X, SOUTH_EDGE_EXTRA, SOUTH_EDGE_DEPTH],
      label: 'South edge thickening — west (12")',
      meta: {
        thicknessIn: 12,
        note: 'Glazing posts + cantilever roof reactions',
      },
    },
    {
      id: 'slab-south-edge-mid',
      layer: 'structure',
      kind: 'slab',
      position: [PAD_WEST_END, thickenedBottom, 0],
      size: [PAD_EAST_X - PAD_WEST_END, SOUTH_EDGE_EXTRA, SOUTH_EDGE_DEPTH],
      label: 'South edge thickening — between tanks (12")',
      meta: {
        thicknessIn: 12,
        note: 'Glazing posts + cantilever roof reactions',
      },
    },
    {
      id: 'slab-south-edge-east',
      layer: 'structure',
      kind: 'slab',
      position: [PAD_EAST_END, thickenedBottom, 0],
      size: [FOOTPRINT_WIDTH - PAD_EAST_END, SOUTH_EDGE_EXTRA, SOUTH_EDGE_DEPTH],
      label: 'South edge thickening — east (12")',
      meta: {
        thicknessIn: 12,
        note: 'Glazing posts + cantilever roof reactions',
      },
    },
    {
      id: 'slab-tank-west',
      layer: 'structure',
      kind: 'slab',
      position: [PAD_WEST_X, thickenedBottom, 0],
      size: [PAD_WIDTH, TANK_PAD_EXTRA, PAD_DEPTH],
      label: 'Tank pad west (12")',
      meta: {
        thicknessIn: 12,
        designLoadLb: 14000,
        tankFootprintFt: [TANK_WIDTH, TANK_DEPTH],
        note: 'Centered on west 30 ft half (tank x 7.5–22.5); +6" for drain',
      },
    },
    {
      id: 'slab-tank-east',
      layer: 'structure',
      kind: 'slab',
      position: [PAD_EAST_X, thickenedBottom, 0],
      size: [PAD_WIDTH, TANK_PAD_EXTRA, PAD_DEPTH],
      label: 'Tank pad east (12")',
      meta: {
        thicknessIn: 12,
        designLoadLb: 14000,
        tankFootprintFt: [TANK_WIDTH, TANK_DEPTH],
        note: 'Centered on east 30 ft half (tank x 37.5–52.5); +6" for drain',
      },
    },
    {
      id: 'footing-north',
      layer: 'structure',
      kind: 'slab',
      position: [0, stemBottom, FOOTPRINT_DEPTH],
      size: [FOOTPRINT_WIDTH, SLAB_THICK, STEM_FOOTING_WIDTH],
      label: 'North spread footing',
      meta: { note: 'Under retaining stem; width TBD by engineer' },
    },
    {
      id: 'stem-north',
      layer: 'structure',
      kind: 'box',
      position: [0, stemBottom, FOOTPRINT_DEPTH],
      size: [FOOTPRINT_WIDTH, stemHeight, STEM_WALL_THICK],
      label: 'North stem / retaining wall',
      meta: {
        gradeRiseFt: GRADE_RISE_NORTH,
        buriedDepthFt: GRADE_RISE_NORTH,
        note: 'Exterior of north envelope wall; retains berm',
      },
    },
    ...SOUTH_POST_X.map((x, i) =>
      southPost(
        `post-south-${i}`,
        x,
        i === 0
          ? 'South post — SW corner'
          : i === SOUTH_POST_X.length - 1
            ? 'South post — SE corner'
            : `South post — mullion (x ${x})`,
      ),
    ),
    {
      id: 'header-south',
      layer: 'structure',
      kind: 'box',
      position: [0, SOUTH_EAVE, 0],
      size: [FOOTPRINT_WIDTH, HEADER_HEIGHT, HEADER_DEPTH],
      label: 'South eave header',
      meta: {
        role: 'Perimeter plate — ties south posts; supports roof south edge',
      },
    },
    {
      id: 'header-north',
      layer: 'structure',
      kind: 'box',
      position: [0, NORTH_WALL_HEIGHT, FOOTPRINT_DEPTH - WALL_THICK],
      size: [FOOTPRINT_WIDTH, HEADER_HEIGHT, HEADER_DEPTH],
      label: 'North plate header',
      meta: {
        role: 'Perimeter plate — tops north wall; supports roof north edge',
      },
    },
    {
      id: 'header-west',
      layer: 'structure',
      kind: 'wall-segment',
      position: [0, 0, 0],
      size: [FOOTPRINT_DEPTH, NORTH_WALL_HEIGHT + HEADER_HEIGHT, WALL_THICK],
      label: 'West plate header — sloped 10\' S to 12\' N',
      meta: {
        orientation: 'z',
        heelLow: SOUTH_EAVE,
        heelHigh: NORTH_WALL_HEIGHT,
        bandHeight: HEADER_HEIGHT,
        role: 'Perimeter plate — tops west wall',
      },
    },
    {
      id: 'header-east',
      layer: 'structure',
      kind: 'wall-segment',
      position: [FOOTPRINT_WIDTH - WALL_THICK, 0, 0],
      size: [FOOTPRINT_DEPTH, NORTH_WALL_HEIGHT + HEADER_HEIGHT, WALL_THICK],
      label: 'East plate header — sloped 10\' S to 12\' N',
      meta: {
        orientation: 'z',
        heelLow: SOUTH_EAVE,
        heelHigh: NORTH_WALL_HEIGHT,
        bandHeight: HEADER_HEIGHT,
        role: 'Perimeter plate — tops east wall',
      },
    },
    ...PURLIN_X.map((x, i) => ceilingPurlin(i, x)),
    ...PURLIN_X.slice(0, -1).flatMap((x, i) => {
      const xStart = x + PURLIN_WIDTH / 2
      const bayWidth = PURLIN_X[i + 1]! - x - PURLIN_WIDTH
      return roofBayEntities(i, xStart, bayWidth)
    }),
    {
      id: 'roof-deck',
      layer: 'roof',
      kind: 'wall-segment',
      position: [0, 0, PURLIN_Z_START],
      size: [PURLIN_RUN, DECK_THICK, FOOTPRINT_WIDTH],
      label: 'Structural roof deck — 3/4" plywood + air barrier',
      meta: {
        orientation: 'z',
        heelLow: DECK_HEEL_SOUTH,
        heelHigh: DECK_HEEL_NORTH,
        bandHeight: DECK_THICK,
        role: 'Structural sheathing — spans E–W between purlins; continuous air barrier above',
        thicknessIn: 0.75,
        note: 'Underlayment and standing seam (`roof-steel`) above',
      },
    },
    {
      id: 'roof-insulation',
      layer: 'roof',
      kind: 'wall-segment',
      position: [0, 0, PURLIN_Z_START],
      size: [PURLIN_RUN, INSULATION_THICK, FOOTPRINT_WIDTH],
      label: `Rigid roof insulation — ${INSULATION_THICK * 12}" polyiso outsulation (~R-${INSULATION_R_TARGET})`,
      meta: {
        orientation: 'z',
        heelLow: INSULATION_HEEL_SOUTH,
        heelHigh: INSULATION_HEEL_NORTH,
        bandHeight: INSULATION_THICK,
        role: 'Continuous outsulation above air barrier — no thermal bridging through purlins',
        thicknessIn: INSULATION_THICK * 12,
        rValue: INSULATION_R_TARGET,
        note: 'Underlayment (`roof-underlayment`) and standing seam (`roof-steel`) above',
      },
    },
    {
      id: 'roof-underlayment',
      layer: 'roof',
      kind: 'wall-segment',
      position: [0, 0, PURLIN_Z_START],
      size: [PURLIN_RUN, UNDERLAYMENT_THICK, FOOTPRINT_WIDTH],
      label: 'Roof underlayment — synthetic on outsulation',
      meta: {
        orientation: 'z',
        heelLow: UNDERLAYMENT_HEEL_SOUTH,
        heelHigh: UNDERLAYMENT_HEEL_NORTH,
        bandHeight: UNDERLAYMENT_THICK,
        role: 'Water-resistive barrier under metal roofing — continuous over rigid insulation',
        thicknessIn: UNDERLAYMENT_THICK * 12,
        note: 'Standing seam steel (`roof-steel`) above',
      },
    },
    {
      id: 'roof-steel',
      layer: 'roof',
      kind: 'wall-segment',
      position: [0, 0, PURLIN_Z_START],
      size: [PURLIN_RUN, STEEL_THICK, FOOTPRINT_WIDTH],
      label: `Standing seam roof — ${STEEL_GAUGE}ga steel, dark finish`,
      meta: {
        orientation: 'z',
        heelLow: STEEL_HEEL_SOUTH,
        heelHigh: STEEL_HEEL_NORTH,
        bandHeight: STEEL_THICK,
        profile: 'standing-seam',
        seamSpacingIn: STEEL_PANEL_WIDTH * 12,
        ribHeightIn: STEEL_RIB_HEIGHT * 12,
        ribWidthIn: STEEL_RIB_WIDTH * 12,
        role: 'Exterior roof cladding — standing seam panels over outsulation assembly',
        gauge: STEEL_GAUGE,
        finish: 'dark',
        color: '#b8c6d4',
        thicknessIn: STEEL_THICK * 12,
      },
    },
    rakeClosure('west'),
    rakeClosure('east'),
    eaveClosure('south'),
    eaveClosure('north'),
  ]
}
