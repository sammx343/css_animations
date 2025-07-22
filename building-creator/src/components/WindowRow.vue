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
    height: '100%',
    position: 'absolute',
    top: props.row.top,
    left: props.row.left,
    gap: props.row.gap,
    transform: 'translate(0%, 0%)',
    display: 'flex',
    flexDirection: props.row.isColumn ? 'column' : 'row',
    justifyContent: props.row.justifyContent,
}));

const windowStyle = computed(() => ({
    backgroundColor: props.row.color,
    width: props.row.windowWidth,
    height: props.row.windowHeight,
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