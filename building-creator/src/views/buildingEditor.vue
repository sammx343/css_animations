<template>
  <main class="main">
    <div class="controls">
      <div v-if="!gridStore.getGridControlOpen()">
        <BuildingHeader />
        <BuildingActions @open-building-list="showBuildingsModal = true" />
        <BlockList />
      </div>
      <GridControls
        v-if="gridStore.getGridControlOpen() && selectedCube"
        :cube="selectedCube"
        :grids="selectedCube.grids"
        @update:grids="updateGrids"
        @close="() => gridStore.setGridControlOpen(false)"
      />
      <!-- <div class="expandable" :class="{ expanded: isBlockExpanded[index] }">
        <CubeControls
          v-if="!isGridControlsOpen"
          :cube-properties="block"
          @update:cube-properties="updateCubeProperties"
          @update:is-grid-control-open="(value) => openGridControl(value, block)"
          :zoom="zoom"
        />
      </div> -->
    </div>

    <CubeScene :blocks="buildingStore.building.blocks" :zoom="zoom" @update:zoom="zoom = $event" />

    <Modal v-if="showBuildingsModal" @close-modal="showBuildingsModal = false">
      <BuildingList @close="showBuildingsModal = false" />
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useBuildingStore } from '@/store/buildingStore'
import { useGridStore } from '@/store/gridStore'
import { useCubeStore } from '@/store/cubeStore'

import BuildingHeader from '@/components/editor/BuildingHeader.vue'
import BuildingActions from '@/components/editor/BuildingActions.vue'
import BuildingList from '@/components/editor/LoadBuildingModal/BuildingList.vue'

import GridControls from '@/components/editor/GridControls.vue'
import BlockList from '@/components/editor/BlockList.vue'
import CubeScene from '@/components/scene/CubeScene.vue'
import Modal from '@/components/UI/Modal.vue'

const buildingStore = useBuildingStore()
const gridStore = useGridStore()
const cubeStore = useCubeStore()

const showBuildingsModal = ref(false)
const zoom = ref('1')
const isGridControlsOpen = ref(false)
const selectedCube = ref<any>(null)

// React to global selections
watch(gridStore.getSelectedGrid, async (value) => {
  if (!value) return
  isGridControlsOpen.value = true
  selectedCube.value = buildingStore.building.blocks.find((b) => b.id === value.cubeId)
})

watch(cubeStore.getSelectedCube, (value) => {
  console.log('does open')
  isGridControlsOpen.value = false
  if (value?.cube) selectedCube.value = value.cube
})

const updateGrids = (grids: any[], cubeId: string) => {
  buildingStore.updateBlockGrids(cubeId, grids)
}

onBeforeMount(() => {
  buildingStore.initializeDefaultBuildings()
})
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100vh;
}
.controls {
  position: fixed;
  top: 0;
  left: 0;
  width: 380px;
  height: 100%;
  z-index: 10;
  overflow-y: auto;
  padding: 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
</style>
