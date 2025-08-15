<template>
  <main class="main">
    <div class="controls">
      <h2>Controls</h2>
      <div class="controls-container">
        <div class="cube-control" v-for="(block, index) in reactiveBlocks" :key="index">
          <hr>
          <h3>Block #{{ index + 1 }}</h3>
          <hr>
          <div class="expandable" :class="{ expanded: isBlockExpanded[index] }">
            <CubeControls v-if="!isGridControlsOpen" :cube-properties="block"
              @update:cube-properties="updateCubeProperties" @update:is-grid-control-open="updateIsGridControlOpen"
              :zoom="zoom" />
            <GridControls v-if="isGridControlsOpen" :selected-grid="selectedGrid"
              :cube-dimensions="{ width: block.width, height: block.height }" :grid="block.grids"
              @update:grids="updateGrid" @update:is-grid-control-open="updateIsGridControlOpen" />
          </div>
          <p class="expandable-icon" @click="changeExpand(index)">V</p>
        </div>
      </div>
    </div>
    <CubeScene :zoom="zoom" @update:zoom="updateZoom" :blocks="reactiveBlocks" />
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

const blocks: Cube[] = [
  {
    id: generateId(),
    width: 300,
    height: 300,
    long: 300,
    colors: [{ hex: '#ff7360', percentage: 100 }],
    colorsAngle: 0,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    grids: [
      {
        id: generateId(),
        name: 'Grid 0',
        rows: 5,
        columns: 5,
        excludedWindows: [],
        colors: [{ hex: '#000000', percentage: 100 }],
        colorsAngle: 0,
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
        borderTop: {
          size: 0,
          style: 'none',
          color: '#000000'
        }
      },
    ],
  },
  {
    id: generateId(),
    width: 100,
    height: 100,
    long: 100,
    colors: [{ hex: '#ff0000', percentage: 100 }],
    colorsAngle: 0,
    left: -300,
    bottom: 0,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    grids: [
      {
        id: generateId(),
        name: 'Grid 0',
        rows: 2,
        columns: 2,
        excludedWindows: [],
        colors: [{ hex: '#000000', percentage: 100 }],
        colorsAngle: 0,
        top: '0%',
        left: '0%',
        windowWidth: '40%',
        windowHeight: '40%',
        gridWidth: '100%',
        gridHeight: '100%',
        rowGap: '5px',
        columnGap: '5px',
        borderRadius: '0%',
        excludedFaces: [5, 6],
        borderTop: {
          size: 0,
          style: 'none',
          color: '#000000'
        }
      },
    ],
  },
];

const reactiveBlocks = ref<Cube[]>(blocks);

const isBlockExpanded = ref(new Array(reactiveBlocks.value.length).fill(false));

const cubeProperties = reactive<Cube>({
  id: generateId(),
  width: 300,
  height: 300,
  long: 300,
  colors: [{ hex: '#ff7360', percentage: 100 }],
  colorsAngle: 0,
  grids: [
    {
      id: generateId(),
      name: 'Grid 0',
      rows: 5,
      columns: 5,
      excludedWindows: [],
      colors: [{ hex: '#000000', percentage: 100 }],
      colorsAngle: 0,
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
      borderTop: {
        size: 0,
        style: 'none',
        color: '#000000'
      }
    },
  ],
});

const selectedGrid = ref<Grid>();
const gridStore = useGridStore();

const zoom = ref("1");

const isGridControlsOpen = ref(false);


const changeExpand = (index: number) => {
  isBlockExpanded.value[index] = !isBlockExpanded.value[index];
};

watch(gridStore.getSelectedGrid, async (value) => {
  isGridControlsOpen.value = true;
  await nextTick();
  selectedGrid.value = value;
});

const updateIsGridControlOpen = (value: boolean) => {
  isGridControlsOpen.value = value;
};

const updateCubeProperties = (newBlock: Cube) => {
  reactiveBlocks.value = reactiveBlocks.value.map((block: Cube) => {
    if (block.id === newBlock.id) return newBlock;
    return block;
  })
};

const updateGrid = (grids: Grid[]) => {
  cubeProperties.grids = grids;
};

const updateZoom = (value: string) => {
  zoom.value = value;
}
</script>

<style scoped>
.controls-container {
  max-height: 80vh;
  overflow-y: scroll;
}

.expandable {
  max-height: 0vh;
  overflow: hidden;
}

.expandable.expanded {
  max-height: 200vh;
  /* transition: 0.5s max-height; */
}

.expandable-icon {
  display: flex;
  justify-content: center;
  background: bisque;
  border-radius: 10px;
  font-family: system-ui;
  border: 2px solid black;
  cursor: pointer;
}

.main {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>