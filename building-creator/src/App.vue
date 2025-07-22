<template>
  <main class="main">
    <CubeControls v-if="!isRowControlsOpen" :cube-properties="cubeProperties"
      @update:cube-properties="updateCubeProperties" @update:is-row-control-open="updateIsRowControlOpen" :zoom="zoom"
      @update:zoom="updateZoom" />
    <RowControls v-if="isRowControlsOpen"
      :cube-dimensions="{ width: cubeProperties.width, height: cubeProperties.height }" :rows="cubeProperties.rows"
      @update:rows="updateRows" @update:is-row-control-open="updateIsRowControlOpen" />
    <CubeScene :cube-properties="cubeProperties" :zoom="zoom" />
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import CubeScene from './components/CubeScene.vue';
import CubeControls from './components/CubeControls.vue';
import RowControls from './components/RowControls.vue';
import type { Cube } from '@/types/cube';
import type { Row } from '@/types/row';
import { generateId } from './utils/generateId';

const cubeProperties = reactive<Cube>({
  width: 300,
  height: 300,
  long: 300,
  color: { hex: '#ff7360' },
  rows: [
    {
      id: generateId(),
      number: 5,
      color: 'black',
      top: '0%',
      left: '0%',
      windowWidth: '100px',
      windowHeight: '100px',
      gap: '5px',
      isColumn: true,
      excludedFaces: [5, 6],
    },
    {
      id: generateId(),
      number: 6,
      color: 'black',
      top: '0%',
      left: '0%',
      windowWidth: '10px',
      windowHeight: '10px',
      gap: '10px',
      isColumn: true,
      excludedFaces: [5, 6],
    },
  ],
});

const zoom = ref("1");

const isRowControlsOpen = ref(false);

const updateIsRowControlOpen = (value: boolean) => {
  isRowControlsOpen.value = value;
};

const updateCubeProperties = (newProperties: CubeConfig) => {
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