<template>
  <main class="main">
    <div class="world" @click="addSelectedBuildingToPositionedBuildings">
      <div
        class="floor"
        ref="floor"
        :style="{ height: `${floorDimensions.height}px`, width: `${floorDimensions.width}px` }"
      >
        <div
          class="positioned-building"
          v-for="(building, index) in positionedBuildings"
          :key="index"
          :style="{ bottom: building.bottom, right: building.right }"
        >
          <Building :building="building.building"></Building>
        </div>

        <div
          v-if="selectedBuildingFromList?.id"
          class="positioned-building"
          :style="{
            bottom: `${floorCursorCoordinates.y}px`,
            right: `calc(50% - ${floorCursorCoordinates.x}px)`,
          }"
        >
          <Building :building="selectedBuildingFromList"></Building>
        </div>
        <div
          class="floor-cursor"
          ref="floor-cursor"
          :style="{
            bottom: `${floorCursorCoordinates.y}px`,
            right: `calc(50% - ${floorCursorCoordinates.x}px)`,
          }"
        ></div>
      </div>
    </div>

    <BuilderBuildingList @selected-building="selectedBuilding"></BuilderBuildingList>
    <PositionedBuildingList :positioned-buildings="positionedBuildings"></PositionedBuildingList>
  </main>
</template>
<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted, ref } from 'vue'
import { useBuildingStore } from '@/store/useBuildingStore'
import Building from '@/components/scene/Building.vue'
import type { Building as BuildingType } from '@/types'
import BuilderBuildingList from '@/components/UI/builderBuildingList.vue'
import PositionedBuildingList from '@/components/UI/positionedBuildingList.vue'
import { generateId } from '@/utils/generateId'

const buildingStore = useBuildingStore()
const buildings = ref<BuildingType[]>(buildingStore.loadBuildingList())
const floor = useTemplateRef('floor')
const scroll = ref(0)
const positionedBuildings: IPositionedBuilding[] = ref([])
const selectedBuildingFromList: BuildingType | null = ref(null)
const floorCursorCoordinates = ref({
  x: 0,
  y: 0,
})
const floorDimensions = {
  width: 30000,
  height: 14000,
}

function scrollListener() {
  if (floor.value != null) {
    scroll.value = window.scrollY
    floor.value.style.transform = `rotateX(60deg) translateY(${-170 + window.scrollY}px) translateZ(-450px)  translateX(-50%)`
  }
}

function createPositionedBuildings() {
  for (let index = 0; index < buildings.value.length; index++) {
    positionedBuildings.value.push({
      bottom: `${400 + index * 1000}px`,
      right: `calc(47% + ${Math.floor(Math.random() * 1000)}px)`,
      building: {
        ...buildings.value[index],
        id: generateId(),
      },
    })
  }
}

function addSelectedBuildingToPositionedBuildings() {
  if (selectedBuildingFromList?.value.id) {
    const positionedBuilding = {
      bottom: `${floorCursorCoordinates.value.y}px`,
      right: `calc(50% - ${floorCursorCoordinates.value.x}px)`,
      building: {
        ...selectedBuildingFromList.value,
        id: generateId(),
      },
    }
    positionedBuildings.value.push(positionedBuilding)
    selectedBuildingFromList.value = null
  }
}

function selectedBuilding(building: BuildingType) {
  selectedBuildingFromList.value = building
}

onMounted(() => {
  createPositionedBuildings()
  window.addEventListener('scroll', scrollListener)

  document.addEventListener('mousemove', (event) => {
    const x = event.clientX
    const y = event.clientY

    floorCursorCoordinates.value = {
      x: -window.innerWidth + x * 3,
      y: 1000 - y + scroll.value,
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollListener)
})

export interface IPositionedBuilding {
  top: string
  right: string
  building: BuildingType
}
</script>
<style scoped>
.main {
  height: 10000px;
  background: linear-gradient(#23ace3, #87cfd3, #d3e7c7, #eeb5b2, #a493b7, #63539d, #201732);
}

.positioned-building {
  position: absolute;
  transform: rotateX(-90deg) rotateY(90deg);
  transform-style: preserve-3d;
}

.world {
  position: fixed;
  width: 100%;
  height: 100vh;
  perspective: 500px;
  transform-style: preserve-3d;
}

.floor {
  background: gray;
  width: 2000vw;
  transform-origin: bottom;
  position: absolute;
  bottom: 0;
  left: 0%;
  transform: rotateX(60deg) translateY(-170px) translateZ(-450px) translateX(-50%);
  transform-style: preserve-3d;
}

.floor-cursor {
  position: absolute;
  width: 200px;
  height: 200px;
  background: red;
}
.cube {
  position: absolute;
  top: 50%;
  right: 50%;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
}

.cube__face {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: inherit;
  font-size: 60px;
  color: white;
}

.cube__face--1 {
  background: rgba(90, 90, 90, 0.7);
}

.cube__face--2 {
  background: rgba(0, 210, 0, 0.7);
}

.cube__face--3 {
  background: rgba(210, 0, 0, 0.7);
}

.cube__face--4 {
  background: rgba(0, 0, 210, 0.7);
}

.cube__face--5 {
  background: rgba(210, 210, 0, 0.7);
}

.cube__face--6 {
  background: rgba(210, 0, 210, 0.7);
}
</style>
