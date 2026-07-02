import { z } from 'zod'

/**
 * ## Coordinate system (project convention)
 *
 * Used when placing entities in spec data. The renderer draws whatever
 * coordinates the model provides — it does not hardcode this frame.
 *
 * | Property | Value |
 * |----------|-------|
 * | Origin   | Southwest corner of the building slab, ground level (Y = 0) |
 * | +X       | East |
 * | +Y       | Up |
 * | +Z       | North |
 * | Units    | Feet |
 *
 * **Entity position** is the south-west-bottom corner of an axis-aligned box
 * defined by `size` (when present). The box extends in +X, +Y, and +Z.
 *
 * Kind-specific notes:
 * - **roof** — `size` is [footprintWidth, panelThickness, footprintDepth].
 *   `meta.heelLow` / `meta.heelHigh` are eave heights relative to `position.y`
 *   at the south (+Z min) and north (+Z max) edges. Slopes up toward +Z.
 * - **wall-segment** — `size` is [length, height, thickness]. Runs along +X
 *   unless `meta.orientation` is `"z"` (runs along +Z). Optional
 *   `meta.heelLow` / `meta.heelHigh` are top heights at the low and high
 *   ends of the run (relative to `position.y`); both must be set together.
 *   With `meta.bandHeight`, heels define a sloped bottom edge and the top is
 *   offset upward by `bandHeight` (sloped plate/header band).
 * - **opening** — `size` is [width, height, depth]; a recess/gap visual on a wall.
 * - **zone** — `size` is [width, height, depth]; translucent program volume on the
 *   `zones` layer. Optional `label` for display; `meta.color` / `meta.opacity`.
 */

export const COORDINATE_SYSTEM = {
  origin: 'Southwest corner of slab, ground level (Y = 0)',
  axes: { x: 'east', y: 'up', z: 'north' } as const,
  units: 'feet' as const,
  /** Viewer uses Y-up and mirrors +X about model center so south elevations read west-left / east-right. */
  viewerCameraUp: 'up (+Y)',
} as const

export const ENTITY_KINDS = [
  'slab',
  'box',
  'glazing-wall',
  'roof',
  'wall-segment',
  'opening',
  'zone',
] as const

export const EntityKindSchema = z.enum(ENTITY_KINDS, {
  error: (issue) =>
    issue.input === undefined
      ? 'kind is required'
      : `kind must be one of: ${ENTITY_KINDS.join(', ')}`,
})

export const LAYER_IDS = [
  'site',
  'structure',
  'roof',
  'envelope',
  'glazing',
  'partitions',
  'zones',
  'mechanical',
  'annotations',
] as const

export const LayerIdSchema = z.enum(LAYER_IDS, {
  error: (issue) =>
    issue.input === undefined
      ? 'layer is required'
      : `layer must be one of: ${LAYER_IDS.join(', ')}`,
})

const finiteNumber = z
  .number({ error: 'must be a number' })
  .finite({ error: 'must be a finite number' })

const Vec3Schema = z.tuple([finiteNumber, finiteNumber, finiteNumber], {
  error: 'must be a [x, y, z] tuple of three numbers',
})

const SizeSchema = z.tuple(
  [finiteNumber, finiteNumber, finiteNumber],
  { error: 'must be a [width, height, depth] tuple of three numbers' },
)

const PositiveSizeSchema = SizeSchema.refine(
  ([w, h, d]) => w > 0 && h > 0 && d > 0,
  { error: 'size dimensions must all be greater than zero' },
)

const FootprintSizeSchema = SizeSchema.refine(
  ([w, h, d]) => w > 0 && h > 0 && d > 0,
  { error: 'roof size must be [footprintWidth, panelThickness, footprintDepth] with all values > 0' },
)

const RotationSchema = z.tuple(
  [finiteNumber, finiteNumber, finiteNumber],
  { error: 'must be a [rx, ry, rz] tuple of three numbers (degrees)' },
)

const RoofMetaSchema = z.object({
  heelLow: finiteNumber,
  heelHigh: finiteNumber,
  overhang: finiteNumber.min(0, { error: 'overhang must be >= 0' }).optional(),
})

const WallSegmentMetaSchema = z
  .object({
    orientation: z.enum(['x', 'z']).optional(),
    heelLow: finiteNumber.optional(),
    heelHigh: finiteNumber.optional(),
    bandHeight: finiteNumber
      .positive({ error: 'bandHeight must be greater than zero' })
      .optional(),
  })
  .superRefine((meta, ctx) => {
    const hasLow = meta.heelLow !== undefined
    const hasHigh = meta.heelHigh !== undefined
    if (hasLow !== hasHigh) {
      ctx.addIssue({
        code: 'custom',
        message: 'wall-segment meta.heelLow and meta.heelHigh must both be set or both omitted',
        path: hasLow ? ['heelHigh'] : ['heelLow'],
      })
    }
    if (meta.bandHeight !== undefined && !hasLow) {
      ctx.addIssue({
        code: 'custom',
        message: 'wall-segment meta.bandHeight requires meta.heelLow and meta.heelHigh',
        path: ['bandHeight'],
      })
    }
  })

const OpeningMetaSchema = z.object({
  hostWallId: z.string().optional(),
  color: z
    .string({ error: 'color must be a string' })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: 'color must be a hex string like #4caf82' })
    .optional(),
  opacity: finiteNumber
    .min(0, { error: 'opacity must be between 0 and 1' })
    .max(1, { error: 'opacity must be between 0 and 1' })
    .optional(),
})

const ZoneMetaSchema = z.object({
  color: z
    .string({ error: 'color must be a string' })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: 'color must be a hex string like #4caf82' })
    .optional(),
  opacity: finiteNumber
    .min(0, { error: 'opacity must be between 0 and 1' })
    .max(1, { error: 'opacity must be between 0 and 1' })
    .optional(),
})

const BOX_KINDS = ['slab', 'box', 'glazing-wall'] as const

export const EntitySchema = z
  .object({
    id: z
      .string({ error: 'id is required' })
      .min(1, { error: 'id must be a non-empty string' }),
    layer: LayerIdSchema,
    kind: EntityKindSchema,
    position: Vec3Schema,
    size: SizeSchema.optional(),
    rotation: RotationSchema.optional(),
    assemblyId: z.string().optional(),
    label: z.string().optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
  })
  .superRefine((entity, ctx) => {
    validateEntityKind(entity, ctx)
  })

function validateEntityKind(
  entity: z.infer<typeof EntitySchema>,
  ctx: z.RefinementCtx,
): void {
  switch (entity.kind) {
    case 'slab':
    case 'box':
    case 'glazing-wall':
      validateBoxKind(entity, ctx)
      break
    case 'roof':
      validateRoof(entity, ctx)
      break
    case 'wall-segment':
      validateWallSegment(entity, ctx)
      break
    case 'opening':
      validateOpening(entity, ctx)
      break
    case 'zone':
      validateZone(entity, ctx)
      break
  }
}

function validateBoxKind(
  entity: z.infer<typeof EntitySchema>,
  ctx: z.RefinementCtx,
): void {
  if (!entity.size) {
    ctx.addIssue({
      code: 'custom',
      message: `kind "${entity.kind}" requires a size [width, height, depth]`,
      path: ['size'],
    })
    return
  }

  const parsed = PositiveSizeSchema.safeParse(entity.size)
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      ctx.addIssue({ ...issue, path: ['size', ...issue.path] })
    }
  }
}

function validateRoof(
  entity: z.infer<typeof EntitySchema>,
  ctx: z.RefinementCtx,
): void {
  if (!entity.size) {
    ctx.addIssue({
      code: 'custom',
      message:
        'kind "roof" requires size [footprintWidth, panelThickness, footprintDepth]',
      path: ['size'],
    })
    return
  }

  const sizeResult = FootprintSizeSchema.safeParse(entity.size)
  if (!sizeResult.success) {
    for (const issue of sizeResult.error.issues) {
      ctx.addIssue({ ...issue, path: ['size', ...issue.path] })
    }
  }

  if (!entity.meta) {
    ctx.addIssue({
      code: 'custom',
      message: 'kind "roof" requires meta.heelLow and meta.heelHigh (numbers)',
      path: ['meta'],
    })
    return
  }

  const metaResult = RoofMetaSchema.safeParse(entity.meta)
  if (!metaResult.success) {
    for (const issue of metaResult.error.issues) {
      ctx.addIssue({ ...issue, path: ['meta', ...issue.path] })
    }
  }
}

function validateWallSegment(
  entity: z.infer<typeof EntitySchema>,
  ctx: z.RefinementCtx,
): void {
  if (!entity.size) {
    ctx.addIssue({
      code: 'custom',
      message:
        'kind "wall-segment" requires size [length, height, thickness]',
      path: ['size'],
    })
    return
  }

  const sizeResult = PositiveSizeSchema.safeParse(entity.size)
  if (!sizeResult.success) {
    for (const issue of sizeResult.error.issues) {
      ctx.addIssue({ ...issue, path: ['size', ...issue.path] })
    }
  }

  if (entity.meta) {
    const metaResult = WallSegmentMetaSchema.safeParse(entity.meta)
    if (!metaResult.success) {
      for (const issue of metaResult.error.issues) {
        ctx.addIssue({ ...issue, path: ['meta', ...issue.path] })
      }
    }
  }
}

function validateOpening(
  entity: z.infer<typeof EntitySchema>,
  ctx: z.RefinementCtx,
): void {
  if (!entity.size) {
    ctx.addIssue({
      code: 'custom',
      message: 'kind "opening" requires size [width, height, depth]',
      path: ['size'],
    })
    return
  }

  const sizeResult = PositiveSizeSchema.safeParse(entity.size)
  if (!sizeResult.success) {
    for (const issue of sizeResult.error.issues) {
      ctx.addIssue({ ...issue, path: ['size', ...issue.path] })
    }
  }

  if (entity.meta) {
    const metaResult = OpeningMetaSchema.safeParse(entity.meta)
    if (!metaResult.success) {
      for (const issue of metaResult.error.issues) {
        ctx.addIssue({ ...issue, path: ['meta', ...issue.path] })
      }
    }
  }
}

function validateZone(
  entity: z.infer<typeof EntitySchema>,
  ctx: z.RefinementCtx,
): void {
  if (entity.layer !== 'zones') {
    ctx.addIssue({
      code: 'custom',
      message: 'kind "zone" must use layer "zones"',
      path: ['layer'],
    })
  }

  if (!entity.size) {
    ctx.addIssue({
      code: 'custom',
      message: 'kind "zone" requires size [width, height, depth]',
      path: ['size'],
    })
    return
  }

  const sizeResult = PositiveSizeSchema.safeParse(entity.size)
  if (!sizeResult.success) {
    for (const issue of sizeResult.error.issues) {
      ctx.addIssue({ ...issue, path: ['size', ...issue.path] })
    }
  }

  if (entity.meta) {
    const metaResult = ZoneMetaSchema.safeParse(entity.meta)
    if (!metaResult.success) {
      for (const issue of metaResult.error.issues) {
        ctx.addIssue({ ...issue, path: ['meta', ...issue.path] })
      }
    }
  }
}

export const HouseModelSchema = z
  .object({
    entities: z
      .array(EntitySchema, { error: 'entities must be an array' })
      .min(1, { error: 'model must contain at least one entity' }),
    meta: z.record(z.string(), z.unknown()).optional(),
  })
  .superRefine((model, ctx) => {
    const seen = new Set<string>()
    for (const [index, entity] of model.entities.entries()) {
      if (seen.has(entity.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `duplicate entity id "${entity.id}"`,
          path: ['entities', index, 'id'],
        })
      }
      seen.add(entity.id)
    }
  })

export type EntityKind = z.infer<typeof EntityKindSchema>
export type LayerId = z.infer<typeof LayerIdSchema>
export type Entity = z.infer<typeof EntitySchema>
export type HouseModel = z.infer<typeof HouseModelSchema>

export type RoofMeta = z.infer<typeof RoofMetaSchema>
export type WallSegmentMeta = z.infer<typeof WallSegmentMetaSchema>
export type OpeningMeta = z.infer<typeof OpeningMetaSchema>
export type ZoneMeta = z.infer<typeof ZoneMetaSchema>

export function parseRoofMeta(meta: Record<string, unknown> | undefined): RoofMeta {
  return RoofMetaSchema.parse(meta ?? {})
}

export function parseWallSegmentMeta(
  meta: Record<string, unknown> | undefined,
): WallSegmentMeta {
  return WallSegmentMetaSchema.parse(meta ?? {})
}

export type WallHeelHeights = { heelLow: number; heelHigh: number }

/** Parsed heel pair when both are present; otherwise null (uniform height wall). */
export function parseWallHeelHeights(
  meta: Record<string, unknown> | undefined,
): WallHeelHeights | null {
  const parsed = parseWallSegmentMeta(meta)
  if (parsed.heelLow === undefined || parsed.heelHigh === undefined) return null
  return { heelLow: parsed.heelLow, heelHigh: parsed.heelHigh }
}

const DEFAULT_ZONE_COLOR = '#4caf82'

export function parseZoneMeta(
  meta: Record<string, unknown> | undefined,
): ZoneMeta & { color: string; opacity: number } {
  const parsed = ZoneMetaSchema.parse(meta ?? {})
  return {
    color: parsed.color ?? DEFAULT_ZONE_COLOR,
    opacity: parsed.opacity ?? 0.22,
  }
}

export { BOX_KINDS }
