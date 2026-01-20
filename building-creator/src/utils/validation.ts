import { z } from 'zod'
import type { Building, Block, Grid, Color, Border } from '@/types'

/**
 * Zod schemas for runtime validation
 */

export const ColorSchema = z.object({
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  percentage: z.union([z.number().min(0).max(100), z.string().transform(Number)]).pipe(z.number().min(0).max(100)),
})

export const BorderSchema = z.object({
  size: z.union([z.number().min(0), z.string().transform(Number)]).pipe(z.number().min(0)),
  style: z.string(),
  color: z.string(),
})

export const GridSchema: z.ZodType<Grid> = z.object({
  id: z.string(),
  name: z.string(),
  colors: z.array(ColorSchema),
  colorsAngle: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  top: z.union([z.string(), z.number().transform(String)]),
  left: z.union([z.string(), z.number().transform(String)]),
  windowWidth: z.string(),
  windowHeight: z.string(),
  gridWidth: z.string(),
  gridHeight: z.string(),
  rows: z.union([z.number().int().positive(), z.string().transform(Number)]).pipe(z.number().int().positive()),
  columns: z.union([z.number().int().positive(), z.string().transform(Number)]).pipe(z.number().int().positive()),
  excludedWindows: z.array(z.number().int()).optional(),
  rowGap: z.string(),
  columnGap: z.string(),
  borderRadius: z.string().optional(),
  excludedFaces: z.array(z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])),
  borderTop: BorderSchema.optional(),
  borderBottom: BorderSchema.optional(),
  borderLeft: BorderSchema.optional(),
  borderRight: BorderSchema.optional(),
})

export const BlockSchema: z.ZodType<Block> = z.object({
  id: z.string(),
  name: z.string(),
  width: z.union([z.number().positive(), z.string().transform(Number)]).pipe(z.number().positive()),
  long: z.union([z.number().positive(), z.string().transform(Number)]).pipe(z.number().positive()),
  height: z.union([z.number().positive(), z.string().transform(Number)]).pipe(z.number().positive()),
  colors: z.array(ColorSchema),
  colorsAngle: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()).optional(),
  grids: z.array(GridSchema),
  left: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()).optional(),
  bottom: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()).optional(),
  positionX: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  positionY: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  positionZ: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  rotationX: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  rotationY: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  rotationZ: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
})

export const BuildingSchema: z.ZodType<Building> = z.object({
  id: z.string(),
  name: z.string(),
  blocks: z.array(BlockSchema).min(1),
})

/**
 * Validate a building object
 */
export function validateBuilding(data: unknown): data is Building {
  try {
    BuildingSchema.parse(data)
    return true
  } catch {
    return false
  }
}

/**
 * Validate a building with detailed error information
 */
export function validateBuildingWithErrors(data: unknown) {
  return BuildingSchema.safeParse(data)
}
