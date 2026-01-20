import type { Building, Block } from '@/types'
import type { Result } from '@/types/result'
import { StorageService } from './storageService'
import { generateId } from '@/utils/generateId'
import { validateBuildingWithErrors } from '@/utils/validation'
import defaultBuildingsData from '@/assets/data/buildings.json'

/**
 * Service for building business logic
 */
export class BuildingService {
  /**
   * Create a new empty building
   */
  static createNewBuilding(): Building {
    return {
      id: generateId(),
      name: 'Building 1',
      blocks: [],
    }
  }

  /**
   * Duplicate a block with new IDs
   */
  static duplicateBlock(block: Block): Block {
    const newBlock: Block = {
      ...block,
      name: block.name + ' copy',
      id: generateId(),
      grids: block.grids.map((grid) => ({
        ...grid,
        id: generateId(),
      })),
    }
    // Deep clone to avoid reference issues
    return structuredClone(newBlock)
  }

  /**
   * Load all buildings from storage
   */
  static loadBuildings(): Result<Building[], string> {
    return StorageService.loadBuildings()
  }

  /**
   * Initialize default buildings from JSON
   */
  static initializeDefaultBuildings(): { success: boolean; error?: string } {
    if (StorageService.isDefaultBuildingsInitialized()) {
      return { success: true }
    }

    try {
      // Load and validate default buildings
      const defaultBuildingsRaw = defaultBuildingsData as unknown
      const existingResult = StorageService.loadBuildings()

      // Validate and normalize default buildings
      const defaultBuildings: Building[] = []
      if (Array.isArray(defaultBuildingsRaw)) {
        for (const item of defaultBuildingsRaw) {
          const validation = validateBuildingWithErrors(item)
          if (validation.success) {
            defaultBuildings.push(validation.data)
          }
        }
      }

      if (!existingResult.success) {
        // Corrupted? Reset with defaults
        const saveResult = StorageService.saveBuildings(defaultBuildings)
        if (saveResult.success) {
          StorageService.markDefaultBuildingsInitialized()
          return { success: true }
        }
        return { success: false, error: saveResult.error }
      }

      // Merge: only add defaults that don't exist
      const merged = [...existingResult.data]
      defaultBuildings.forEach((defaultBldg) => {
        if (!merged.some((b) => b.id === defaultBldg.id)) {
          merged.push(defaultBldg)
        }
      })

      const saveResult = StorageService.saveBuildings(merged)
      if (saveResult.success) {
        StorageService.markDefaultBuildingsInitialized()
        return { success: true }
      }
      return { success: false, error: saveResult.error }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return { success: false, error: `Failed to initialize: ${errorMessage}` }
    }
  }

  /**
   * Save a building (create or update)
   */
  static saveBuilding(building: Building): { success: boolean; error?: string } {
    const buildingsResult = StorageService.loadBuildings()
    if (!buildingsResult.success) {
      return { success: false, error: buildingsResult.error }
    }

    const buildings = buildingsResult.data
    const foundIndex = buildings.findIndex((b) => b.id === building.id)

    if (foundIndex === -1) {
      buildings.push(building)
    } else {
      buildings[foundIndex] = building
    }

    const saveResult = StorageService.saveBuildings(buildings)
    if (!saveResult.success) {
      return { success: false, error: saveResult.error }
    }

    return { success: true }
  }

  /**
   * Delete a building by ID
   */
  static deleteBuilding(buildingId: string): { success: boolean; error?: string } {
    const buildingsResult = StorageService.loadBuildings()
    if (!buildingsResult.success) {
      return { success: false, error: buildingsResult.error }
    }

    const filtered = buildingsResult.data.filter((b) => b.id !== buildingId)
    const saveResult = StorageService.saveBuildings(filtered)

    if (!saveResult.success) {
      return { success: false, error: saveResult.error }
    }

    return { success: true }
  }

  /**
   * Check if a building exists in storage
   */
  static isBuildingSaved(buildingId: string): boolean {
    const result = StorageService.loadBuildings()
    if (!result.success) {
      return false
    }
    return result.data.some((b) => b.id === buildingId)
  }
}
