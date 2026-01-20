import { describe, it, expect } from 'vitest'
import { BlockFactory } from '@/factories/BlockFactory'

describe('BlockFactory', () => {
  describe('createDefaultBlock', () => {
    it('should create a block with default values', () => {
      const block = BlockFactory.createDefaultBlock()

      expect(block).toBeDefined()
      expect(block.id).toBeDefined()
      expect(block.name).toBe('block 1')
      expect(block.width).toBe(300)
      expect(block.height).toBe(300)
      expect(block.long).toBe(300)
      expect(block.colors).toHaveLength(1)
      expect(block.colors[0].hex).toBe('#ff7360')
      expect(block.grids).toHaveLength(1)
      expect(block.positionX).toBe(0)
      expect(block.positionY).toBe(0)
      expect(block.positionZ).toBe(0)
    })

    it('should create a block with custom options', () => {
      const block = BlockFactory.createDefaultBlock({
        name: 'Custom Block',
        positionX: 100,
        positionY: 200,
        positionZ: 50,
      })

      expect(block.name).toBe('Custom Block')
      expect(block.positionX).toBe(100)
      expect(block.positionY).toBe(200)
      expect(block.positionZ).toBe(50)
    })

    it('should generate unique IDs for each block', () => {
      const block1 = BlockFactory.createDefaultBlock()
      const block2 = BlockFactory.createDefaultBlock()

      expect(block1.id).not.toBe(block2.id)
    })

    it('should create blocks with unique grid IDs', () => {
      const block1 = BlockFactory.createDefaultBlock()
      const block2 = BlockFactory.createDefaultBlock()

      expect(block1.grids[0].id).not.toBe(block2.grids[0].id)
    })
  })

  describe('createSmallBlock', () => {
    it('should create a small block (100x100x100)', () => {
      const block = BlockFactory.createSmallBlock()

      expect(block.width).toBe(100)
      expect(block.height).toBe(100)
      expect(block.long).toBe(100)
      expect(block.colors[0].hex).toBe('#ff0000')
      expect(block.grids).toHaveLength(1)
      expect(block.grids[0].rows).toBe(2)
      expect(block.grids[0].columns).toBe(2)
    })

    it('should accept position and layout options', () => {
      const block = BlockFactory.createSmallBlock({
        left: -300,
        bottom: 0,
        positionX: 50,
      })

      expect(block.left).toBe(-300)
      expect(block.bottom).toBe(0)
      expect(block.positionX).toBe(50)
    })
  })

  describe('createEmptyBlock', () => {
    it('should create a block without grids', () => {
      const block = BlockFactory.createEmptyBlock()

      expect(block.grids).toHaveLength(0)
      expect(block.width).toBe(100)
      expect(block.height).toBe(100)
      expect(block.long).toBe(100)
      expect(block.colors[0].hex).toBe('#ffffff')
    })

    it('should accept custom dimensions', () => {
      const block = BlockFactory.createEmptyBlock({
        width: 200,
        height: 150,
        long: 250,
      })

      expect(block.width).toBe(200)
      expect(block.height).toBe(150)
      expect(block.long).toBe(250)
    })
  })

  describe('createBlockFromTemplate', () => {
    it('should create default block from template', () => {
      const block = BlockFactory.createBlockFromTemplate('default')

      expect(block.width).toBe(300)
      expect(block.height).toBe(300)
      expect(block.grids.length).toBeGreaterThan(0)
    })

    it('should create small block from template', () => {
      const block = BlockFactory.createBlockFromTemplate('small')

      expect(block.width).toBe(100)
      expect(block.height).toBe(100)
      expect(block.grids).toHaveLength(1)
    })

    it('should create empty block from template', () => {
      const block = BlockFactory.createBlockFromTemplate('empty')

      expect(block.grids).toHaveLength(0)
    })

    it('should default to default template for unknown template', () => {
      const block = BlockFactory.createBlockFromTemplate('unknown' as any)

      expect(block.width).toBe(300) // Default template
    })
  })

  describe('createDefaultBlocks', () => {
    it('should create an array of default blocks', () => {
      const blocks = BlockFactory.createDefaultBlocks()

      expect(blocks).toHaveLength(2)
      expect(blocks[0].name).toBe('block 1')
      expect(blocks[1].name).toBe('block 2')
      expect(blocks[0].width).toBe(300) // First is default
      expect(blocks[1].width).toBe(100) // Second is small
    })

    it('should generate unique IDs for all blocks', () => {
      const blocks = BlockFactory.createDefaultBlocks()

      expect(blocks[0].id).not.toBe(blocks[1].id)
      expect(blocks[0].grids[0].id).not.toBe(blocks[1].grids[0].id)
    })

    it('should create fresh blocks each time', () => {
      const blocks1 = BlockFactory.createDefaultBlocks()
      const blocks2 = BlockFactory.createDefaultBlocks()

      expect(blocks1[0].id).not.toBe(blocks2[0].id)
      expect(blocks1[1].id).not.toBe(blocks2[1].id)
    })
  })

  describe('createNewBlock', () => {
    it('should create a block for UI "New Block" button', () => {
      const block = BlockFactory.createNewBlock(3)

      expect(block.name).toBe('block 3')
      expect(block.width).toBe(100)
      expect(block.height).toBe(100)
      expect(block.long).toBe(100)
      expect(block.positionX).toBe(400)
      expect(block.left).toBe(-300)
      expect(block.bottom).toBe(0)
      expect(block.colors[0].hex).toBe('#ffffff')
      expect(block.grids).toHaveLength(1)
      expect(block.grids[0].rows).toBe(2)
    })

    it('should accept custom position options', () => {
      const block = BlockFactory.createNewBlock(5, {
        positionX: 200,
        left: -100,
        bottom: 50,
      })

      expect(block.positionX).toBe(200)
      expect(block.left).toBe(-100)
      expect(block.bottom).toBe(50)
    })
  })
})
