import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cube } from '@/types/cube'

export const useCubeStore = defineStore('cube', () => {
  const selectedCube = ref<{ cube: Cube }>()

  const getSelectedCube = computed(() => selectedCube)

  function setSelectedCube(cube: Cube) {
    selectedCube.value = { cube }
  }

  return { setSelectedCube, getSelectedCube }
})
