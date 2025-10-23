import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cube } from '@/types/cube'
import type { Building } from '@/types/building'
export const useBuildingStore = defineStore('building', () => {
  const selectedCube = ref<{ building: Cube[] }>()

  const getSelectedCube = computed(() => selectedCube)

  function setSelectedCube(cube: Cube[]) {}

  function loadBuildings() {
    const buildings = getParsedBuildings()
    return buildings
  }

  function getParsedBuildings(): Building[] | string {
    const unparsedBuildings = localStorage.getItem('buildings')
    let buildings = []
    try {
      if (unparsedBuildings) {
        buildings = JSON.parse(unparsedBuildings)
      }
      return buildings
    } catch (e) {
      console.log(e)
      return 'Buildings could not be fetched, list got corrupted'
    }
  }

  function saveBuilding(building: Building) {
    const buildings = getParsedBuildings()

    if (typeof buildings !== 'string') {
      saveSingleBuilding(buildings, building)
    }
  }

  function saveSingleBuilding(buildings: Building[], building: Building) {
    if (buildings.length > 0) {
      const foundBuildingIndex = buildings.findIndex(
        (currentBuilding) => currentBuilding.id === building.id,
      )

      //If building with same id was not found
      if (foundBuildingIndex === -1) {
        buildings.push(building)
      } else {
        //If building with same id already exist
        buildings[foundBuildingIndex] = building
      }
    } else {
      //If building list is empty
      buildings.push(building)
    }
    localStorage.setItem(`buildings`, JSON.stringify(buildings))
  }

  return { setSelectedCube, getSelectedCube, saveBuilding, loadBuildings }
})
