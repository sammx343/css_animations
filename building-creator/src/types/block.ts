import type { Grid } from './grid'
import type { Color } from './color'
export type Block = {
  id: string
  name: string
  width: number
  long: number
  height: number
  colors: Color[]
  colorsAngle?: number
  grids: Grid[]
  left?: number
  bottom?: number
  positionX: number
  positionY: number
  positionZ: number
  rotationX: number
  rotationY: number
  rotationZ: number
}
