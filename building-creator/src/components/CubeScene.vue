<template>
    <div class="scene" ref="sceneRef">
        <div class="scene-container" :style="cubeContainerStyle" ref="sceneContainerRef">
            <div class="cube" ref="cubeRef" :style="cubeStyle">
                <CubeFace v-for="(face, index) in cubeFaces" :key="index" :face-index="index"
                    :cube-properties="cubeProperties" :rows="cubeProperties.rows" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CubeFace from './CubeFace.vue';

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

const cubeRef = ref(null);
const sceneRef = ref(null);
const cubeFaces = ref(new Array(6).fill(null));
const sumX = ref(0);
const sumY = ref(0);
let lastMouseX = 0;
let lastMouseY = 0;

const cubeContainerStyle = computed(() => ({
    transform: `scale(${props.zoom})`
}));

const cubeStyle = computed(() => ({
    width: `${props.cubeProperties.long}px`,
    height: `${props.cubeProperties.height}px`,
    transform: `rotateX(${sumY.value}deg) rotateY(${sumX.value}deg) translate(50%, -50%)`,
}));

onMounted(() => {
    sceneRef.value.addEventListener('mousemove', (event: { buttons: number; clientX: number; clientY: number; }) => {
        if (event.buttons === 1) {
            const currentMouseX = event.clientX;
            const currentMouseY = event.clientY;

            if (currentMouseX > lastMouseX) sumX.value += 2;
            else if (currentMouseX < lastMouseX) sumX.value -= 2;

            if (currentMouseY > lastMouseY) sumY.value -= 2;
            else if (currentMouseY < lastMouseY) sumY.value += 2;

            lastMouseX = currentMouseX;
            lastMouseY = currentMouseY;
        }
    });
});
</script>

<style scoped>
.scene {
    perspective: 1050px;
    width: 100%;
    height: 100vh;
}

.cube {
    position: absolute;
    top: 50%;
    right: 50%;
    transform-style: preserve-3d;
    transform-origin: top right;
}

.scene-container {
    position: relative;
    left: 100px;
    transform: scale(1);
    width: 100%;
    height: 100%;
    perspective: 1050px;
}
</style>