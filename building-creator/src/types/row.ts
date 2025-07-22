export type Row = {
  id: string
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
  excludedFaces: (1 | 2 | 3 | 4 | 5 | 6)[]
}
