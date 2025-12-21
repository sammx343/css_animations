<template>
  <div class="block-list">
    <BlockControl
      v-for="(block, index) in blocks"
      :key="block.id"
      :block="block"
      :index="index"
      :is-expanded="expandedBlocks[block.id]"
      @toggle-expand="toggleExpand(block.id)"
      @duplicate="duplicateBlock"
      @delete="deleteBlock"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBuildingStore } from '@/store/useBuildingStore'
import BlockControl from './BlockControl.vue'

const buildingStore = useBuildingStore()
const blocks = computed(() => buildingStore.building.blocks)
const isBlockExpanded = ref(new Array(buildingStore.building.blocks.length).fill(false))

const expandedBlocks = ref<{ [key: string]: boolean }>({})

const toggleExpand = (id: string) => {
  expandedBlocks.value[id] = !expandedBlocks.value[id]
}

const duplicateBlock = (block: any) => {
  const duplicatedBlock = buildingStore.duplicateBlock(block)
  expandedBlocks.value[block.id + '_copy'] = true
  expandBlock(duplicatedBlock)
}

const expandBlock = (block: block | undefined) => {
  if (!block) return
  isBlockExpanded.value = new Array(buildingStore.building.blocks.length).fill(false)
  const selectedBlockIndex = buildingStore.building.blocks.findIndex(
    (block) => block.id === block.id,
  )
  isBlockExpanded.value[selectedBlockIndex] = true
}

const deleteBlock = (id: string) => {
  if (blocks.value.length > 1) {
    buildingStore.deleteBlock(id)
    delete expandedBlocks.value[id]
  }
}
</script>
