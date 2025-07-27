<template>
  <main class="main">
    <CubeControls v-if="!isGridControlsOpen" :cube-properties="cubeProperties"
      @update:cube-properties="updateCubeProperties" @update:is-grid-control-open="updateIsGridControlOpen" :zoom="zoom"
      @update:zoom="updateZoom" />
    <GridControls v-if="isGridControlsOpen" :selected-grid="selectedGrid"
      :cube-dimensions="{ width: cubeProperties.width, height: cubeProperties.height }" :grid="cubeProperties.grids"
      @update:grids="updateGrid" @update:is-grid-control-open="updateIsGridControlOpen" />
    <CubeScene :cube-properties="cubeProperties" :zoom="zoom" />
  </main>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue';
import CubeScene from './components/CubeScene.vue';
import CubeControls from './components/CubeControls.vue';
import GridControls from './components/GridControls.vue';
import type { Cube } from '@/types/cube';
import type { Grid } from '@/types/grid';
import { generateId } from './utils/generateId';
import { useGridStore } from '@/store/gridStore';

const cubeProperties = reactive<Cube>({
  width: 300,
  height: 300,
  long: 300,
  color: { hex: '#ff7360' },
  grids: [
    {
      id: generateId(),
      name: 'Grid 0',
      rows: 5,
      columns: 5,
      excludedWindows: [],
      color: '#000000',
      top: '2%',
      left: '2%',
      windowWidth: '50%',
      windowHeight: '50%',
      gridWidth: '100%',
      gridHeight: '100%',
      rowGap: '5px',
      columnGap: '5px',
      borderRadius: '0%',
      excludedFaces: [5, 6],
    },
  ],
});

const selectedGrid = ref<Grid>();
const rowStore = useGridStore();

const zoom = ref("1");

const isGridControlsOpen = ref(false);

watch(rowStore.getSelectedGrid, async (value) => {
  isGridControlsOpen.value = true;
  await nextTick();
  selectedGrid.value = value;
});

const updateIsGridControlOpen = (value: boolean) => {
  isGridControlsOpen.value = value;
};

const updateCubeProperties = (newProperties: Cube) => {
  Object.assign(cubeProperties, newProperties);
};

const updateGrid = (grids: Grid[]) => {
  cubeProperties.grids = grids;
};

const updateZoom = (value: string) => {
  zoom.value = value;
}
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>