<template>
    <div class="cube__face" :class="`cube__face--${faceIndex + 1}`" :style="faceStyle">
        <template v-for="grid in grids">
            <GridWindows v-if="!grid.excludedFaces.includes(faceIndex + 1)" :key="grid.id" :grid="grid"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import GridWindows from './GridWindows.vue';
import type { Grid } from '@/types/grid';
import type { Cube } from '@/types/cube';
const props = defineProps<{
    faceIndex: number,
    cubeProperties: Cube,
    grids: Grid[]
}>();

const faceStyle = computed(() => {
    const { width, long, height } = props.cubeProperties;
    const index = props.faceIndex;
    const style = { background: props.cubeProperties.color.hex, transform: '', width: '', height: '' };

    if (index === 0) {
        style.transform = `translateZ(${width / 2}px)`;
        style.width = `${long}px`;
        style.height = `${height}px`;
    } else if (index === 1) {
        style.transform = `rotateY(180deg) translateZ(${width / 2}px)`;
        style.width = `${long}px`;
        style.height = `${height}px`;
    } else if (index === 2) {
        style.transform = `rotateY(-90deg) translateZ(${width / 2}px)`;
        style.width = `${width}px`;
        style.height = `${height}px`;
    } else if (index === 3) {
        const sum = long - width;
        style.transform = `rotateY(90deg) translateZ(${width / 2 + sum}px)`;
        style.width = `${width}px`;
        style.height = `${height}px`;
    } else if (index === 4) {
        style.width = `${long}px`;
        style.height = `${width}px`;
        style.transform = `rotateX(90deg) translateZ(${width / 2}px)`;
    } else if (index === 5) {
        const sum = height - width;
        style.width = `${long}px`;
        style.height = `${width}px`;
        style.transform = `rotateX(-90deg) translateZ(${width / 2 + sum}px)`;
    }

    return style;
});
</script>

<style scoped>
.cube__face {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    backface-visibility: inherit;
    border: 2px solid black;
}
</style>