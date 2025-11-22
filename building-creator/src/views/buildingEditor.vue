<template>
  <main class="main">
    <div class="controls">
      <BuildingHeader />
      <BuildingActions @open-building-list="showBuildingsModal = true" />
      <BlockList />
      <GridControlsPanel
        v-if="isGridControlsOpen && selectedCube"
        :cube="selectedCube"
        :grids="selectedCube.grids"
        @update:grids="updateGrids"
        @close="isGridControlsOpen = false"
      />
    </div>

    <CubeSceneViewer
      :blocks="buildingStore.building.blocks"
      :zoom="zoom"
      @update:zoom="zoom = $event"
    />

    <Modal v-if="showBuildingsModal" @close-modal="showBuildingsModal = false">
      <BuildingListModal @close="showBuildingsModal = false" />
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useBuildingStore } from '@/store/buildingStore'
import { useGridStore } from '@/store/gridStore'
import { useCubeStore } from '@/store/cubeStore'

import BuildingHeader from '@/components/building/BuildingHeader.vue'
import BuildingActions from '@/components/building/BuildingActions.vue'
import BuildingListModal from '@/components/building/BuildingListModal.vue'
import BlockList from '@/components/block/BlockList.vue'
import GridControlsPanel from '@/components/grid/GridControlsPanel.vue'
import CubeSceneViewer from '@/components/scene/CubeSceneViewer.vue'
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
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
  overflow-y: auto;
  padding: 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
</style>
