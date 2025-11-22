<template>
  <CubeControls :cube-properties="block" @update:cube-properties="updateBlock" />
</template>

<script setup lang="ts">
import CubeControls from './CubeControls.vue'
import { useBuildingStore } from '@/store/buildingStore'
import type { Cube } from '@/types/cube'

defineProps<{ block: Cube }>()
const buildingStore = useBuildingStore()

const updateBlock = (updated: Cube) => {
  buildingStore.updateBuildingBlock(updated)
}
</script>
