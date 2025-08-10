import type { Grid } from './grid'
import type { Color } from './color'
export type Cube = {
  width: number
  long: number
  height: number
  colors: Color[]
  colorsAngle?: number
  grids: Grid[]
}
