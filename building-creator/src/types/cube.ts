import type { Grid } from './grid'
export type Cube = {
  width: number
  long: number
  height: number
  colors: [
    {
      hex: string
    },
  ]
  grids: Grid[]
}
