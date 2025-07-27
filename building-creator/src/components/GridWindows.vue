<template>
    <div class="grid" :style="rowStyle">
        <template v-for="index in grid.rows * grid.columns">
            <div v-if="!isWindowExcluded(index)" @dblclick="selectGrid()"  :key="index" class="window individual-window" :style="windowStyle">
            </div>
            <div v-else :key="index + '-'"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGridStore } from '@/store/gridStore';
import type { Grid } from '@/types/grid';

const props = defineProps<{
    grid: Grid,
}>();

const rowStore = useGridStore();

const rowStyle = computed(() => ({
    width: props.grid.gridWidth,
    height: props.grid.gridHeight,
    position: 'absolute',
    top: props.grid.top,
    left: props.grid.left,
    rowGap: props.grid.columnGap,
    columnGap: props.grid.rowGap,
    transform: 'translate(0%, 0%)',
    gridTemplateColumns: `repeat(${props.grid.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.grid.rows}, 1fr)`
}));

const windowStyle = computed(() => ({
    backgroundColor: props.grid.color,
    borderTop: `${props.grid.borderTop.size}px ${props.grid.borderTop.style} ${props.grid.borderTop.color}`,
    borderRadius: props.grid.borderRadius,
    width: props.grid.windowWidth,
    height: props.grid.windowHeight,
}));

const isWindowExcluded = (index: number) => {
    return props.grid.excludedWindows?.includes(index);
};

const selectGrid = () => {
    rowStore.setSelectedGrid(props.grid);
};
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