<template>
  <div class="building-actions">
    <button class="button flex" @click="buildingStore.newBuilding()">
      <v-icon name="md-addcircle-outlined"></v-icon>
      <v-icon name="fa-regular-building"></v-icon>

      New
    </button>
    <button class="button" @click="handleSave">
      <v-icon name="io-save"></v-icon>
      Save
    </button>
    <button
      class="button"
      v-if="buildingStore.isCurrentBuildingSaved()"
      @click="handleSaveAsNew"
    >
      Save as New
    </button>
    <button class="button" @click="$emit('open-building-list')">
      <v-icon name="md-drivefolderupload-twotone"></v-icon>
      Load
    </button>
  </div>
  <div class="add-block-section">
    <button class="button secondary" @click="createBlock">
      <v-icon name="la-cube-solid"></v-icon>
      New Block
    </button>
  </div>
</template>

<script setup lang="ts">
import { useBuildingStore } from '@/store/useBuildingStore'
import { BlockFactory } from '@/factories/BlockFactory'

const buildingStore = useBuildingStore()

defineEmits(['open-building-list'])

const handleSave = () => {
  console.log('handleSave clicked')
  console.log('buildingStore:', buildingStore)
  console.log('saveBuilding method:', buildingStore.saveBuilding)
  buildingStore.saveBuilding()
}

const handleSaveAsNew = () => {
  console.log('handleSaveAsNew clicked')
  buildingStore.saveCurrentBuildingAsNew()
}

const createBlock = () => {
  const blockNumber = buildingStore.building.blocks.length + 1
  const newBlock = BlockFactory.createNewBlock(blockNumber, {
    positionX: 400,
    left: -300,
    bottom: 0,
  })
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
  gap: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
}
</style>
