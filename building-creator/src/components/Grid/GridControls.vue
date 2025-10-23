<!-- GridList.vue -->
<template>
  <div class="controls">
    <p class="close" @click="closeGridControls">X</p>
    <h2>Grid Controls:</h2>
    <hr />
    <button @click="createGrid">Create grid</button>
    <div class="grids-container" ref="gridsContainer">
      <GridControlsForm
        v-for="(grid, index) in grids"
        :key="grid.id"
        :grid="grid"
        :index="index"
        :cube="cube"
        :is-expanded="isGridExpanded[index]"
        :is-selected="selectedGrid?.id === grid.id"
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
import type { Cube } from '@/types/cube'
import { ref, watch, nextTick, useTemplateRef } from 'vue'
import { generateId } from '@/utils/generateId'
import GridControlsForm from './GridControlsForm.vue'

const props = defineProps<{
  cube: Cube
  grids: Grid[]
  selectedGrid?: Grid | undefined
}>()

const emit = defineEmits<{
  (e: 'update:isGridControlOpen', value: boolean): void
  (e: 'update:grids', grids: Grid[], cubeId: string): void
}>()

const isGridExpanded = ref(new Array(props.grids.length).fill(false))
const gridsContainer = ref(null)
const gridsRef = useTemplateRef('grids-ref')

const closeGridControls = () => {
  emit('update:isGridControlOpen', false)
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

const switchPosition = (index: number, flag: number) => {
  const switchIndex = index + flag
  if (switchIndex < 0 || switchIndex >= props.grids.length) return

  const currentGrid = { ...props.grids[index] }
  const gridToSwitch = { ...props.grids[switchIndex] }
  const updatedGrids = props.grids.map((grid) => {
    if (grid.id === currentGrid.id) return gridToSwitch
    if (grid.id === gridToSwitch.id) return currentGrid
    return grid
  })
  emitGridChanges(updatedGrids)
}

const emitGridChanges = (newGrids: Grid[]) => {
  emit('update:grids', newGrids, props.cube.id)
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
    console.log(previousSelectedGridIndex)
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

function scrollToTarget(selectedGridRef: any) {
  gridsContainer.value.scrollTop = selectedGridRef.offsetTop - 100
}

function addSelectedStyle(selectedGridRef: any) {
  selectedGridRef.classList.add('selected')
}

function removeSelectedStyle(lastGridRef: any) {
  if (lastGridRef) lastGridRef.classList.remove('selected')
}
</script>

<style scoped></style>
