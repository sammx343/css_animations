<template>
  <div class="building">
    <template v-for="block in blocks" :key="block.id">
      <Block :block="block"></Block>
    </template>
  </div>
</template>

<script setup lang="ts">
import Block from './Block.vue'
import type { Block as BlockType } from '@/types/block'

defineProps<{ blocks: BlockType[] }>()
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
