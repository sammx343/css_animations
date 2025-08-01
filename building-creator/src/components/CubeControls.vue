<template>
    <div class="controls">
        <h2>Controls:</h2>
        <div class="controls--group">
            <label for="cube-height">Zoom: {{ zoom }}</label>
            <input id="cube-height" type="range" min="0.2" max="1.5" step="0.01" :value="zoom"
                @input="updateZoom(($event.target as HTMLInputElement).value)" />
        </div>
        <div class="controls--group">
            <label for="cube-width">Cube Width:</label>
            <input id="cube-width" type="range" min="1" max="1000" :value="cubeProperties.width"
                @input="updateDimension('width', ($event.target as HTMLInputElement).value)" />
            <p>{{ cubeProperties.width }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-height">Cube Height:</label>
            <input id="cube-height" type="range" min="1" max="1000" :value="cubeProperties.height"
                @input="updateDimension('height', ($event.target as HTMLInputElement).value)" />
            <p>{{ cubeProperties.height }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-long">Cube Long:</label>
            <input id="cube-long" type="range" min="1" max="1000" :value="cubeProperties.long"
                @input="updateDimension('long', ($event.target as HTMLInputElement).value)" />
            <p>{{ cubeProperties.long }}</p>
        </div>
        <div class="controls--group">
            <h3>Color picker:</h3>
            <div v-for="(color, index) in cubeProperties.colors" class="" :key="`color-index-${index}`"
                style="position: relative; display: flex;">
                <p>{{ color.hex }}</p>
                <input id="cube-color-picker" type="color" :value="color.hex"
                    @input="updateColor(($event.target as HTMLInputElement).value, index)" />
                <v-icon v-if="cubeProperties.colors.length > 1" name="md-deleteforever-outlined"
                    style="position: absolute; right: 0; top: 0; cursor: pointer;" @click="deleteColor(index)"></v-icon>
            </div>
            <button class="butt*on grid-button" @click="addColors()" style="background: blue; margin-bottom: 10px;">Add
                color
                <v-icon name="md-addcircle-outlined"></v-icon></button>
        </div>
        <div class="controls--group">
            <button class="button" @click="openGridControl" style="background: violet;">Grid options</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Cube } from '@/types/cube';

const props = defineProps<{
    cubeProperties: Cube,
    zoom: string
}>();

const emit = defineEmits(['update:cubeProperties', 'update:isGridControlOpen', 'update:zoom']);

const updateDimension = (dimension: string, value: string) => {
    emit('update:cubeProperties', {
        ...props.cubeProperties,
        [dimension]: value,
    });
};

const addColors = () => {
    const newColorArray = [...props.cubeProperties.colors, { hex: "#000000" }];

    emit('update:cubeProperties', {
        ...props.cubeProperties,
        colors: newColorArray,
    });
};

const updateColor = (hex: string, index: number) => {
    const newColorArray = [...props.cubeProperties.colors];
    newColorArray[index].hex = hex;

    emit('update:cubeProperties', {
        ...props.cubeProperties,
        colors: newColorArray,
    });
};

function deleteColor(index: number) {
    const newColorArray = [...props.cubeProperties.colors];
    newColorArray.splice(index, 1);

    emit('update:cubeProperties', {
        ...props.cubeProperties,
        colors: newColorArray,
    });
}

const openGridControl = () => {
    emit('update:isGridControlOpen', true);
};

const updateZoom = (value: string) => {
    emit('update:zoom', value);
}
</script>

<style scoped></style>