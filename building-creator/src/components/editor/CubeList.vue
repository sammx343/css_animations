<template>
  <!-- v-if="!isGridControlsOpen" -->
  <div class="controls-container">
    <div class="cube-control" v-for="(block, index) in buildingStore.building.blocks" :key="index">
      <hr />
      <div class="d-flex flex-start">
        <label>Name: </label>
        <h3><input :id="`name-${block.id}`" type="text" v-model="block.name" /></h3>
      </div>

      <div class="expandable-icon" @click="changeExpand(index)">
        <v-icon v-if="isBlockExpanded[index]" name="bi-arrow-up" style="fill: black" />
        <v-icon v-else name="bi-arrow-down" style="fill: black" />
      </div>
      <div class="d-flex">
        <button class="grid-button duplicate-grid" @click="duplicateBlock(block)">
          <v-icon name="hi-duplicate" />Duplicate
        </button>

        <div class="cube-controls--group">
          <button class="button" @click="openGridControl(true, block)" style="background: violet">
            Grid options
          </button>
        </div>
        <button v-if="index != 0" class="grid-button delete-grid" @click="deleteBlock(block.id)">
          <v-icon name="md-deleteforever-outlined"></v-icon> Delete
        </button>
      </div>
      <div class="expandable" :class="{ expanded: isBlockExpanded[index] }">
        <CubeControls
          :cube-properties="block"
          @update:cube-properties="updateCubeProperties"
          @update:is-grid-control-open="(value) => openGridControl(value, block)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBuildingStore } from '@/store/buildingStore'
import CubeControls from './CubeControls.vue'
import { ref } from 'vue'

const buildingStore = useBuildingStore()
const isBlockExpanded = ref(new Array(buildingStore.building.blocks.length).fill(false))

const changeExpand = (index: number) => {
  isBlockExpanded.value[index] = !isBlockExpanded.value[index]
}
</script>
