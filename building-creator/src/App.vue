<template>
  <main class="main">
    <div class="controls">
      <h2>Controls</h2>
      <div class="d-flex flex-start">
        <label>Building Name: </label>
        <h3><input id="building-name" type="text" v-model="buildingStore.building.name" /></h3>
      </div>
      <div class="flex">
        <button @click="buildingStore.newBuilding()">New Building</button>
        <button @click="buildingStore.saveBuilding()">Save Building</button>
        <button
          v-if="buildingStore.isCurrentBuildingSaved()"
          @click="buildingStore.saveCurrentBuildingAsNew()"
        >
          Save as new building
        </button>
        <button @click="openBuildingListModal()">Load Building</button>
      </div>
      <div class="controls-container" v-if="!isGridControlsOpen">
        <div
          class="cube-control"
          v-for="(block, index) in buildingStore.building.blocks"
          :key="index"
        >
          <hr />
          <div class="d-flex flex-start">
            <label>Name: </label>
            <h3><input :id="`name-${block.id}`" type="text" v-model="block.name" /></h3>
          </div>

          <div class="expandable-icon" @click="changeExpand(index)">
            <v-icon v-if="isBlockExpanded[index]" name="bi-arrow-up" style="fill: black" />
            <v-icon v-else name="bi-arrow-down" style="fill: black" />
          </div>
          <div class="d-flex">
            <button class="grid-button duplicate-grid" @click="duplicateBlock(block)">
              <v-icon name="hi-duplicate" />Duplicate
            </button>

            <div class="cube-controls--group">
              <button
                class="button"
                @click="openGridControl(true, block)"
                style="background: violet"
              >
                Grid options
              </button>
            </div>
            <button
              v-if="index != 0"
              class="grid-button delete-grid"
              @click="deleteBlock(block.id)"
            >
              <v-icon name="md-deleteforever-outlined"></v-icon> Delete
            </button>
          </div>
          <div class="expandable" :class="{ expanded: isBlockExpanded[index] }">
            <CubeControls
              v-if="!isGridControlsOpen"
              :cube-properties="block"
              @update:cube-properties="updateCubeProperties"
              @update:is-grid-control-open="(value) => openGridControl(value, block)"
              :zoom="zoom"
            />
          </div>
        </div>
        <button @click="createBlock">Create New Block</button>
      </div>
      <GridControls
        v-if="isGridControlsOpen && selectedCube"
        :selected-grid="selectedGrid"
        :cube="selectedCube"
        :grids="selectedCube.grids"
        @update:grids="updateGrids"
        @update:is-grid-control-open="openGridControl(false, null)"
      />
    </div>
    <CubeScene :zoom="zoom" @update:zoom="updateZoom" :blocks="buildingStore.building.blocks" />
    <Modal v-if="showBuildingsModal" @close-modal="closeLoadBuildingsModal">
      <BuildingList @selected-building="closeLoadBuildingsModal"></BuildingList>
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, onBeforeMount } from 'vue'
import Modal from './components/UI/Modal.vue'
import CubeScene from './components/Cube/CubeScene.vue'
import CubeControls from './components/Cube/CubeControls.vue'
import GridControls from './components/Grid/GridControls.vue'
import type { Cube } from '@/types/cube'
import type { Grid } from '@/types/grid'
import { generateId } from './utils/generateId'
import { useGridStore } from '@/store/gridStore'
import { useCubeStore } from './store/cubeStore'
import { useBuildingStore } from './store/buildingStore'
import BuildingList from './components/BuildingList.vue'

const buildingStore = useBuildingStore()
const gridStore = useGridStore()
const cubeStore = useCubeStore()
const selectedGrid = ref<{ cubeId: string; grid: Grid }>()
const selectedCube = ref<Cube>()
const showBuildingsModal = ref(false)
const zoom = ref('1')
const isGridControlsOpen = ref(false)
const isBlockExpanded = ref(new Array(buildingStore.building.blocks.length).fill(false))

const changeExpand = (index: number) => {
  isBlockExpanded.value[index] = !isBlockExpanded.value[index]
}

const closeLoadBuildingsModal = () => {
  showBuildingsModal.value = false
}

const openBuildingListModal = () => {
  showBuildingsModal.value = true
}

const createBlock = () => {
  const newBlock: Cube = {
    id: generateId(),
    name: `block ${buildingStore.building.blocks.length + 1}`,
    width: 100,
    height: 100,
    long: 100,
    colors: [{ hex: '#ffffff', percentage: 100 }],
    colorsAngle: 0,
    left: -300,
    bottom: 0,
    positionX: 400,
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
  }
  buildingStore.building.blocks.push(newBlock)
}

const deleteBlock = (blockId: string) => {
  buildingStore.building.blocks = buildingStore.building.blocks.filter(
    (block) => block.id !== blockId,
  )
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
  buildingStore.building.blocks.push(deepCloneBlocked)
  expandBlock(deepCloneBlocked)
}

const updateCubeProperties = (newBlock: Cube) => {
  buildingStore.building.blocks = buildingStore.building.blocks.map((block: Cube) => {
    if (block.id === newBlock.id) return newBlock
    return block
  })
}

const updateGrids = (grids: Grid[], cubeId: string) => {
  buildingStore.building.blocks = buildingStore.building.blocks.map((block: Cube) => {
    if (block.id === cubeId) {
      const newBlock = { ...block, grids }
      selectedCube.value = newBlock
      return newBlock
    }
    return block
  })
}

watch(gridStore.getSelectedGrid, async (value) => {
  isGridControlsOpen.value = true
  await nextTick()
  selectedGrid.value = value?.grid
  selectedCube.value = buildingStore.building.blocks.find(
    (reactiveBlock) => reactiveBlock.id === value?.cubeId,
  )
})

watch(cubeStore.getSelectedCube, async (value) => {
  isGridControlsOpen.value = false
  selectedCube.value = value?.cube
  expandBlock(value?.cube)
})

const expandBlock = (cube: Cube | undefined) => {
  if (!cube) return
  isBlockExpanded.value = new Array(buildingStore.building.blocks.length).fill(false)
  const selectedBlockIndex = buildingStore.building.blocks.findIndex(
    (block) => block.id === cube.id,
  )
  isBlockExpanded.value[selectedBlockIndex] = true
}

const openGridControl = (value: boolean, cube: Cube | null) => {
  isGridControlsOpen.value = value
  if (cube) selectedCube.value = cube
}

const updateZoom = (value: string) => {
  zoom.value = value
}

onBeforeMount(() => {
  buildingStore.initializeDefaultBuildings()
})
</script>

<style scoped>
.controls-container {
  max-height: 80vh;
  overflow-y: scroll;
}

.expandable {
  max-height: 0vh;
  overflow: hidden;
}

.expandable.expanded {
  max-height: 200vh;
}

.expandable-icon {
  display: flex;
  justify-content: center;
  background: bisque;
  border-radius: 10px;
  font-family: system-ui;
  border: 2px solid black;
  cursor: pointer;
}

.main {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
