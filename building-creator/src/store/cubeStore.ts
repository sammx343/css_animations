import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Cube } from '@/types/cube'
import { useBuildingStore } from './buildingStore'

export const useCubeStore = defineStore('cube', () => {
  const buildingStore = useBuildingStore()
  const selectedCube = ref<{ cube: Cube }>()
  const selectedCubeId = ref('')

  const getSelectedCube = computed(() => selectedCube)

  const getSelectedCubeFromId = computed(() => {
    return buildingStore.building.blocks.find((block: Cube) => block.id === selectedCubeId.value)
  })

  const setSelectedCubeId = (cubeId: string) => {
    selectedCubeId.value = cubeId
  }

  function setSelectedCube(cube: Cube) {
    selectedCube.value = { cube }
  }

  return { setSelectedCube, getSelectedCube, setSelectedCubeId, getSelectedCubeFromId }
})
