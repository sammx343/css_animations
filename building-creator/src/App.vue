<template>
  <main class="main">
    <CubeControls v-if="!isRowControlsOpen" :cube-properties="cubeProperties"
      @update:cube-properties="updateCubeProperties" @update:is-row-control-open="updateIsRowControlOpen" :zoom="zoom"
      @update:zoom="updateZoom" />
    <RowControls v-if="isRowControlsOpen" :selected-row="selectedRow"
      :cube-dimensions="{ width: cubeProperties.width, height: cubeProperties.height }" :rows="cubeProperties.rows"
      @update:rows="updateRows" @update:is-row-control-open="updateIsRowControlOpen" />
    <CubeScene :cube-properties="cubeProperties" :zoom="zoom" />
  </main>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue';
import CubeScene from './components/CubeScene.vue';
import CubeControls from './components/CubeControls.vue';
import RowControls from './components/RowControls.vue';
import type { Cube } from '@/types/cube';
import type { Row } from '@/types/row';
import { generateId } from './utils/generateId';
import { useRowStore } from '@/store/rowStore';

const cubeProperties = reactive<Cube>({
  width: 300,
  height: 300,
  long: 300,
  color: { hex: '#ff7360' },
  rows: [
    {
      id: generateId(),
      name: 'Row 1',
      number: 5,
      color: '#000000',
      top: '0%',
      left: '0%',
      windowWidth: '20%',
      windowHeight: '20%',
      gap: '5px',
      borderRadius: '0%',
      isColumn: true,
      excludedFaces: [5, 6],
    },
    {
      id: generateId(),
      name: 'Row 2',
      number: 6,
      color: '#000000',
      top: '0%',
      left: '50%',
      windowWidth: '10%',
      windowHeight: '10%',
      borderRadius: '0%',
      gap: '10px',
      isColumn: true,
      excludedFaces: [5, 6],
    },
  ],
});

const selectedRow = ref<Row>();
const rowStore = useRowStore();

const zoom = ref("1");

const isRowControlsOpen = ref(false);

watch(rowStore.getSelectedRow, async (value) => {
  isRowControlsOpen.value = true;
  await nextTick();
  selectedRow.value = value;
});

const updateIsRowControlOpen = (value: boolean) => {
  isRowControlsOpen.value = value;
};

const updateCubeProperties = (newProperties: Cube) => {
  Object.assign(cubeProperties, newProperties);
};

const updateRows = (rows: Row[]) => {
  cubeProperties.rows = rows;
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