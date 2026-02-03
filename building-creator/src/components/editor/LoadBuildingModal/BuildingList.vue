<template>
  <div ref="containerRef" class="building-list-container">
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
      <li
        v-for="building in buildings"
        :key="building.id"
        :ref="(el) => buildingThumbnailRef(el, building.id)"
        @click="selectedBuilding(building)"
        style="margin-bottom: 20px"
      >
        <BuildingThumbnailScene
          v-if="visibleBuildings.has(building.id)"
          :blocks="building.blocks"
        ></BuildingThumbnailScene>
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
          <button class="button delete-button-confirm" @click="deleteBuilding()">Delete</button>
        </div>
      </div>
    </ConfirmationPrompt>
  </div>
</template>
<script setup lang="ts">
import type { Building } from '@/types/building'
import ConfirmationPrompt from '@/components/UI/ConfirmationPrompt.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useBuildingStore } from '@/store/useBuildingStore'
import BuildingThumbnailScene from './BuildingThumbnailScene.vue'

const buildingStore = useBuildingStore()

const buildings = ref<Building[]>()
const selectedIdBuildingToDelete = ref('')
const showDeleteBuildingConfirmationModal = ref(false)
const emit = defineEmits(['selectedBuilding', 'close'])

// Track visible buildings for lazy rendering
const visibleBuildings = ref<Set<string>>(new Set())
const itemRefs = ref<Map<string, HTMLElement>>(new Map())
const containerRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

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
  console.log('should delete')
  buildingStore.deleteBuilding(selectedIdBuildingToDelete.value)
  loadBuildingList()
  showDeleteBuildingConfirmationModal.value = false
}

const selectedBuilding = (building: Building) => {
  buildingStore.setBuilding(building)
  emit('selectedBuilding')
  emit('close')
}

const cleanupDeletedBuildingRefs = (newBuildings: Building[]) => {
  // Clean up refs for removed buildings (e.g., when a building is deleted)
  const newBuildingIds = new Set(newBuildings.map((b) => b.id))
  const oldBuildingIds = Array.from(itemRefs.value.keys())

  oldBuildingIds.forEach((id) => {
    if (!newBuildingIds.has(id)) {
      const el = itemRefs.value.get(id)
      if (el && observer) {
        observer.unobserve(el)
      }
      itemRefs.value.delete(id)
      visibleBuildings.value.delete(id)
    }
  })
}

const loadBuildingList = () => {
  const loadedBuildings = buildingStore.loadBuildingList()
  if (typeof loadedBuildings !== 'string') {
    cleanupDeletedBuildingRefs(loadedBuildings)
    buildings.value = loadedBuildings

    // Re-observe after DOM updates
    // Explanation: When Vue re-renders after deleting a building, existing <li> elements
    // that remain in the DOM might not trigger the ref callback again. This ensures all
    // remaining elements are still being observed by the IntersectionObserver.
    // Note: Observing an already-observed element is safe (no duplicates are created).
    if (observer) {
      setTimeout(() => {
        itemRefs.value.forEach((el) => {
          observer?.observe(el)
        })
      }, 0)
    }
  }
}

const createNewBuilding = () => {
  buildingStore.newBuilding()
  emit('close')
}

const buildingThumbnailRef = (el: HTMLElement | null, buildingId: string) => {
  if (el) {
    const oldEl = itemRefs.value.get(buildingId)
    // Unobserve old element if it exists and is different
    if (oldEl && oldEl !== el && observer) {
      observer.unobserve(oldEl)
    }

    itemRefs.value.set(buildingId, el)
    // Observe the element for visibility
    if (observer) {
      observer.observe(el)
    }
  } else {
    // Element was removed, clean up
    const oldEl = itemRefs.value.get(buildingId)
    if (oldEl && observer) {
      observer.unobserve(oldEl)
    }
    itemRefs.value.delete(buildingId)
    visibleBuildings.value.delete(buildingId)
  }
}

const setupIntersectionObserver = () => {
  // Use the scroll container as root if available, otherwise use viewport
  const root = containerRef.value

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const buildingId = Array.from(itemRefs.value.entries()).find(
          ([_, el]) => el === entry.target,
        )?.[0]

        if (buildingId) {
          if (entry.isIntersecting) {
            visibleBuildings.value.add(buildingId)
          } else {
            visibleBuildings.value.delete(buildingId)
          }
        }
      })
    },
    {
      root: root, // Use scroll container as root
      rootMargin: '50px', // Start loading slightly before entering viewport
      threshold: 0.1, // Trigger when 10% visible
    },
  )

  // Observe all existing refs
  itemRefs.value.forEach((el) => {
    observer?.observe(el)
  })
}

onMounted(() => {
  loadBuildingList()
  // Setup observer after DOM is ready
  setTimeout(() => {
    setupIntersectionObserver()
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  itemRefs.value.clear()
  visibleBuildings.value.clear()
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
  background: linear-gradient(
    45deg,
    rgb(255, 220, 180) 5%,
    rgb(240, 200, 240) 20%,
    rgb(180, 180, 255) 80%,
    #7f7fc5 100%
  );
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
