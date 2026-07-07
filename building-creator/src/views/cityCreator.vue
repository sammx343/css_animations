<template>
  <main class="city-creator">
    <div class="content">
      <h1>City Creator</h1>
      <p class="subtitle">Importa y gestiona edificios para crear tu ciudad</p>
      
      <div class="import-section">
        <h2>Importar Edificios</h2>
        <div class="buildings-list">
          <p v-if="availableBuildings.length === 0" class="empty-message">
            No hay edificios guardados. Ve al Building Editor para crear algunos.
          </p>
          <div
            v-for="building in availableBuildings"
            :key="building.id"
            class="building-card"
            :class="{ selected: selectedBuildings.includes(building.id) }"
            @click="toggleBuilding(building.id)"
          >
            <div class="building-preview">
              <div class="building-thumbnail">
                <span class="building-icon">🏢</span>
              </div>
            </div>
            <div class="building-info">
              <h3>{{ building.name }}</h3>
              <p class="building-meta">{{ building.blocks.length }} bloque(s)</p>
            </div>
            <div class="building-check">
              <span v-if="selectedBuildings.includes(building.id)" class="check-icon">✓</span>
            </div>
          </div>
        </div>
      </div>

      <div class="actions-section">
        <button
          class="button primary"
          :disabled="selectedBuildings.length === 0"
          @click="addToCity"
        >
          Agregar a Ciudad ({{ selectedBuildings.length }})
        </button>
        <button class="button secondary" @click="clearSelection">
          Limpiar Selección
        </button>
      </div>

      <div v-if="cityBuildings.length > 0" class="city-section">
        <h2>Edificios en la Ciudad</h2>
        <div class="city-buildings">
          <div
            v-for="(building, index) in cityBuildings"
            :key="`${building.id}-${index}`"
            class="city-building-card"
          >
            <div class="city-building-info">
              <h4>{{ building.name }}</h4>
              <button
                class="button danger small"
                @click="removeFromCity(index)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useBuildingStore } from '@/store/useBuildingStore'
import { useCityStore } from '@/store/useCityStore'
import type { Building } from '@/types/building'

const buildingStore = useBuildingStore()
const cityStore = useCityStore()

const selectedBuildings = ref<string[]>([])
const cityBuildings = computed(() => cityStore.getCityBuildings())

const availableBuildings = computed(() => {
  return buildingStore.getAllBuildings()
})

const toggleBuilding = (buildingId: string) => {
  const index = selectedBuildings.value.indexOf(buildingId)
  if (index > -1) {
    selectedBuildings.value.splice(index, 1)
  } else {
    selectedBuildings.value.push(buildingId)
  }
}

const addToCity = () => {
  const buildingsToAdd: Building[] = []
  selectedBuildings.value.forEach((buildingId) => {
    const building = buildingStore.getBuildingById(buildingId)
    if (building) {
      buildingsToAdd.push(building)
    }
  })
  cityStore.addBuildings(buildingsToAdd)
  selectedBuildings.value = []
}

const removeFromCity = (index: number) => {
  cityStore.removeBuilding(index)
}

const clearSelection = () => {
  selectedBuildings.value = []
}

onBeforeMount(() => {
  buildingStore.initializeDefaultBuildings()
})
</script>

<style scoped>
.city-creator {
  padding-top: 50px;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.import-section,
.city-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.buildings-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.empty-message {
  grid-column: 1 / -1;
  text-align: center;
  color: #999;
  padding: 2rem;
  font-style: italic;
}

.building-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
}

.building-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.building-card.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.building-preview {
  flex-shrink: 0;
}

.building-thumbnail {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.building-icon {
  font-size: 2rem;
}

.building-info {
  flex: 1;
}

.building-info h3 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1.1rem;
}

.building-meta {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.building-check {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  color: #667eea;
  font-size: 1.5rem;
  font-weight: bold;
}

.actions-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

.button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.button.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.button.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button.secondary {
  background: #20b2aa;
}

.button.secondary:hover {
  background: #1a9b94;
}

.button.danger {
  background: #dc3545;
}

.button.danger:hover {
  background: #c82333;
}

.button.small {
  padding: 6px 12px;
  font-size: 0.9rem;
}

.city-buildings {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.city-building-card {
  padding: 1rem;
  border: 2px solid #667eea;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.05);
}

.city-building-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city-building-info h4 {
  margin: 0;
  color: #333;
}
</style>
