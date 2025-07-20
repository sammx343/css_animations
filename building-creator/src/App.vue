<template>
  <main class="main">
    <CubeControls v-if="!isRowControlsOpen" :cube-properties="cubeProperties"
      @update:cube-properties="updateCubeProperties" @update:is-row-control-open="updateIsRowControlOpen" :zoom="zoom"
      @update:zoom="updateZoom" />
    <RowControls v-if="isRowControlsOpen" :rows="cubeProperties.rows" @update:rows="updateRows"
      @update:is-row-control-open="updateIsRowControlOpen" />
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

const cubeProperties = reactive<Cube>({
  width: 400,
  height: 500,
  long: 600,
  color: { hex: '#ff7360' },
  rows: [
    {
      id: 1,
      number: 5,
      color: 'black',
      top: '50%',
      windowWidth: '100%',
      windowHeight: '100%',
      gap: '5%',
      excludedFaces: [5, 6],
    },
    {
      id: 2,
      number: 6,
      color: 'black',
      top: '80%',
      windowWidth: '10%',
      windowHeight: '10%',
      gap: '10%',
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