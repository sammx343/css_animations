<template>
  <div class="grid" :style="rowStyle">
    <template v-for="index in grid.rows * grid.columns">
      <div
        v-if="!isWindowExcluded(index)"
        @dblclick.stop="selectGrid()"
        :key="index"
        class="window individual-window"
        :style="windowStyle"
      ></div>
      <div v-else :key="index + '-'"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGridStore } from '@/store/gridStore'
import type { Grid } from '@/types/grid'

const props = defineProps<{
  grid: Grid
  cubeId: string
}>()

const rowStore = useGridStore()

const rowStyle = computed(() => ({
  width: `${props.grid.gridWidth}%`,
  height: `${props.grid.gridHeight}%`,
  position: 'absolute',
  top: props.grid.top,
  left: props.grid.left,
  rowGap: props.grid.columnGap,
  columnGap: props.grid.rowGap,
  transform: 'translate(0%, 0%)',
  gridTemplateColumns: `repeat(${props.grid.columns}, 1fr)`,
  gridTemplateRows: `repeat(${props.grid.rows}, 1fr)`,
}))

const windowStyle = computed(() => ({
  background: colorsToLinearBackground(props.grid.colors),
  borderTop: props.grid.borderTop
    ? `${props.grid.borderTop.size}px ${props.grid.borderTop.style} ${props.grid.borderTop.color}`
    : '',
  borderBottom: props.grid.borderBottom
    ? `${props.grid.borderBottom.size}px ${props.grid.borderBottom.style} ${props.grid.borderBottom.color}`
    : '',
  borderLeft: props.grid.borderLeft
    ? `${props.grid.borderLeft.size}px ${props.grid.borderLeft.style} ${props.grid.borderLeft.color}`
    : '',
  borderRight: props.grid.borderRight
    ? `${props.grid.borderRight.size}px ${props.grid.borderRight.style} ${props.grid.borderRight.color}`
    : '',
  borderRadius: props.grid.borderRadius,
  width: props.grid.windowWidth,
  height: props.grid.windowHeight,
}))

const colorsToLinearBackground = (colors: { hex: string; percentage: number }[]) => {
  const colorString = colors.map((color) => `${color.hex} ${color.percentage}%`)
  return `linear-gradient(${props.grid.colorsAngle || 0}deg, ${colorString})`
}

const isWindowExcluded = (index: number) => {
  return props.grid.excludedWindows?.includes(index)
}

const selectGrid = () => {
  rowStore.setSelectedGrid(props.cubeId, props.grid)
}
</script>

<style scoped>
.grid {
  display: grid;
  position: absolute;
  pointer-events: none;
}

.window {
  pointer-events: all;
}

.window.individual-window {
  /* Additional styles if needed */
}
</style>
