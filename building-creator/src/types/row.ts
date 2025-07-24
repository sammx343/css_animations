export type Row = {
  id: string
  name: string
  number: number
  color: string
  top: string
  left: string
  windowWidth: string
  windowHeight: string
  gap: string
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-evenly'
    | 'space-between'
    | 'space-around'
  isColumn?: boolean
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
