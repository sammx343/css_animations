import { describe, it, expect, beforeEach } from 'vitest'
import { StorageService } from '@/services/storageService'
import type { Building, Block } from '@/types'

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('loadBuildings', () => {
    it('should return empty array when no buildings are stored', () => {
      const result = StorageService.loadBuildings()
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual([])
      }
    })

    it('should load valid buildings from localStorage', () => {
      const buildings: Building[] = [
        {
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
        },
      ]

      localStorage.setItem('buildings', JSON.stringify(buildings))
      const result = StorageService.loadBuildings()

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toHaveLength(1)
        expect(result.data[0].name).toBe('Test Building')
      }
    })

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('buildings', 'invalid json')
      const result = StorageService.loadBuildings()

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toContain('Failed to load')
      }
    })

    it('should filter out invalid buildings', () => {
      const invalidData = [
        {
          id: '1',
          name: 'Valid Building',
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
        },
        { invalid: 'data' }, // Invalid building
      ]

      localStorage.setItem('buildings', JSON.stringify(invalidData))
      const result = StorageService.loadBuildings()

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toHaveLength(1)
        expect(result.data[0].name).toBe('Valid Building')
      }
    })
  })

  describe('saveBuildings', () => {
    it('should save valid buildings to localStorage', () => {
      const buildings: Building[] = [
        {
          id: '1',
          name: 'Test Building',
          blocks: [],
        },
      ]

      const result = StorageService.saveBuildings(buildings)
      expect(result.success).toBe(true)

      const saved = localStorage.getItem('buildings')
      expect(saved).toBeTruthy()
      if (saved) {
        const parsed = JSON.parse(saved)
        expect(parsed).toHaveLength(1)
        expect(parsed[0].name).toBe('Test Building')
      }
    })

    it('should reject invalid buildings', () => {
      const invalidBuildings = [
        {
          id: '1',
          // Missing required fields
        },
      ] as unknown as Building[]

      const result = StorageService.saveBuildings(invalidBuildings)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toContain('Invalid building')
      }
    })
  })

  describe('isDefaultBuildingsInitialized', () => {
    it('should return false when not initialized', () => {
      expect(StorageService.isDefaultBuildingsInitialized()).toBe(false)
    })

    it('should return true when initialized', () => {
      StorageService.markDefaultBuildingsInitialized()
      expect(StorageService.isDefaultBuildingsInitialized()).toBe(true)
    })
  })

  describe('clearBuildings', () => {
    it('should clear all building data', () => {
      localStorage.setItem('buildings', JSON.stringify([{ id: '1', name: 'Test', blocks: [] }]))
      StorageService.markDefaultBuildingsInitialized()

      StorageService.clearBuildings()

      expect(localStorage.getItem('buildings')).toBeNull()
      expect(StorageService.isDefaultBuildingsInitialized()).toBe(false)
    })
  })
})
