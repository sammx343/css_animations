import type { Grid } from './grid'

export type Cube = {
  width: number
  long: number
  height: number
  color: {
    hex: string
  }
  grids: Grid[]
}
