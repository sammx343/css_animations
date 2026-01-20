import { describe, it, expect, beforeEach } from 'vitest'
import { BuildingService } from '@/services/buildingService'
import { StorageService } from '@/services/storageService'
import type { Building, Block } from '@/types'

describe('BuildingService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('createNewBuilding', () => {
    it('should create a new building with empty blocks', () => {
      const building = BuildingService.createNewBuilding()

      expect(building).toHaveProperty('id')
      expect(building).toHaveProperty('name', 'Building 1')
      expect(building.blocks).toEqual([])
    })
  })

  describe('duplicateBlock', () => {
    it('should duplicate a block with new IDs', () => {
      const block: Block = {
        id: 'original-id',
        name: 'Original Block',
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
        grids: [
          {
            id: 'grid-1',
            name: 'Grid 1',
            rows: 2,
            columns: 2,
            colors: [{ hex: '#000000', percentage: 100 }],
            colorsAngle: 0,
            top: '0%',
            left: '0%',
            windowWidth: '40',
            windowHeight: '40',
            gridWidth: '100',
            gridHeight: '100',
            rowGap: '5',
            columnGap: '5',
            excludedFaces: [],
          },
        ],
      }

      const duplicated = BuildingService.duplicateBlock(block)

      expect(duplicated.id).not.toBe(block.id)
      expect(duplicated.name).toBe('Original Block copy')
      expect(duplicated.grids[0].id).not.toBe(block.grids[0].id)
      expect(duplicated.width).toBe(block.width)
    })
  })

  describe('saveBuilding', () => {
    it('should save a new building', () => {
      const building: Building = {
        id: '1',
        name: 'Test Building',
        blocks: [],
      }

      const result = BuildingService.saveBuilding(building)
      expect(result.success).toBe(true)

      const loadResult = BuildingService.loadBuildings()
      expect(loadResult.success).toBe(true)
      if (loadResult.success) {
        expect(loadResult.data).toHaveLength(1)
        expect(loadResult.data[0].id).toBe('1')
      }
    })

    it('should update an existing building', () => {
      const building: Building = {
        id: '1',
        name: 'Original Name',
        blocks: [],
      }

      BuildingService.saveBuilding(building)

      const updatedBuilding: Building = {
        ...building,
        name: 'Updated Name',
      }

      const result = BuildingService.saveBuilding(updatedBuilding)
      expect(result.success).toBe(true)

      const loadResult = BuildingService.loadBuildings()
      expect(loadResult.success).toBe(true)
      if (loadResult.success) {
        expect(loadResult.data).toHaveLength(1)
        expect(loadResult.data[0].name).toBe('Updated Name')
      }
    })
  })

  describe('deleteBuilding', () => {
    it('should delete a building by ID', () => {
      const building1: Building = { id: '1', name: 'Building 1', blocks: [] }
      const building2: Building = { id: '2', name: 'Building 2', blocks: [] }

      BuildingService.saveBuilding(building1)
      BuildingService.saveBuilding(building2)

      const result = BuildingService.deleteBuilding('1')
      expect(result.success).toBe(true)

      const loadResult = BuildingService.loadBuildings()
      expect(loadResult.success).toBe(true)
      if (loadResult.success) {
        expect(loadResult.data).toHaveLength(1)
        expect(loadResult.data[0].id).toBe('2')
      }
    })
  })

  describe('isBuildingSaved', () => {
    it('should return true if building exists', () => {
      const building: Building = { id: '1', name: 'Test', blocks: [] }
      BuildingService.saveBuilding(building)

      expect(BuildingService.isBuildingSaved('1')).toBe(true)
    })

    it('should return false if building does not exist', () => {
      expect(BuildingService.isBuildingSaved('999')).toBe(false)
    })
  })

  describe('loadBuildings', () => {
    it('should load all buildings from storage', () => {
      const building: Building = { id: '1', name: 'Test', blocks: [] }
      BuildingService.saveBuilding(building)

      const result = BuildingService.loadBuildings()
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toHaveLength(1)
      }
    })
  })
})
