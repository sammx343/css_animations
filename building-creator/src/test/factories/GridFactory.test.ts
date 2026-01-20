import { describe, it, expect } from 'vitest'
import { GridFactory } from '@/factories/GridFactory'

describe('GridFactory', () => {
  describe('createDefaultGrid', () => {
    it('should create a grid with default values', () => {
      const grid = GridFactory.createDefaultGrid()

      expect(grid).toBeDefined()
      expect(grid.id).toBeDefined()
      expect(grid.name).toBe('Grid 0')
      expect(grid.rows).toBe(5)
      expect(grid.columns).toBe(5)
      expect(grid.colors).toHaveLength(1)
      expect(grid.colors[0].hex).toBe('#000000')
      expect(grid.gridWidth).toBe('100')
      expect(grid.gridHeight).toBe('100')
      expect(grid.excludedFaces).toEqual([5, 6])
    })

    it('should create a grid with custom options', () => {
      const grid = GridFactory.createDefaultGrid({
        rows: 10,
        columns: 8,
        name: 'Custom Grid',
      })

      expect(grid.rows).toBe(10)
      expect(grid.columns).toBe(8)
      expect(grid.name).toBe('Custom Grid')
    })

    it('should generate unique IDs for each grid', () => {
      const grid1 = GridFactory.createDefaultGrid()
      const grid2 = GridFactory.createDefaultGrid()

      expect(grid1.id).not.toBe(grid2.id)
    })
  })

  describe('createSmallGrid', () => {
    it('should create a 2x2 grid', () => {
      const grid = GridFactory.createSmallGrid()

      expect(grid.rows).toBe(2)
      expect(grid.columns).toBe(2)
      expect(grid.windowWidth).toBe('40')
      expect(grid.windowHeight).toBe('40')
      expect(grid.top).toBe('0%')
      expect(grid.left).toBe('0%')
      expect(grid.rowGap).toBe('5px')
      expect(grid.columnGap).toBe('5px')
    })

    it('should generate unique IDs', () => {
      const grid1 = GridFactory.createSmallGrid()
      const grid2 = GridFactory.createSmallGrid()

      expect(grid1.id).not.toBe(grid2.id)
    })
  })

  describe('createEmptyGrid', () => {
    it('should create an empty grid with minimal windows', () => {
      const grid = GridFactory.createEmptyGrid()

      expect(grid.rows).toBe(1)
      expect(grid.columns).toBe(1)
      expect(grid.windowWidth).toBe('0')
      expect(grid.windowHeight).toBe('0')
      expect(grid.rowGap).toBe('0')
      expect(grid.columnGap).toBe('0')
    })

    it('should generate unique IDs', () => {
      const grid1 = GridFactory.createEmptyGrid()
      const grid2 = GridFactory.createEmptyGrid()

      expect(grid1.id).not.toBe(grid2.id)
    })
  })
})
