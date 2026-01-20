import type { Grid } from '@/types/grid'
import { generateId } from '@/utils/generateId'

/**
 * Factory for creating Grid objects
 */
export class GridFactory {
  /**
   * Creates a default grid with standard window configuration
   */
  static createDefaultGrid(options?: {
    rows?: number
    columns?: number
    name?: string
  }): Grid {
    return {
      id: generateId(),
      name: options?.name || 'Grid 0',
      rows: options?.rows || 5,
      columns: options?.columns || 5,
      excludedWindows: [],
      colors: [{ hex: '#000000', percentage: 100 }],
      colorsAngle: 0,
      top: '2%',
      left: '2%',
      windowWidth: '50',
      windowHeight: '50',
      gridWidth: '100',
      gridHeight: '100',
      rowGap: '5',
      columnGap: '5',
      borderRadius: '0%',
      excludedFaces: [5, 6],
      borderTop: {
        size: 0,
        style: 'none',
        color: '#000000',
      },
    }
  }

  /**
   * Creates a small/basic grid (2x2)
   * Matches the grid used in BuildingActions "New Block" button
   */
  static createSmallGrid(): Grid {
    return {
      id: generateId(),
      name: 'Grid 0',
      rows: 2,
      columns: 2,
      excludedWindows: [],
      colors: [{ hex: '#000000', percentage: 100 }],
      colorsAngle: 0,
      top: '0%',
      left: '0%',
      windowWidth: '40',
      windowHeight: '40',
      gridWidth: '100',
      gridHeight: '100',
      rowGap: '5px',
      columnGap: '5px',
      borderRadius: '0%',
      excludedFaces: [5, 6],
      borderTop: {
        size: 0,
        style: 'none',
        color: '#000000',
      },
    }
  }

  /**
   * Creates an empty grid (no windows pattern)
   */
  static createEmptyGrid(): Grid {
    return {
      id: generateId(),
      name: 'Grid 0',
      rows: 1,
      columns: 1,
      excludedWindows: [],
      colors: [{ hex: '#000000', percentage: 100 }],
      colorsAngle: 0,
      top: '0%',
      left: '0%',
      windowWidth: '0',
      windowHeight: '0',
      gridWidth: '100',
      gridHeight: '100',
      rowGap: '0',
      columnGap: '0',
      borderRadius: '0%',
      excludedFaces: [5, 6],
      borderTop: {
        size: 0,
        style: 'none',
        color: '#000000',
      },
    }
  }
}
