<template>
  <div class="building-actions">
    <button @click="buildingStore.newBuilding()">New Building</button>
    <button @click="buildingStore.saveBuilding()">Save Building</button>
    <button
      v-if="buildingStore.isCurrentBuildingSaved()"
      @click="buildingStore.saveCurrentBuildingAsNew()"
    >
      Save as New
    </button>
    <button @click="$emit('open-building-list')">Load Building</button>
  </div>
  <div class="add-block-section">
    <button class="primary" @click="createBlock">+ Create New Block</button>
  </div>
</template>

<script setup lang="ts">
import { useBuildingStore } from '@/store/useBuildingStore'

const buildingStore = useBuildingStore()
import { generateId } from '@/utils/generateId'
import type { Block } from '@/types/block'

const createBlock = () => {
  const newBlock: Block = {
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
</script>

<style scoped>
.building-actions {
  gap: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
}
.add-block-section {
  margin-top: 1rem;
}
.primary {
  background: #4caf50;
  color: white;
  font-weight: bold;
}
</style>
