export type Grid = {
  id: string
  name: string
  color: string
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
  borderRadius? : string
  excludedFaces: (1 | 2 | 3 | 4 | 5 | 6)[]
  borderSize?: string
  borderType?: string
  borderColor?: string
  showBorderTop?: boolean
  showBorderLeft?: boolean
  showBorderRight?: boolean
  showBorderBottom?: boolean
}
