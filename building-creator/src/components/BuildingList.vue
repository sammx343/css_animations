<template>
  <div class="building-list-container">
    <p>Choose a building:</p>
    <br />
    <ul class="building-list">
      <li v-for="building in buildings" :key="building.id">
        <BuildingThumbnailScene :blocks="building.blocks"></BuildingThumbnailScene>
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

onMounted(() => {
  const loadedBuildings = buildingStore.loadBuildings()
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
