<template>
  <main class="main">
    <div class="world">
      <div class="floor" ref="floor">
        <div
          class="positioned-building"
          v-for="(building, index) in positionedBuildings"
          :key="index"
          :style="{ top: building.top, right: building.right }"
        >
          <Building :building="building.building"></Building>
        </div>
        <!-- <div
          class="cube"
          v-for="(cube, index) in cubes"
          :key="index"
          :style="{ top: cube.top, right: cube.right }"
        >
          <div
            v-for="(face, faceIndex) in cube.faces"
            :class="`cube__face cube__face--${faceIndex + 1}`"
            :key="faceIndex"
            :style="{ width: face.width, height: face.height, transform: face.transform }"
          ></div>
        </div> -->
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted, ref } from 'vue'
import { useBuildingStore } from '@/store/useBuildingStore'
import Building from '@/components/scene/Building.vue'
import type { Building as BuildingType } from '@/types'
const cubeWidth = 400
const cubeHeight = 400
const cubeLong = 600

const buildingStore = useBuildingStore()
const buildings = ref<BuildingType[]>(buildingStore.loadBuildingList())
const floor = useTemplateRef('floor')
const cubes = ref(createBuildings())
const positionedBuildings: BuildingType[] = ref([])

function scrollListener() {
  console.log(window.scrollY)
  if (floor.value != null)
    floor.value.style.transform = `rotateX(90deg) translateY(${window.scrollY}px)`
}

function createPositionedBuildings() {
  for (let index = 0; index < buildings.value.length; index++) {
    positionedBuildings.value.push({
      top: `${95 - index * 30}%`,
      right: `${Math.floor(Math.random() * 100)}%`,
      building: buildings.value[index],
    })
  }
}

function createBuildings() {
  const cubes = []
  for (let index = 0; index < 30; index++) {
    cubes.push({
      top: `${-0 - index * 10}%`,
      right: `${Math.floor(Math.random() * 100)}%`,
      faces: createFaces(),
    })
  }
  return cubes
}

function createFaces(): face[] {
  const faces: face[] = []
  for (let index = 0; index < 6; index++) {
    const face: face = {
      width: '',
      height: '',
      transform: '',
    }

    if (index === 0) {
      face.transform = `translateZ(${cubeWidth / 2}px)`
      face.width = `${cubeLong}px`
      face.height = `${cubeHeight}px`
    }
    if (index === 1) {
      face.transform = `rotateY(180deg) translateZ(${cubeWidth / 2}px)`
      face.width = `${cubeLong}px`
      face.height = `${cubeHeight}px`
    }
    if (index === 2) {
      face.transform = `rotateY(90deg) translateZ(-${cubeWidth / 2}px)`
      face.width = `${cubeWidth}px`
      face.height = `${cubeHeight}px`
    }
    if (index === 3) {
      const sum = cubeLong - cubeWidth
      face.transform = `rotateY(90deg) translateZ(${cubeWidth / 2 + sum}PX)`
      face.width = `${cubeWidth}px`
      face.height = `${cubeHeight}px`
    }
    if (index === 4) {
      face.width = `${cubeLong}px`
      face.height = `${cubeWidth}px`
      face.transform = `rotateX(90deg) translateZ(${cubeWidth / 2}px)`
    }
    if (index === 5) {
      const sum = cubeHeight - cubeWidth
      face.width = `${cubeLong}px`
      face.height = `${cubeWidth}px`
      face.transform = `rotateX(-90deg) translateZ(${cubeWidth / 2 + sum}px)`
    }
    faces.push(face)
  }
  return faces
}
onMounted(() => {
  createPositionedBuildings()
  window.addEventListener('scroll', scrollListener)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollListener)
})

interface face {
  transform: string
  width: string
  height: string
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
  border: 2px solid red;
  width: 100%;
  height: 5000px;
  transform-origin: bottom;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: rotateX(90deg) translateY(0px);
  transform-style: preserve-3d;
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
