<template>
  <div class="building-thumbnail scene">
    <div class="scene-container">
      <div class="blocks-container">
        <div
          v-for="(block, index) in blocks"
          class="block"
          :style="getBlockStyle(block)"
          :key="index"
        >
          <BlockFace
            v-for="(face, index) in blockFaces"
            :key="index"
            :face-index="index"
            :block="block"
            :grids="block.grids"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BlockFace from '@/components/scene/BlockFace.vue'
import type { Block } from '@/types/block'

defineProps<{ blocks: Block[] }>()

const blockFaces = ref(new Array(6).fill(null))

const getBlockStyle = (block: Block) => ({
  width: `${block.long}px`,
  height: `${block.height}px`,
  transform: `translateX(${block.positionX}px) translateY(${block.positionY}px) translateZ(${block.positionZ}px) rotateX(${block.rotationX}deg) rotateY(${block.rotationY}deg) rotateZ(${block.rotationZ}deg) `,
  left: `${block.left || 0}px`,
  bottom: `${block.bottom || 0}px`,
  position: 'absolute',
})
</script>

<style scoped>
.building-thumbnail {
  transform: scale(0.2) translate(-50%, -50%);
  position: absolute;
  height: 0px !important;
  top: 90%;
}

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
  transform: scale(1) scale(0.63) rotateX(-6deg) rotateY(804deg);
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
</style>
