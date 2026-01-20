import type { Building } from '@/types'
import type { Result } from '@/types/result'
import { STORAGE_KEYS } from '@/constants'
import { validateBuilding, validateBuildingWithErrors } from '@/utils/validation'

/**
 * Service for handling localStorage operations with validation
 */
export class StorageService {
  /**
   * Load buildings from localStorage with validation
   */
  static loadBuildings(): Result<Building[], string> {
    try {
      const rawData = localStorage.getItem(STORAGE_KEYS.BUILDINGS)
      
      if (!rawData) {
        return { success: true, data: [] }
      }

      const parsed = JSON.parse(rawData) as unknown
      
      // Validate it's an array
      if (!Array.isArray(parsed)) {
        return {
          success: false,
          error: 'Invalid data format: expected array of buildings',
        }
      }

      // Validate each building
      const validBuildings: Building[] = []
      for (const item of parsed) {
        const validation = validateBuildingWithErrors(item)
        if (validation.success) {
          validBuildings.push(validation.data)
        } else {
          console.warn('Invalid building found in storage:', validation.error?.issues || validation.error)
        }
      }

      return { success: true, data: validBuildings }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return {
        success: false,
        error: `Failed to load buildings: ${errorMessage}`,
      }
    }
  }

  /**
   * Save buildings to localStorage
   */
  static saveBuildings(buildings: Building[]): Result<void, string> {
    try {
      // Validate all buildings before saving
      for (const building of buildings) {
        if (!validateBuilding(building)) {
          return {
            success: false,
            error: `Invalid building data: ${building.name || building.id}`,
          }
        }
      }

      localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(buildings))
      return { success: true, data: undefined }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return {
        success: false,
        error: `Failed to save buildings: ${errorMessage}`,
      }
    }
  }

  /**
   * Check if default buildings have been initialized
   */
  static isDefaultBuildingsInitialized(): boolean {
    return localStorage.getItem(STORAGE_KEYS.DEFAULT_BUILDINGS_INITIALIZED) === 'true'
  }

  /**
   * Mark default buildings as initialized
   */
  static markDefaultBuildingsInitialized(): void {
    localStorage.setItem(STORAGE_KEYS.DEFAULT_BUILDINGS_INITIALIZED, 'true')
  }

  /**
   * Clear all building data (for testing/reset)
   */
  static clearBuildings(): void {
    localStorage.removeItem(STORAGE_KEYS.BUILDINGS)
    localStorage.removeItem(STORAGE_KEYS.DEFAULT_BUILDINGS_INITIALIZED)
  }
}
