import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Block } from '@/types/block'
import { useBuildingStore } from './useBuildingStore'

export const useBlockStore = defineStore('block', () => {
  const buildingStore = useBuildingStore()
  const selectedBlockId = ref('')

  const getSelectedBlockFromId = computed(() => {
    return buildingStore.building.blocks.find((block: Block) => block.id === selectedBlockId.value)
  })

  const setSelectedBlockId = (blockId: string) => {
    selectedBlockId.value = blockId
  }

  const clearSelectedBlock = () => {
    selectedBlockId.value = ''
  }

  return {
    clearSelectedBlock,
    setSelectedBlockId,
    getSelectedBlockFromId,
  }
})
