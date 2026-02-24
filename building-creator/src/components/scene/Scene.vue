<template>
  <div class="scene" ref="sceneRef">
    <div class="scene-container" :style="sceneContainerStyle" ref="sceneContainerRef">
      <Building :blocks="blocks"></Building>
    </div>
  </div>
  <div class="zoom">
    <label for="block-height">Zoom: {{ zoom }}</label>
    <input
      id="block-height"
      type="range"
      :min="ZOOM_CONFIG.MIN"
      :max="ZOOM_CONFIG.MAX"
      :step="ZOOM_CONFIG.STEP"
      :value="zoom"
      @input="updateZoom(($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Block } from '@/types/block'
import Building from './Building.vue'
import { ZOOM_CONFIG } from '@/constants'

const emit = defineEmits(['update:zoom'])

const props = defineProps<{ zoom: string; blocks: Block[] }>()

const sceneRef = ref(null)
const sumX = ref(0)
const sumY = ref(0)
let lastMouseX = 0
let lastMouseY = 0

const sceneContainerStyle = computed(() => ({
  transform: `scale(${props.zoom}) rotateX(${sumY.value}deg) rotateY(${sumX.value}deg) `,
}))

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

.block {
  position: absolute;
  transform-style: preserve-3d;
  transform-origin: center;
}

.block-container {
  transform-style: preserve-3d;
}

.blocks-container {
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
  pointer-events: none;
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
