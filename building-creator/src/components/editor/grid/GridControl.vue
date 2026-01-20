<!-- GridItem.vue -->
<template>
  <div class="grids" ref="gridRef" :class="{ selected: isSelected }">
    <h3>Current block: {{ block.name }}</h3>
    <div class="d-flex flex-start">
      <label>Name: </label>
      <input :id="`name-${grid.id}`" type="text" v-model="localGrid.name" @input="update" />
    </div>
    <div class="d-flex">
      <button class="grid-button duplicate-grid" @click="$emit('duplicate', grid)">
        <v-icon name="hi-duplicate" />Duplicate
      </button>
      <button class="grid-button delete-grid" @click="$emit('delete', grid.id)">
        <v-icon name="md-deleteforever-outlined"></v-icon> Delete
      </button>
      <button
        :disabled="cantSwitchUp"
        class="grid-button"
        @click="$emit('switch-position', index, -1)"
      >
        <v-icon name="bi-arrow-up" style="fill: black" />
      </button>
      <button
        :disabled="cantSwitchDown"
        class="grid-button"
        @click="$emit('switch-position', index, 1)"
      >
        <v-icon name="bi-arrow-down" style="fill: black" />
      </button>
    </div>
    <div class="controls-expandable-icon" @click="$emit('toggle-expand', index)">
      <v-icon v-if="isExpanded" name="bi-arrow-up" style="fill: black" />
      <v-icon v-else name="bi-arrow-down" style="fill: black" />
    </div>
    <GridControlForm
      v-if="isExpanded"
      :grid="grid"
      :index="index"
      :is-expanded="isExpanded"
      @update:grid="update"
    />
  </div>
</template>

<script setup lang="ts">
import type { Grid } from '@/types/grid'
import type { Block } from '@/types/block'
import { ref } from 'vue'
import GridControlForm from './GridControlForm.vue'

const props = defineProps<{
  block: Block
  cantSwitchUp: boolean
  cantSwitchDown: boolean
  grid: Grid
  index: number
  isExpanded: boolean
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'update:grid', grid: Grid): void
  (e: 'duplicate', grid: Grid): void
  (e: 'delete', id: string): void
  (e: 'switch-position', index: number, flag: number): void
  (e: 'toggle-expand', index: number): void
}>()

const localGrid = ref({ ...props.grid })

const update = (newGrid: Grid) => {
  emit('update:grid', newGrid)
}
</script>
