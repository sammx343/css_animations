<template>
  <div class="building-header">
    <h2>Building Editor</h2>
    <div class="d-flex flex-start">
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
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;
}
</style>
