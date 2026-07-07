<template>
  <div class="building">
    <template v-for="block in building.blocks" :key="block.id">
      <Block :block="block"></Block>
    </template>
  </div>
</template>

<script setup lang="ts">
import Block from './Block.vue'
import type { Building } from '@/types/building.ts'

defineProps<{ building: Building }>()
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
