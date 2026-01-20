import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Grid } from '@/types/grid'

export const useGridStore = defineStore('grid', () => {
  const isGridControlOpen = ref(false)
  const selectedGrid = ref<{ grid: Grid; blockId: string }>()

  const getSelectedGrid = computed(() => selectedGrid)

  function setGridControlOpen(isOpen: boolean) {
    isGridControlOpen.value = isOpen
  }

  function getGridControlOpen() {
    return isGridControlOpen.value
  }

  function setSelectedGrid(blockId: string, grid: Grid) {
    selectedGrid.value = { blockId, grid }
  }

  return { setSelectedGrid, getSelectedGrid, selectedGrid, setGridControlOpen, getGridControlOpen }
})
