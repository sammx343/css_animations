<template>
    <div class="controls">
        <p class="close" @click="closeRowControls">X</p>
        <h2>Row Controls:</h2>
        <div v-for="(row, index) in props.rows" :key="row.id">
            <hr />
            <p>Row id: {{ row.id }}</p>
            <p class="controls-expandable-icon" @click="changeExpand(index)">V</p>
            <div class="controls-expandable" :class="{ expanded: isRowExpanded[index] }">
                <div class="controls--group">
                    <label :for="`number-of-windows-${row.id}`">Number of windows: {{ row.number }}</label>
                    <input :id="`number-of-windows-${row.id}`" type="range" min="1" max="20" :value="row.number"
                        @input="updateRow(row.id, 'number', ($event.target as HTMLInputElement).value)" />
                </div>
                <div class="controls--group">
                    <label :for="`position-${row.id}`">Position: {{ row.top }}</label>
                    <input :id="`position-${row.id}`" type="range" min="0" max="100" :value="parseFloat(row.top)"
                        @input="updateRow(row.id, 'top', `${($event.target as HTMLInputElement).value}%`)" />
                </div>
                <div class="controls--group">
                    <label :for="`window-width-${row.id}`">Window Width: {{ row.windowWidth }}</label>
                    <input :id="`window-width-${row.id}`" type="range" min="0" max="100"
                        :value="parseFloat(row.windowWidth)"
                        @input="updateRow(row.id, 'windowWidth', `${($event.target as HTMLInputElement).value}%`)" />
                </div>
                <div class="controls--group">
                    <label :for="`window-height-${row.id}`">Window Height: {{ row.windowHeight }}</label>
                    <input :id="`window-height-${row.id}`" type="range" min="0" max="100"
                        :value="parseFloat(row.windowHeight)"
                        @input="updateRow(row.id, 'windowHeight', `${($event.target as HTMLInputElement).value}%`)" />
                </div>
                <div class="controls--group">
                    <label :for="`gap-${row.id}`">Gap: {{ row.gap }}</label>
                    <input :id="`gap-${row.id}`" type="range" min="0" max="100" :value="parseFloat(row.gap)"
                        @input="updateRow(row.id, 'gap', `${($event.target as HTMLInputElement).value}%`)" />
                </div>
                <div class="controls--group">
                    <label :for="`color-${row.id}`">Window Color: {{ row.color }}</label>
                    <input :id="`color-${row.id}`" type="color" :value="row.color"
                        @input="updateRow(row.id, 'color', ($event.target as HTMLInputElement).value)" />
                </div>
                <div class="controls--group">
                    <label :for="`excluded-faces-${row.id}`">Excluded Faces:</label>
                    <select :id="`excluded-faces-${row.id}`" multiple :value="row.excludedFaces"
                        @change="updateExcludedFaces(row.id, ($event.target as HTMLSelectElement).selectedOptions)">
                        <option v-for="face in [1, 2, 3, 4, 5, 6]" :key="face" :value="face">
                            Face {{ face }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Row } from '@/types/row';
import { ref } from 'vue';

const props = defineProps<{
    rows: Row[];
}>();

const isRowExpanded = ref(new Array(props.rows.length).fill(false));

const emit = defineEmits<{
    (e: 'update:isRowControlOpen', value: boolean): void;
    (e: 'update:rows', rows: Row[]): void;
}>();

const changeExpand = (index: number) => {
    isRowExpanded.value[index] = !isRowExpanded.value[index];
};

const closeRowControls = () => {
    emit('update:isRowControlOpen', false);
};

const updateRow = (id: number, key: keyof Row, value: string | number) => {
    const updatedRows = props.rows.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
    );
    emit('update:rows', updatedRows);
};

const updateExcludedFaces = (id: number, selectedOptions: HTMLCollectionOf<HTMLOptionElement>) => {
    const excludedFaces = Array.from(selectedOptions).map((option) =>
        Number(option.value) as 1 | 2 | 3 | 4 | 5 | 6
    );
    const updatedRows = props.rows.map((row) =>
        row.id === id ? { ...row, excludedFaces } : row
    );
    emit('update:rows', updatedRows);
};
</script>

<style scoped>
.controls-expandable {
    max-height: 0vh;
    transition: 0.5s max-height;
    overflow: hidden;
}

.controls-expandable.expanded {
    max-height: 100vh;
    transition: 0.5s max-height;
}

.controls-expandable-icon {
    display: flex;
    justify-content: center;
    background: bisque;
    border-radius: 10px;
    font-family: system-ui;
    border: 2px solid black;
    cursor: pointer;
}

label {
    margin-bottom: 0.5rem;
}

input[type="range"],
input[type="color"],
select {
    width: 100%;
}

select {
    height: 100px;
    /* Adjust for multiple select */
}

hr {
    border: 0;
    border-top: 1px solid white;
    margin: 1rem 0;
}

p {
    margin: 0.5rem 0;
}
</style>