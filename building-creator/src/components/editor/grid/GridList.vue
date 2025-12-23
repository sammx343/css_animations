<!-- GridList.vue -->
<template>
  <div class="controls">
    <p class="close" style="cursor: pointer" @click="closeGridControl">X</p>
    <h2>Grid Controls:</h2>
    <hr />
    <button @click="createGrid">Create grid</button>
    <div class="grids-container" ref="gridsContainer">
      <GridControlForm
        v-for="(grid, index) in grids"
        :key="grid.id"
        :grid="grid"
        :index="index"
        :block="block"
        :is-expanded="isGridExpanded[index]"
        :is-selected="selectedGrid?.id === grid.id"
        :cant-switch-up="index <= 0"
        :cant-switch-down="index >= grids.length - 1"
        @update:grid="updateGrid"
        @duplicate="duplicateGrid"
        @delete="deleteGrid"
        @switch-position="switchPosition"
        @toggle-expand="changeExpand"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Grid } from '@/types/grid'
import type { Block } from '@/types/block'
import { ref, watch, nextTick } from 'vue'
import { generateId } from '@/utils/generateId'
import GridControlForm from '../grid/GridControlForm.vue'
import { useBlockStore } from '@/store/useBlockStore'
import { useGridStore } from '@/store/useGridStore'

const props = defineProps<{
  block: Block
  grids: Grid[]
  selectedGrid?: Grid | undefined
}>()

const emit = defineEmits<{
  (e: 'update:grids', grids: Grid[], blockId: string): void
}>()

const blockStore = useBlockStore()
const gridStore = useGridStore()

const isGridExpanded = ref(new Array(props.grids.length).fill(false))
const gridsContainer = ref(null)

const closeGridControl = () => {
  blockStore.clearSelectedBlock()
  gridStore.setGridControlOpen(false)
}

const createGrid = () => {
  const newGrid: Grid = {
    name: `grid ${props.grids.length}`,
    id: generateId(),
    rows: 5,
    columns: 5,
    excludedWindows: [],
    colorsAngle: 0,
    colors: [{ hex: '#000000', percentage: 100 }],
    top: '2',
    left: '2',
    windowWidth: '50',
    windowHeight: '50',
    gridWidth: '50',
    gridHeight: '50',
    rowGap: '5',
    columnGap: '5',
    borderRadius: '0',
    excludedFaces: [5, 6],
  }
  emitGridChanges([...props.grids, newGrid])
}

const changeExpand = (index: number) => {
  isGridExpanded.value[index] = !isGridExpanded.value[index]
}

const updateGrid = (updatedGrid: Grid) => {
  const updatedGrids = props.grids.map((grid) => (grid.id === updatedGrid.id ? updatedGrid : grid))
  emitGridChanges(updatedGrids)
}

const duplicateGrid = (grid: Grid) => {
  const newGrid = {
    ...grid,
    id: generateId(),
    name: grid.name + ' duplicated',
  }
  emitGridChanges([...props.grids, JSON.parse(JSON.stringify(newGrid))])
}

const deleteGrid = (id: string) => {
  const grids = props.grids.filter((grid) => grid.id !== id)
  emitGridChanges(grids)
}

const switchPosition = async (index: number, flag: number) => {
  const switchIndex = index + flag
  if (switchIndex < 0 || switchIndex >= props.grids.length) return

  const currentGrid = { ...props.grids[index] }
  const gridToSwitch = { ...props.grids[switchIndex] }
  const updatedGrids = props.grids.map((grid) => {
    if (grid.id === currentGrid.id) return gridToSwitch
    if (grid.id === gridToSwitch.id) return currentGrid
    return grid
  })

  //Opens and closes the current expanded grid array
  isGridExpanded.value[index] = false
  isGridExpanded.value[switchIndex] = true

  emitGridChanges(updatedGrids)

  await nextTick()
  if (gridsContainer.value && gridsContainer.value.children[switchIndex]) {
    console.dir(gridsContainer.value?.children[switchIndex])
    scrollToTarget(gridsContainer.value?.children[switchIndex])
  }
}

const emitGridChanges = (newGrids: Grid[]) => {
  emit('update:grids', newGrids, props.block.id)
}

watch(
  () => props.selectedGrid,
  async (value: Grid | undefined, lastValue: Grid | undefined) => {
    if (!value) {
      isGridExpanded.value = new Array(props.grids.length).fill(false)
      return
    }

    const selectedGridIndex = props.grids.findIndex((grid) => value.id === grid.id)
    if (selectedGridIndex === -1) return

    await nextTick()

    if (!gridsContainer.value || gridsContainer.value[selectedGridIndex]) return

    isGridExpanded.value = new Array(props.grids.length).fill(false)
    const selectedGridRef = gridsContainer.value?.children[selectedGridIndex]
    const previousSelectedGridIndex = props.grids.findIndex((grid) => lastValue?.id === grid.id)

    const previousSelectedGridRef =
      previousSelectedGridIndex >= 0
        ? gridsContainer.value[selectedGridIndex]?.children.length
        : null

    removeSelectedStyle(previousSelectedGridRef)
    isGridExpanded.value[selectedGridIndex] = true
    await nextTick()

    scrollToTarget(selectedGridRef)

    addSelectedStyle(selectedGridRef)
  },
  { deep: true, immediate: true },
)

async function scrollToTarget(selectedGridRef: HTMLElement) {
  if (!selectedGridRef) return

  selectedGridRef.scrollIntoView({
    block: 'start',
  })
}
function addSelectedStyle(selectedGridRef: any) {
  selectedGridRef.classList.add('selected')
}

function removeSelectedStyle(lastGridRef: any) {
  if (lastGridRef) lastGridRef.classList.remove('selected')
}
</script>
<style scoped>
.grids-container {
  max-height: 80vh;
  padding-bottom: 20px;
  overflow-y: scroll;
}
</style>
