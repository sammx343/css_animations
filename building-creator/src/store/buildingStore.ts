import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Building, Cube } from '@/types'
import { generateId } from '@/utils/generateId'

export const useBuildingStore = defineStore('building', () => {
  const initialBlocks: Cube[] = [
    {
      id: generateId(),
      name: 'block 1',
      width: 300,
      height: 300,
      long: 300,
      colors: [{ hex: '#ff7360', percentage: 100 }],
      colorsAngle: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      grids: [
        {
          id: generateId(),
          name: 'Grid 0',
          rows: 5,
          columns: 5,
          excludedWindows: [],
          colors: [{ hex: '#000000', percentage: 100 }],
          colorsAngle: 0,
          top: '2%',
          left: '2%',
          windowWidth: '50',
          windowHeight: '50',
          gridWidth: '100',
          gridHeight: '100',
          rowGap: '5',
          columnGap: '5',
          borderRadius: '0%',
          excludedFaces: [5, 6],
          borderTop: {
            size: 0,
            style: 'none',
            color: '#000000',
          },
        },
      ],
    },
    {
      id: generateId(),
      name: 'block 2',
      width: 100,
      height: 100,
      long: 100,
      colors: [{ hex: '#ff0000', percentage: 100 }],
      colorsAngle: 0,
      left: -300,
      bottom: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      grids: [
        {
          id: generateId(),
          name: 'Grid 0',
          rows: 2,
          columns: 2,
          excludedWindows: [],
          colors: [{ hex: '#000000', percentage: 100 }],
          colorsAngle: 0,
          top: '0%',
          left: '0%',
          windowWidth: '40',
          windowHeight: '40',
          gridWidth: '100',
          gridHeight: '100',
          rowGap: '5px',
          columnGap: '5px',
          borderRadius: '0%',
          excludedFaces: [5, 6],
          borderTop: {
            size: 0,
            style: 'none',
            color: '#000000',
          },
        },
      ],
    },
  ]

  // Reactive building state
  const building = ref<Building>({
    id: generateId(),
    name: 'Building 1',
    blocks: initialBlocks,
  })

  function newBuilding() {
    building.value = {
      id: generateId(),
      name: 'Building 1',
      blocks: initialBlocks,
    }
  }

  function isCurrentBuildingSaved() {
    const buildings = loadBuildingList()
    if (typeof buildings !== 'string') {
      const foundBuildingIndex = buildings.findIndex(
        (currentBuilding) => currentBuilding.id === building.value.id,
      )
      return foundBuildingIndex !== -1
    }
    return false
  }

  function loadBuildingList(): Building[] | string {
    const unparsedBuildings = localStorage.getItem('buildings')
    let buildings: Building[] = []
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

  function saveCurrentBuildingAsNew() {
    building.value.id = generateId()
    saveBuilding()
  }

  function saveBuilding() {
    const buildings = loadBuildingList()
    if (typeof buildings !== 'string') {
      saveSingleBuilding(buildings, building.value)
    }
  }

  function saveSingleBuilding(buildings: Building[], buildingToSave: Building) {
    if (buildings.length > 0) {
      const foundBuildingIndex = buildings.findIndex(
        (currentBuilding) => currentBuilding.id === buildingToSave.id,
      )
      if (foundBuildingIndex === -1) {
        buildings.push(buildingToSave)
      } else {
        buildings[foundBuildingIndex] = buildingToSave
      }
    } else {
      buildings.push(buildingToSave)
    }
    localStorage.setItem('buildings', JSON.stringify(buildings))
  }

  function setBuilding(newBuilding: Building) {
    building.value = { ...newBuilding }
  }

  return {
    building,
    newBuilding,
    loadBuildingList,
    saveBuilding,
    setBuilding,
    saveCurrentBuildingAsNew,
    isCurrentBuildingSaved,
  }
})
