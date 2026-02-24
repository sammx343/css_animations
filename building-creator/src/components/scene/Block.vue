<template>
  <div class="block" :style="getBlockStyle">
    <template v-for="(_, index) in blockFaces">
      <BlockFace
        v-if="isFaceVisible(block, index)"
        :key="index"
        :face-index="index"
        :block="block"
        :grids="block.grids"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BlockFace from './BlockFace.vue'
import type { Block } from '@/types/block'

const props = defineProps<{ block: Block }>()

const blockFaces = ref(new Array(6).fill(null))

const getBlockStyle = computed(() => ({
  width: `${props.block.long}px`,
  height: `${props.block.height}px`,
  transform: `translateX(${props.block.positionX}px) translateY(${props.block.positionY}px) translateZ(${props.block.positionZ}px) rotateX(${props.block.rotationX}deg) rotateY(${props.block.rotationY}deg) rotateZ(${props.block.rotationZ}deg)`,
  left: `${props.block.left || 0}px`,
  bottom: `${props.block.bottom || 0}px`,
  position: 'absolute',
}))

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
.block {
  position: absolute;
  transform-style: preserve-3d;
  transform-origin: center;
}
</style>
