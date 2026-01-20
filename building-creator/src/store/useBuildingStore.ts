import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Building, Grid, Block } from '@/types'
import { generateId } from '@/utils/generateId'
import { BuildingService } from '@/services/buildingService'
import { BlockFactory } from '@/factories/BlockFactory'

export const useBuildingStore = defineStore('building', () => {
  // Reactive building state - blocks generated on-demand via factory
  const building = ref<Building>({
    id: generateId(),
    name: 'Building 1',
    blocks: BlockFactory.createDefaultBlocks(),
  })

  // Error state for UI feedback
  const error = ref<string | null>(null)

  function setError(errorMessage: string | null) {
    error.value = errorMessage
  }

  function clearError() {
    error.value = null
  }

  function newBuilding() {
    building.value = BuildingService.createNewBuilding()
    building.value.blocks = BlockFactory.createDefaultBlocks()
    clearError()
  }

  function updateBuildingBlock(newBlock: Block) {
    building.value.blocks = building.value.blocks.map((block: Block) => {
      if (block.id === newBlock.id) return newBlock
      return block
    })
  }

  const updateBlockGrids = (grids: Grid[], blockId: string) => {
    building.value.blocks = building.value.blocks.map((block: Block) => {
      if (block.id === blockId) {
        const newBlock = { ...block, grids }
        return newBlock
      }
      return block
    })
  }

  function isCurrentBuildingSaved() {
    return BuildingService.isBuildingSaved(building.value.id)
  }

  function loadBuildingList(): Building[] {
    const result = BuildingService.loadBuildings()
    if (!result.success) {
      setError(result.error || 'Failed to load buildings')
      return []
    }
    return result.data
  }

  function saveCurrentBuildingAsNew() {
    building.value.id = generateId()
    saveBuilding()
  }

  function saveBuilding() {
    clearError()
    const result = BuildingService.saveBuilding(building.value)
    if (!result.success) {
      setError(result.error || 'Failed to save building')
    }
  }

  const duplicateBlock = (block: Block) => {
    const newBlock = BuildingService.duplicateBlock(block)
    building.value.blocks.push(newBlock)
    return newBlock
  }

  const deleteBlock = (blockId: string) => {
    building.value.blocks = building.value.blocks.filter((block: Block) => block.id !== blockId)
  }

  function deleteBuilding(buildingId: string) {
    clearError()
    const result = BuildingService.deleteBuilding(buildingId)
    if (!result.success) {
      setError(result.error || 'Failed to delete building')
    }
  }

  function initializeDefaultBuildings() {
    clearError()
    const result = BuildingService.initializeDefaultBuildings()
    if (!result.success) {
      setError(result.error || 'Failed to initialize default buildings')
    }
  }

  function setBuilding(newBuilding: Building) {
    building.value = { ...newBuilding }
    clearError()
  }

  return {
    building,
    error,
    newBuilding,
    updateBuildingBlock,
    updateBlockGrids,
    loadBuildingList,
    saveBuilding,
    deleteBuilding,
    setBuilding,
    saveCurrentBuildingAsNew,
    isCurrentBuildingSaved,
    initializeDefaultBuildings,
    duplicateBlock,
    deleteBlock,
    setError,
    clearError,
  }
})
