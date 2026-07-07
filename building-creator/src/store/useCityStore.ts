import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Building } from '@/types/building'

export const useCityStore = defineStore('city', () => {
  const cityBuildings = ref<Building[]>([])

  function addBuilding(building: Building) {
    // Evitar duplicados por ID
    if (!cityBuildings.value.find((b) => b.id === building.id)) {
      cityBuildings.value.push(building)
    }
  }

  function addBuildings(buildings: Building[]) {
    buildings.forEach((building) => {
      addBuilding(building)
    })
  }

  function removeBuilding(index: number) {
    cityBuildings.value.splice(index, 1)
  }

  function clearCity() {
    cityBuildings.value = []
  }

  function getCityBuildings(): Building[] {
    return cityBuildings.value
  }

  return {
    cityBuildings,
    addBuilding,
    addBuildings,
    removeBuilding,
    clearCity,
    getCityBuildings,
  }
})
