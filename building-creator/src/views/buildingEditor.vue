<template>
  <main class="main">
    <div class="controls">
      <div v-if="!gridStore.getGridControlOpen()">
        <BuildingTitleHeader />
        <BuildingActions @open-building-list="showBuildingsModal = true" />
        <BlockList />
      </div>

      <GridControl
        v-if="gridStore.getGridControlOpen() && selectedCube"
        :cube="selectedCube"
        :grids="selectedCube.grids"
        @update:grids="updateGrids"
        @close="() => gridStore.setGridControlOpen(false)"
      />
    </div>

    <CubeScene :blocks="buildingStore.building.blocks" :zoom="zoom" @update:zoom="zoom = $event" />

    <Modal v-if="showBuildingsModal" @close-modal="showBuildingsModal = false">
      <BuildingList @close="showBuildingsModal = false" />
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useBuildingStore } from '@/store/buildingStore'
import { useGridStore } from '@/store/gridStore'
import { useCubeStore } from '@/store/cubeStore'

import BuildingTitleHeader from '@/components/editor/BuildingTitleHeader.vue'
import BuildingActions from '@/components/editor/BuildingActions.vue'
import BuildingList from '@/components/editor/LoadBuildingModal/BuildingList.vue'

import GridControl from '@/components/editor/grid/GridControl.vue'
import BlockList from '@/components/editor/block/BlockList.vue'
import CubeScene from '@/components/scene/CubeScene.vue'
import Modal from '@/components/UI/Modal.vue'
import type { Grid } from '@/types/grid'

const buildingStore = useBuildingStore()
const gridStore = useGridStore()
const cubeStore = useCubeStore()

const showBuildingsModal = ref(false)
const zoom = ref('1')
const selectedCube = computed(() => cubeStore.getSelectedCubeFromId)

const updateGrids = (grids: Grid[], cubeId: string) => {
  buildingStore.updateBlockGrids(grids, cubeId)
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
