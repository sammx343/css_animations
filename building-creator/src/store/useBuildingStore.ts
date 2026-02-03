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

  // Notification state for action feedback
  type NotificationType = {
    variant: 'success' | 'error'
    title: string
    description: string
  }
  const notification = ref<NotificationType | null>(null)

  function setError(errorMessage: string | null) {
    error.value = errorMessage
  }

  function clearError() {
    error.value = null
  }

  function setNotification(notif: NotificationType | null) {
    console.log('setNotification', notif)
    notification.value = notif
  }

  function clearNotification() {
    notification.value = null
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
    console.log('does something')
    clearError()
    const result = BuildingService.saveBuilding(building.value)
    console.log('saveBuilding', result)
    if (!result.success) {
      setError(result.error || 'Failed to save building')
      setNotification({
        variant: 'error',
        title: 'Save Failed',
        description: result.error || 'Failed to save building',
      })
    } else {
      setNotification({
        variant: 'success',
        title: 'Building Saved',
        description: `${building.value.name} has been saved successfully.`,
      })
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
    // Get building name before deleting for notification
    const buildings = loadBuildingList()
    const buildingToDelete = buildings.find((b) => b.id === buildingId)
    const buildingName = buildingToDelete?.name || 'Building'

    const result = BuildingService.deleteBuilding(buildingId)

    if (!result.success) {
      setError(result.error || 'Failed to delete building')
      setNotification({
        variant: 'error',
        title: 'Delete Failed',
        description: result.error || 'Failed to delete building',
      })
    } else {
      setNotification({
        variant: 'success',
        title: 'Building Deleted',
        description: `Building ${buildingName} was successfully deleted.`,
      })
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
    notification,
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
    setNotification,
    clearNotification,
  }
})
