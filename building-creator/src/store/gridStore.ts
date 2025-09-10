import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Grid } from '@/types/grid'

export const useGridStore = defineStore('row', () => {
  const selectedGrid = ref<{ grid: Grid; cubeId: string }>()

  const getSelectedGrid = computed(() => selectedGrid)

  function setSelectedGrid(cubeId: string, grid: Grid) {
    selectedGrid.value = { cubeId, grid }
  }

  return { setSelectedGrid, getSelectedGrid, selectedGrid }
})
