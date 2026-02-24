<template>
  <div class="building">
    <template v-for="block in blocks" :key="block.id">
      <BlockPiece :block="block"></BlockPiece>
    </template>
  </div>
</template>

<script setup lang="ts">
import BlockPiece from './Block.vue'
import type { Block } from '@/types/block'

defineProps<{ blocks: Block[] }>()
</script>

<style scoped>
.building {
  position: absolute;
  top: 50%;
  right: 50%;
  transform-style: preserve-3d;
  transform-origin: top right;
}
</style>
