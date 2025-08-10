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
                @input="updateProperty('width', ($event.target as HTMLInputElement).value)" />
            <p>{{ cubeProperties.width }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-height">Cube Height:</label>
            <input id="cube-height" type="range" min="1" max="1000" :value="cubeProperties.height"
                @input="updateProperty('height', ($event.target as HTMLInputElement).value)" />
            <p>{{ cubeProperties.height }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-long">Cube Long:</label>
            <input id="cube-long" type="range" min="1" max="1000" :value="cubeProperties.long"
                @input="updateProperty('long', ($event.target as HTMLInputElement).value)" />
            <p>{{ cubeProperties.long }}</p>
        </div>
        <div class="controls--group">
            <h3>Color picker:</h3>
            <div class="d-flex">
                <label :for="`color-percentage-angle`">Angle: {{ cubeProperties.colorsAngle }}</label>
                <input :id="`color-percentage-angle`" type="range" min="1" max="360"
                    @input="updateProperty('colorsAngle', ($event.target as HTMLInputElement).value)" />
            </div>
            <div v-for="(color, index) in cubeProperties.colors" class="" :key="`color-index-${index}`"
                style="position: relative;">
                <div class="d-flex">
                    <p>Color {{ index }} : {{ color.hex }}</p>
                    <input id="cube-color-picker" type="color" :value="color.hex"
                        @input="updateColor(($event.target as HTMLInputElement).value, index)" />
                </div>
                <div class="d-flex">
                    <label :for="`color-percentage-${index}`">{{ parseInt(color.percentage)
                        }}%</label>
                    <input :id="`color-percentage-${index}`" type="range" min="1" max="100"
                        v-model="color.percentage" />
                </div>
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
import type { Color } from '@/types/color';

const props = defineProps<{
    cubeProperties: Cube,
    zoom: string
}>();

const emit = defineEmits(['update:cubeProperties', 'update:isGridControlOpen', 'update:zoom']);

const updateProperty = (dimension: string, value: string) => {
    emit('update:cubeProperties', {
        ...props.cubeProperties,
        [dimension]: value,
    });
};

const addColors = () => {
    const colorsCopy = [...props.cubeProperties.colors, { hex: "#000000", percentage: 100 }];

    const colors = colorsCopy.map((color: Color, index: number) => {
        return { ...color, percentage: (100 / (colorsCopy.length)) * (index + 1) }
    });

    emit('update:cubeProperties', {
        ...props.cubeProperties,
        colors: colors,
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