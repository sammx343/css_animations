<template>
  <div v-if="!isExpanded" class="open-tag" @click="switchSidebarExpand">
    <v-icon class="sidebar-icon" name="oi-sidebar-expand" /> Current Buildings
  </div>
  <div
    v-if="isExpanded"
    ref="containerRef"
    class="building-list-container"
    :class="{ expanded: isExpanded }"
  >
    <div class="sidebar-back" @click="switchSidebarExpand">
      <v-icon class="sidebar-icon" name="oi-sidebar-collapse" />
      <p>Close</p>
    </div>
    <h3 class="title-styled">Choose a building:</h3>
    <br />
    <ul class="building-list">
      <li
        v-for="building in buildings"
        :key="building.id"
        :ref="(el) => buildingThumbnailRef(el, building.id)"
        @click="selectedBuilding(building)"
      >
        <BuildingThumbnailScene
          v-if="visibleBuildings.has(building.id)"
          :blocks="building.blocks"
        ></BuildingThumbnailScene>
        <h3 class="building-name title-styled">{{ building.name }}</h3>
        <div v-if="clickedBuilding?.id && clickedBuilding.id === building.id">
          building properties
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Building } from '@/types/building'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import BuildingThumbnailScene from '../editor/LoadBuildingModal/BuildingThumbnailScene.vue'
import type { IPositionedBuilding } from '@/views/cityBuilder.vue'

const props = defineProps<{ positionedBuildings: IPositionedBuilding[] }>()
const clickedBuilding: Building | null = ref(null)

const isExpanded = ref(false)
const buildings = computed(() => {
  return props.positionedBuildings.map((positionedBuilding) => positionedBuilding.building)
})
const emit = defineEmits(['selectedBuilding'])

// Track visible buildings for lazy rendering
const visibleBuildings = ref<Set<string>>(new Set())
const itemRefs = ref<Map<string, HTMLElement>>(new Map())
const containerRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const switchSidebarExpand = () => {
  isExpanded.value = !isExpanded.value
}

const selectedBuilding = (building: Building) => {
  clickedBuilding.value = building
  emit('selectedBuilding', building)
}

const loadBuildingList = () => {}
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
<style scoped>
.building-list-container {
  position: fixed;
  top: 50px;
  left: 0;
  height: 95vh;
  width: 250px;
  max-width: 80%;
  background: linear-gradient(
    45deg,
    rgb(255, 220, 180) 5%,
    rgb(240, 200, 240) 20%,
    rgb(180, 180, 255) 80%,
    #7f7fc5 100%
  );
  border: 1px solid black;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
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
  grid-template-columns: repeat(1, 1fr);
}

.building-list li {
  position: relative;
  height: 200px;
  margin-bottom: 10px;
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

.sidebar-back {
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: 5px;
  }
}

.sidebar-icon {
  filter: drop-shadow(1px 1px 1px black);
}

.open-tag {
  width: 180px;
  position: fixed;
  left: 0;
  top: 200px;
  padding: 5px 10px;
  border-radius: 0 15px 15px 0;
  color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px black;
  background: linear-gradient(
    45deg,
    rgb(255, 220, 180) 5%,
    rgb(240, 200, 240) 20%,
    rgb(180, 180, 255) 80%,
    #7f7fc5 100%
  );
}
</style>
