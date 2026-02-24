<template>
  <div class="blocks-container">
    <div v-for="(block, index) in blocks" class="block" :style="getBlockStyle(block)" :key="index">
      <template v-for="(face, index) in blockFaces">
        <BlockFace
          v-if="isFaceVisible(block, index)"
          :key="index"
          :face-index="index"
          :block="block"
          :grids="block.grids"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BlockFace from './BlockFace.vue'
import type { Block } from '@/types/block'

defineProps<{ blocks: Block[] }>()

const blockFaces = ref(new Array(6).fill(null))

const getBlockStyle = (block: Block) => ({
  width: `${block.long}px`,
  height: `${block.height}px`,
  transform: `translateX(${block.positionX}px) translateY(${block.positionY}px) translateZ(${block.positionZ}px) rotateX(${block.rotationX}deg) rotateY(${block.rotationY}deg) rotateZ(${block.rotationZ}deg)`,
  left: `${block.left || 0}px`,
  bottom: `${block.bottom || 0}px`,
  position: 'absolute',
})

const isFaceVisible = (block: Block, faceIndex: number): boolean => {
  // If visibleFaces is not defined, show all faces (default behavior)
  if (!block.visibleFaces) {
    return true
  }
  // Return the visibility state for this face, defaulting to true if not set
  return block.visibleFaces[faceIndex] !== false
}
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
