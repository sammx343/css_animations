<template>
  <div class="building-list-container">
    <div class="building-list-header">
      <button class="button flex" @click="createNewBuilding">
        <v-icon name="md-addcircle-outlined"></v-icon>
        <v-icon name="fa-regular-building"></v-icon>
        New Building
      </button>
    </div>
    <h2 class="title-styled">Choose a building:</h2>
    <br />
    <ul class="building-list">
      <li v-for="building in buildings" :key="building.id" @click="selectedBuilding(building)" style="margin-bottom: 20px">
        <BuildingThumbnailScene :blocks="building.blocks"></BuildingThumbnailScene>
        <h3 class="building-name title-styled">{{ building.name }}</h3>
        <button
          class="button delete-building"
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
          <button class="button delete-button-confirm" @click="deleteBuilding()">
            Delete
          </button>
        </div>
      </div>
    </ConfirmationPrompt>
  </div>
</template>
<script setup lang="ts">
import type { Building } from '@/types/building'
import Modal from '@/components/UI/Modal.vue'
import ConfirmationPrompt from '@/components/UI/ConfirmationPrompt.vue'
import { onMounted, ref } from 'vue'
import { useBuildingStore } from '@/store/useBuildingStore'
import BuildingThumbnailScene from './BuildingThumbnailScene.vue'

const buildingStore = useBuildingStore()

const buildings = ref<Building[]>()
const selectedIdBuildingToDelete = ref('')
const showDeleteBuildingConfirmationModal = ref(false)
const emit = defineEmits(['selectedBuilding', 'close'])

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
  emit('close')
}

const loadBuildingList = () => {
  const loadedBuildings = buildingStore.loadBuildingList()
  if (typeof loadedBuildings !== 'string') {
    buildings.value = loadedBuildings
  }
}

const createNewBuilding = () => {
  buildingStore.newBuilding()
  emit('close')
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
  background: linear-gradient(    45deg,    rgb(255, 220, 180) 5%,    rgb(240, 200, 240) 20%,    rgb(180, 180, 255) 80%, #7f7fc5 100%);
  border: 1px solid black;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
  user-select: none;
}

.building-list-header {
  margin-bottom: 1.5rem;
}

.building-list-header .button.flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.building-list {
  display: grid;
  list-style-type: none;
  grid-template-columns: repeat(2, 1fr);
}

.building-list li {
  position: relative;
  margin-right: 20px;
  height: 200px;
  border: 1px solid gray;
  box-shadow: 2px 2px 5px black;
  cursor: pointer;
}

.building-name {
  position: relative;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  margin: 0.5rem 0 0.5rem 0.5rem;
  z-index: 1;
}

.button.delete-building {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  transform: translateX(0);
  background: linear-gradient(135deg, #ff6b6b 0%, #8b0000 100%);
}

.button.delete-building:hover {
  transform: translateX(0) scale(1.05);
}

.button.delete-button-confirm {
  background: linear-gradient(135deg, #ff6b6b 0%, #8b0000 100%);
}

.button.delete-button-confirm:hover {
  transform: scale(1.05);
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
