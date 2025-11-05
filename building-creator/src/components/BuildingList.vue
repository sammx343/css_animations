<template>
  <div class="building-list-container">
    <p>Choose a building:</p>
    <br />
    <ul class="building-list">
      <li v-for="building in buildings" :key="building.id" @click="selectedBuilding(building)">
        <BuildingThumbnailScene :blocks="building.blocks"></BuildingThumbnailScene>
        <strong>{{ building.name }}</strong>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Building } from '@/types/building'
import { onMounted, ref } from 'vue'
import { useBuildingStore } from '@/store/buildingStore'
import BuildingThumbnailScene from './BuildingThumbnailScene.vue'

const buildingStore = useBuildingStore()

const buildings = ref<Building[]>()

const emit = defineEmits(['selectedBuilding'])

const selectedBuilding = (building: Building) => {
  buildingStore.setBuilding(building)
  emit('selectedBuilding')
}

onMounted(() => {
  const loadedBuildings = buildingStore.loadBuildingList()
  if (typeof loadedBuildings !== 'string') {
    buildings.value = loadedBuildings
  }
})
</script>
<style>
.building-list-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 1000px;
  max-width: 80%;
  background: white;
  height: 90vh;
  overflow: scroll;
  padding: 40px;
  border-radius: 5px;
}

.building-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.building-list li {
  position: relative;
  margin-right: 20px;
  height: 200px;
  overflow: hidden;
  border: 5px solid goldenrod;
  border-radius: 10px;
  cursor: pointer;
}

.building-list-container ul {
  padding: 0;
}
</style>
