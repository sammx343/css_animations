import type { Color } from './color'

export type Border = {
  size: number
  style: string
  color: string
}

export type Grid = {
  id: string
  name: string
  colors: Color[]
  colorsAngle: number
  top: string
  left: string
  windowWidth: string
  windowHeight: string
  gridWidth: string
  gridHeight: string
  rows: number
  columns: number
  excludedWindows?: number[]
  rowGap: string
  columnGap: string
  borderRadius?: string
  excludedFaces: (1 | 2 | 3 | 4 | 5 | 6)[]
  borderTop?: Border
  borderBottom?: Border
  borderLeft?: Border
  borderRight?: Border
}
