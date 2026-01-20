import { describe, it, expect } from 'vitest'
import { validateBuilding, validateBuildingWithErrors } from '@/utils/validation'
import type { Building, Block } from '@/types'

describe('validation', () => {
  describe('validateBuilding', () => {
    it('should validate a correct building', () => {
      const building: Building = {
        id: '1',
        name: 'Test Building',
        blocks: [
          {
            id: 'block-1',
            name: 'Block 1',
            width: 100,
            height: 100,
            long: 100,
            colors: [{ hex: '#ff0000', percentage: 100 }],
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            grids: [],
          },
        ],
      }

      expect(validateBuilding(building)).toBe(true)
    })

    it('should reject building with invalid color hex', () => {
      const building = {
        id: '1',
        name: 'Test Building',
        blocks: [
          {
            id: 'block-1',
            name: 'Block 1',
            width: 100,
            height: 100,
            long: 100,
            colors: [{ hex: 'invalid-color', percentage: 100 }],
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            grids: [],
          },
        ],
      }

      expect(validateBuilding(building)).toBe(false)
    })

    it('should reject building with empty blocks', () => {
      const building: Building = {
        id: '1',
        name: 'Test Building',
        blocks: [],
      }

      // Building with empty blocks should fail (min: 1)
      expect(validateBuilding(building)).toBe(false)
    })

    it('should reject building with missing required fields', () => {
      const building = {
        id: '1',
        // Missing name
        blocks: [],
      }

      expect(validateBuilding(building)).toBe(false)
    })
  })

  describe('validateBuildingWithErrors', () => {
    it('should return success with valid building', () => {
      const building: Building = {
        id: '1',
        name: 'Test Building',
        blocks: [
          {
            id: 'block-1',
            name: 'Block 1',
            width: 100,
            height: 100,
            long: 100,
            colors: [{ hex: '#ff0000', percentage: 100 }],
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            grids: [],
          },
        ],
      }

      const result = validateBuildingWithErrors(building)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.id).toBe('1')
      }
    })

    it('should return error details for invalid building', () => {
      const building = {
        id: '1',
        name: 'Test Building',
        blocks: [
          {
            id: 'block-1',
            name: 'Block 1',
            width: -100, // Invalid: negative width
            height: 100,
            long: 100,
            colors: [{ hex: '#ff0000', percentage: 100 }],
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            grids: [],
          },
        ],
      }

      const result = validateBuildingWithErrors(building)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeDefined()
      }
    })
  })
})
