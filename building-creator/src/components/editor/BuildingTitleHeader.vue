<template>
  <div class="building-header">
    <h1 class="title-styled">Building Editor</h1>
    <div class="">
      <label>Building Name:</label>
      <input type="text" v-model="buildingStore.building.name" placeholder="Untitled Building" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBuildingStore } from '@/store/useBuildingStore'
const buildingStore = useBuildingStore()
</script>

<style scoped>
.building-header {
  margin-bottom: 1.5rem;
}
input {
  font-size: 1.1rem;
  padding: 0.2rem;
  width: 100%;
}
</style>
