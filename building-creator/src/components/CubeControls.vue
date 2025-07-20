<template>
    <div class="controls">
        <h2>Controls:</h2>
        <div class="controls--group">
            <label for="cube-height">Zoom: {{ zoom }}</label>
            <input id="cube-height" type="range" min="0.2" max="1.5" step="0.01" :value="zoom"
                @input="updateZoom($event.target.value)" />
        </div>
        <div class="controls--group">
            <label for="cube-width">Cube Width:</label>
            <input id="cube-width" type="range" min="1" max="1000" :value="cubeProperties.width"
                @input="updateDimension('width', $event.target.value)" />
            <p>{{ cubeProperties.width }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-height">Cube Height:</label>
            <input id="cube-height" type="range" min="1" max="1000" :value="cubeProperties.height"
                @input="updateDimension('height', $event.target.value)" />
            <p>{{ cubeProperties.height }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-long">Cube Long:</label>
            <input id="cube-long" type="range" min="1" max="1000" :value="cubeProperties.long"
                @input="updateDimension('long', $event.target.value)" />
            <p>{{ cubeProperties.long }}</p>
        </div>
        <div class="controls--group">
            <label for="cube-color-picker">Color picker:</label>
            <input id="cube-color-picker" type="color" :value="cubeProperties.color.hex"
                @input="updateColor($event.target.value)" />
            <p>{{ cubeProperties.color.hex }}</p>
        </div>
        <div class="controls--group">
            <button @click="openRowControl">Row options</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    cubeProperties: {
        type: Object,
        required: true,
    },
    zoom: {
        type: String,
        default: "1"
    }
});

const emit = defineEmits(['update:cubeProperties', 'update:isRowControlOpen', 'update:zoom']);

const updateDimension = (dimension: string, value: string) => {
    emit('update:cubeProperties', {
        ...props.cubeProperties,
        [dimension]: value,
    });
};

const updateColor = (hex: string) => {
    emit('update:cubeProperties', {
        ...props.cubeProperties,
        color: { ...props.cubeProperties.color, hex },
    });
};

const openRowControl = () => {
    emit('update:isRowControlOpen', true);
};

const updateZoom = (value: string) => {
    console.log(value);
    emit('update:zoom', value);
}
</script>

<style scoped></style>