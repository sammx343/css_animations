<template>
  <div class="scene" ref="sceneRef">
    <div class="scene-container" :style="sceneContainerStyle" ref="sceneContainerRef">
      <div class="cubes-container">
        <div
          v-for="(block, index) in blocks"
          class="cube"
          :style="getCubeStyle(block)"
          :key="index"
        >
          <CubeFace
            v-for="(face, index) in cubeFaces"
            :key="index"
            :face-index="index"
            :cube="block"
            :grids="block.grids"
            :style="cubeContainerStyle(block)"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="zoom">
    <label for="cube-height">Zoom: {{ zoom }}</label>
    <input
      id="cube-height"
      type="range"
      min="0.2"
      max="1.5"
      step="0.01"
      :value="zoom"
      @input="updateZoom(($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue'
import CubeFace from './CubeFace.vue'
import type { Cube } from '@/types/cube'

const emit = defineEmits(['update:zoom'])

const props = defineProps<{ zoom: string; blocks: Cube[] }>()

const sceneRef = ref(null)
const cubeFaces = ref(new Array(6).fill(null))
const sumX = ref(0)
const sumY = ref(0)
let lastMouseX = 0
let lastMouseY = 0

const sceneContainerStyle = computed(() => ({
  transform: `scale(${props.zoom}) rotateX(${sumY.value}deg) rotateY(${sumX.value}deg) `,
}))

const cubeContainerStyle = (block: Cube) => ({})

const getCubeStyle = (block: Cube) => ({
  width: `${block.long}px`,
  height: `${block.height}px`,
  transform: `rotateX(${block.rotationX}deg) rotateY(${block.rotationY}deg) rotateZ(${block.rotationZ}deg) translateX(${block.positionX}px) translateY(${block.positionY}px) translateZ(${block.positionZ}px)`,
  left: `${block.left || 0}px`,
  bottom: `${block.bottom || 0}px`,
  position: 'absolute',
})

const updateZoom = (value: string) => {
  emit('update:zoom', value)
}

onMounted(() => {
  sceneRef.value.addEventListener(
    'mousemove',
    (event: { buttons: number; clientX: number; clientY: number }) => {
      if (event.buttons === 1) {
        const currentMouseX = event.clientX
        const currentMouseY = event.clientY

        if (currentMouseX > lastMouseX) sumX.value += 2
        else if (currentMouseX < lastMouseX) sumX.value -= 2

        if (currentMouseY > lastMouseY) sumY.value -= 2
        else if (currentMouseY < lastMouseY) sumY.value += 2

        lastMouseX = currentMouseX
        lastMouseY = currentMouseY
      }
    },
  )
})
</script>

<style scoped>
.scene {
  perspective: 1050px;
  width: 100%;
  height: 100vh;
}

.cube {
  position: absolute;
  transform-style: preserve-3d;
  transform-origin: center;
}

.cube-container {
  transform-style: preserve-3d;
}

.cubes-container {
  position: absolute;
  top: 50%;
  right: 50%;
  transform-style: preserve-3d;
  transform-origin: top right;
}

.scene-container {
  position: relative;
  top: 40%;
  left: 100px;
  transform: scale(1);
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.zoom {
  display: flex;
  flex-direction: column;
  width: 200px;
  position: fixed;
  top: 0;
  right: 0;
}
</style>
