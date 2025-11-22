<template>
  <div class="building-list-container">
    <p>Choose a building:</p>
    <br />
    <ul class="building-list">
      <li v-for="building in buildings" :key="building.id" @click="selectedBuilding(building)">
        <BuildingThumbnailScene :blocks="building.blocks"></BuildingThumbnailScene>
        <strong>{{ building.name }}</strong>
        <button
          class="button delete-building"
          style="background-color: red"
          @click="(event) => openDeleteConfirmationModal(building.id, event)"
        >
          Delete
        </button>
      </li>
    </ul>
    <ConfirmationPrompt
      v-if="showDeleteBuildingConfirmationModal"
      @close-prompt="closeDeleteBuildingConfirmationModal"
    >
      <div class="confirmation-prompt-delete">
        <p>This building will be deleted <b>permanently</b> are you sure you want to delete it?</p>
        <div class="flex">
          <button class="button" @click="closeDeleteBuildingConfirmationModal">Cancel</button>
          <button class="button" style="background-color: red" @click="deleteBuilding()">
            Delete
          </button>
        </div>
      </div>
    </ConfirmationPrompt>
  </div>
</template>
<script setup lang="ts">
import type { Building } from '@/types/building'
import Modal from '../UI/Modal.vue'
import ConfirmationPrompt from '../UI/ConfirmationPrompt.vue'
import { onMounted, ref } from 'vue'
import { useBuildingStore } from '@/store/buildingStore'
import BuildingThumbnailScene from './BuildingThumbnailScene.vue'

const buildingStore = useBuildingStore()

const buildings = ref<Building[]>()
const selectedIdBuildingToDelete = ref('')
const showDeleteBuildingConfirmationModal = ref(false)
const emit = defineEmits(['selectedBuilding'])

const closeDeleteBuildingConfirmationModal = () => {
  selectedIdBuildingToDelete.value = ''
  showDeleteBuildingConfirmationModal.value = false
}

const openDeleteConfirmationModal = (buildingId: string, event: Event) => {
  event.stopPropagation()
  selectedIdBuildingToDelete.value = buildingId
  showDeleteBuildingConfirmationModal.value = true
}

const deleteBuilding = () => {
  buildingStore.deleteBuilding(selectedIdBuildingToDelete.value)
  loadBuildingList()
  showDeleteBuildingConfirmationModal.value = false
}

const selectedBuilding = (building: Building) => {
  buildingStore.setBuilding(building)
  emit('selectedBuilding')
}

const loadBuildingList = () => {
  const loadedBuildings = buildingStore.loadBuildingList()
  if (typeof loadedBuildings !== 'string') {
    buildings.value = loadedBuildings
  }
}

onMounted(() => {
  loadBuildingList()
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

.button.delete-building {
  position: absolute;
  bottom: 0%;
  right: 0%;
  transform: translateX(-50%);
}

.building-list-container ul {
  padding: 0;
}

.confirmation-prompt-delete {
  background: white;
  padding: 40px;
  border-radius: 5px;
}
</style>
