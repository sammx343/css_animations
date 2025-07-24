<template>
    <div class="row" :style="rowStyle" >
        <div v-for="index in parseInt(row.number)" @dblclick="selectRow()" :key="index" class="window individual-window" :style="windowStyle">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRowStore } from '@/store/rowStore';
import type { Row } from '@/types/row';

const props = defineProps<{
    row: Row,
}>();

const rowStore = useRowStore();

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
    borderRadius: props.row.borderRadius
}));

const selectRow = () => {
    rowStore.setSelectedRow(props.row);
};
</script>

<style scoped>
.row {
    position: absolute;
    pointer-events: none;
}

.window{
    pointer-events: all;
}

.window.individual-window {
    /* Additional styles if needed */
}
</style>