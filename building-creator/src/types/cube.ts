import type { Row } from './row'

export type Cube = {
  width: number
  long: number
  height: number
  color: {
    hex: string
  }
  rows: Row[]
}
