import type { Block } from '@/types/block'
import { generateId } from '@/utils/generateId'
import { GridFactory } from './GridFactory'

export type BlockTemplate = 'default' | 'small' | 'empty'

/**
 * Factory for creating Block objects
 */
export class BlockFactory {
  /**
   * Creates a default block (300x300x300 with standard grid)
   */
  static createDefaultBlock(options?: {
    name?: string
    positionX?: number
    positionY?: number
    positionZ?: number
  }): Block {
    return {
      id: generateId(),
      name: options?.name || 'block 1',
      width: 300,
      height: 300,
      long: 300,
      colors: [{ hex: '#ff7360', percentage: 100 }],
      colorsAngle: 0,
      positionX: options?.positionX ?? 0,
      positionY: options?.positionY ?? 0,
      positionZ: options?.positionZ ?? 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      grids: [GridFactory.createDefaultGrid()],
      visibleFaces: [true, true, true, true, true, true],
      backfaceVisibility: false,
    }
  }

  /**
   * Creates a small block (100x100x100 with basic grid)
   */
  static createSmallBlock(options?: {
    name?: string
    positionX?: number
    positionY?: number
    positionZ?: number
    left?: number
    bottom?: number
  }): Block {
    return {
      id: generateId(),
      name: options?.name || 'block 1',
      width: 100,
      height: 100,
      long: 100,
      colors: [{ hex: '#ff0000', percentage: 100 }],
      colorsAngle: 0,
      left: options?.left,
      bottom: options?.bottom,
      positionX: options?.positionX ?? 0,
      positionY: options?.positionY ?? 0,
      positionZ: options?.positionZ ?? 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      grids: [GridFactory.createSmallGrid()],
      visibleFaces: [true, true, true, true, true, true],
      backfaceVisibility: false,
    }
  }

  /**
   * Creates an empty block (minimal, no grids)
   */
  static createEmptyBlock(options?: {
    name?: string
    width?: number
    height?: number
    long?: number
    positionX?: number
    positionY?: number
    positionZ?: number
  }): Block {
    return {
      id: generateId(),
      name: options?.name || 'block 1',
      width: options?.width || 100,
      height: options?.height || 100,
      long: options?.long || 100,
      colors: [{ hex: '#ffffff', percentage: 100 }],
      colorsAngle: 0,
      positionX: options?.positionX ?? 0,
      positionY: options?.positionY ?? 0,
      positionZ: options?.positionZ ?? 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      grids: [],
      visibleFaces: [true, true, true, true, true, true],
      backfaceVisibility: false,
    }
  }

  /**
   * Creates a block from a template name
   */
  static createBlockFromTemplate(
    template: BlockTemplate,
    options?: {
      name?: string
      positionX?: number
      positionY?: number
      positionZ?: number
      left?: number
      bottom?: number
    },
  ): Block {
    switch (template) {
      case 'default':
        return this.createDefaultBlock(options)
      case 'small':
        return this.createSmallBlock(options)
      case 'empty':
        return this.createEmptyBlock(options)
      default:
        return this.createDefaultBlock(options)
    }
  }

  /**
   * Creates the default initial blocks for a new building
   * This replaces the hardcoded initialBlocks array
   */
  static createDefaultBlocks(): Block[] {
    return [
      this.createDefaultBlock({ name: 'block 1' }),
      this.createSmallBlock({
        name: 'block 2',
        left: -300,
        bottom: 0,
      }),
    ]
  }

  /**
   * Creates a new block with a grid (for UI "New Block" button)
   * Similar to what BuildingActions.createBlock() was doing
   */
  static createNewBlock(blockNumber: number, options?: { positionX?: number; left?: number; bottom?: number }): Block {
    const block = this.createEmptyBlock({
      name: `block ${blockNumber}`,
      width: 100,
      height: 100,
      long: 100,
      positionX: options?.positionX ?? 400,
    })
    // Add a default grid similar to what BuildingActions was creating
    block.grids = [GridFactory.createSmallGrid()]
    block.left = options?.left ?? -300
    block.bottom = options?.bottom ?? 0
    block.colors = [{ hex: '#ffffff', percentage: 100 }]
    block.visibleFaces = [true, true, true, true, true, true]
    block.backfaceVisibility = false
    return block
  }
}
