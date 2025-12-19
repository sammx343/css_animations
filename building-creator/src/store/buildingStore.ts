import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Building, Cube, Grid } from '@/types'
import { generateId } from '@/utils/generateId'
import defaultBuildingsData from '@/assets/data/buildings.json'

export const useBuildingStore = defineStore('building', () => {
  const DEFAULT_BUILDINGS_KEY = 'default_buildings_initialized'
  const BUILDINGS_KEY = 'buildings'

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

  function updateBuildingBlock(newBlock: Cube) {
    building.value.blocks = building.value.blocks.map((block: Cube) => {
      if (block.id === newBlock.id) return newBlock
      return block
    })
  }

  const updateBlockGrids = (grids: Grid[], cubeId: string) => {
    building.value.blocks = building.value.blocks.map((block: Cube) => {
      if (block.id === cubeId) {
        const newBlock = { ...block, grids }
        return newBlock
      }
      return block
    })
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
    const unparsedBuildings = localStorage.getItem(BUILDINGS_KEY)
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

  const duplicateBlock = (block: Cube) => {
    const newBlock: Cube = {
      ...block,
      name: block.name + ' copy',
      id: generateId(),
      grids: block.grids.map((grid: Grid) => ({
        ...grid,
        id: generateId(),
      })),
    }
    const deepCloneBlocked = JSON.parse(JSON.stringify(newBlock))
    building.value.blocks.push(deepCloneBlocked)
    return deepCloneBlocked
  }

  const deleteBlock = (blockId: string) => {
    building.value.blocks = building.value.blocks.filter((block: Cube) => block.id !== blockId)
  }

  function deleteBuilding(buildingId: string) {
    const buildings = loadBuildingList()

    if (typeof buildings !== 'string' && buildings.length > 0) {
      const filteredBuildings = buildings.filter((building) => {
        return building.id !== buildingId
      })

      localStorage.setItem(BUILDINGS_KEY, JSON.stringify(filteredBuildings))
    }
  }

  function initializeDefaultBuildings() {
    const alreadyInitialized = localStorage.getItem(DEFAULT_BUILDINGS_KEY)
    if (alreadyInitialized) return

    // Load from JSON
    const defaultBuildings: Building[] = defaultBuildingsData // imported below

    const existing = loadBuildingList()
    if (typeof existing === 'string') {
      // Corrupted? Reset
      localStorage.setItem(BUILDINGS_KEY, JSON.stringify(defaultBuildings))
    } else {
      // Merge: only add defaults that don't exist
      const merged = [...existing]
      defaultBuildings.forEach((defaultBldg) => {
        if (!merged.some((b) => b.id === defaultBldg.id)) {
          merged.push(defaultBldg)
        }
      })
      localStorage.setItem(BUILDINGS_KEY, JSON.stringify(merged))
    }

    localStorage.setItem(DEFAULT_BUILDINGS_KEY, 'true')
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
    localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildings))
  }

  function setBuilding(newBuilding: Building) {
    building.value = { ...newBuilding }
  }

  return {
    building,
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
  }
})
