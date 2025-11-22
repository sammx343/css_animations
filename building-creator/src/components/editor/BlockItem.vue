<template>
  <div class="block-item">
    <hr />
    <div class="block-header">
      <input type="text" v-model="block.name" placeholder="Block name" />
      <div class="controls-expandable-icon" @click="$emit('toggle-expand')">
        <v-icon :name="isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'" />
      </div>
    </div>

    <div class="block-actions">
      <button @click="$emit('duplicate', block)">Duplicate</button>
      <button @click="openGridControls">Grid Options</button>
      <button v-if="index > 0" class="delete" @click="$emit('delete', block.id)">Delete</button>
    </div>

    <transition name="expand">
      <div v-if="isExpanded" class="expanded-controls">
        <BlockExpandableControls :block="block" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useCubeStore } from '@/store/cubeStore'
import { useGridStore } from '@/store/gridStore'
import BlockExpandableControls from './BlockExpandableControls.vue'
import type { Cube } from '@/types/cube'

const props = defineProps<{
  block: Cube
  index: number
  isExpanded: boolean
}>()

defineEmits(['toggle-expand', 'duplicate', 'delete'])
const cubeStore = useCubeStore()
const gridStore = useGridStore()

const openGridControls = () => {
  cubeStore.setSelectedCube(props.block)
  gridStore.setGridControlOpen(true)
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}
</style>
