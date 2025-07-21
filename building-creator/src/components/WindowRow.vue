<template>
    <div class="row" :style="rowStyle" @click="selectRow">
        <div v-for="index in parseInt(row.number)" :key="index" class="window individual-window" :style="windowStyle">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    row: {
        type: Object,
        required: true,
    },
    cubeProperties: {
        type: Object,
        required: true,
    },
});

const rowStyle = computed(() => ({
    width: '100%',
    height: props.row.windowHeight,
    position: 'absolute',
    top: props.row.top,
    left: '50%',
    gap: props.row.gap,
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
}));

const windowStyle = computed(() => ({
    backgroundColor: props.row.color,
    width: props.row.windowWidth,
    height: '100%',
}));

const selectRow = () => {
    console.log('Selected row:', props.row.id);
};
</script>

<style scoped>
.row {
    position: absolute;
}

.window.individual-window {
    /* Additional styles if needed */
}
</style>