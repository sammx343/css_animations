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
      <button @click="openGridControl">Grid Options</button>
      <button v-if="index > 0" class="delete" @click="$emit('delete', block.id)">Delete</button>
    </div>

    <transition name="expand">
      <div v-if="isExpanded" class="expanded-controls">
        <BlockControlForm :block-properties="block" @update:block-properties="updateBlock" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useBlockStore } from '@/store/useBlockStore'
import { useGridStore } from '@/store/useGridStore'
import { useBuildingStore } from '@/store/useBuildingStore'
import BlockControlForm from './BlockControlForm.vue'
import type { Block } from '@/types/block'

const props = defineProps<{
  block: Block
  index: number
  isExpanded: boolean
}>()
const buildingStore = useBuildingStore()

const updateBlock = (updated: Block) => {
  buildingStore.updateBuildingBlock(updated)
}

defineEmits(['toggle-expand', 'duplicate', 'delete'])
const blockStore = useBlockStore()
const gridStore = useGridStore()

const openGridControl = () => {
  blockStore.setSelectedBlockId(props.block.id)
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
