<template>
    <div class="controls">
        <p class="close" @click="closeGridControls">X</p>
        <h2>Grid Controls:</h2>
        <hr>
        <button @click="creategrid">Create grid</button>
        <div class="grids-container" ref="gridsContainer">
            <div class="grids" v-for="(grid, index) in props.grid" :key="grid.id" ref="items">
                <hr />
                <div class="d-flex flex-start">
                    <label>Name: </label>
                    <input :id="`name-${grid.id}`" type="text" v-model="grid.name" />
                </div>
                <div class="d-flex">
                    <button class="grid-button duplicate-grid" @click="duplicateGrid(grid)">
                        <v-icon name="hi-duplicate" />Duplicate</button>
                    <button class="grid-button delete-grid" @click="deleteGrid(grid.id)">
                        <v-icon name="md-deleteforever-outlined"></v-icon> Delete
                    </button>
                    <button class="grid-button" @click="switchPosition(index, -1)">
                        <v-icon name="bi-arrow-up" style="fill: black;" />
                    </button>
                    <button class="grid-button" @click="switchPosition(index, 1)">
                        <v-icon name="bi-arrow-down" style="fill: black;" />
                    </button>
                </div>
                <p class="controls-expandable-icon" @click="changeExpand(index)">V</p>
                <div class="controls-expandable" :class="{ expanded: isgridExpanded[index] }">
                    <div class="controls--group">
                        <label :for="`number-of-windows-${grid.id}`">Number of rows: {{ grid.rows }}</label>
                        <input :id="`number-of-windows-${grid.id}`" type="range" min="1" max="20" :value="grid.rows"
                            @input="updateGrid(grid.id, 'rows', ($event.target as HTMLInputElement).value)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`number-of-windows-${grid.id}`">Number of columns: {{ grid.columns }}</label>
                        <input :id="`number-of-windows-${grid.id}`" type="range" min="1" max="20" :value="grid.columns"
                            @input="updateGrid(grid.id, 'columns', ($event.target as HTMLInputElement).value)" />
                    </div>
                    <div class="controls--group">
                        <div class="d-flex">
                            <label>Active windows: {{ grid.columns }}</label>
                        </div>
                        <div :style="{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
                        }">
                            <div v-for="index in Array.from({ length: grid.rows * grid.columns }, (_, i) => i + 1)"
                                :key="index">
                                <input :id="`excluded-windows-${index}`" :value="index" type="checkbox"
                                    v-model="grid.excludedWindows">
                            </div>
                        </div>
                        <button class="grid-button reverse-grid" @click="reverseSelectedWindows(grid)">
                            <v-icon name="md-flipcameraandroid"></v-icon> Reverse</button>
                    </div>
                    <div class="controls--group">
                        <label :for="`position-top-${grid.id}`">Position top: {{ grid.top }}</label>
                        <input :id="`position-top-${grid.id}`" type="range" min="0" max="100" step="0.1"
                            :value="parseFloat(grid.top)"
                            @input="updateGrid(grid.id, 'top', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`position-left-${grid.id}`">Position left: {{ grid.left }}</label>
                        <input :id="`position-left-${grid.id}`" type="range" min="0" max="100" step="0.1"
                            :value="parseFloat(grid.left)"
                            @input="updateGrid(grid.id, 'left', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`window-width-${grid.id}`">Window Width: {{ grid.windowWidth }}</label>
                        <input :id="`window-width-${grid.id}`" type="range" min="0" max="100" step="0.1"
                            :value="parseFloat(grid.windowWidth)"
                            @input="updateGrid(grid.id, 'windowWidth', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`window-height-${grid.id}`">Window Height: {{ grid.windowHeight }}</label>
                        <input :id="`window-height-${grid.id}`" type="range" min="0" max="100" step="0.1"
                            :value="parseFloat(grid.windowHeight)"
                            @input="updateGrid(grid.id, 'windowHeight', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`window-width-${grid.id}`">Grid Width: {{ grid.gridWidth }}</label>
                        <input :id="`window-width-${grid.id}`" type="range" min="0" max="100" step="0.1"
                            :value="parseFloat(grid.gridWidth)"
                            @input="updateGrid(grid.id, 'gridWidth', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`window-height-${grid.id}`">Grid Height: {{ grid.gridHeight }}</label>
                        <input :id="`window-height-${grid.id}`" type="range" min="0" max="100" step="0.1"
                            :value="parseFloat(grid.gridHeight)"
                            @input="updateGrid(grid.id, 'gridHeight', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`row-gap-${grid.id}`">Row gap: {{ grid.rowGap }}</label>
                        <input :id="`row-gap-${grid.id}`" type="range" min="0" max="100"
                            :value="parseFloat(grid.rowGap)"
                            @input="updateGrid(grid.id, 'rowGap', `${($event.target as HTMLInputElement).value}px`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`column-gap-${grid.id}`">Column gap: {{ grid.columnGap }}</label>
                        <input :id="`column-gap-${grid.id}`" type="range" min="0" max="100"
                            :value="parseFloat(grid.columnGap)"
                            @input="updateGrid(grid.id, 'columnGap', `${($event.target as HTMLInputElement).value}px`)" />
                    </div>
                    <div class="controls--group">
                        <label :for="`border-radius-${grid.id}`">Border Radius {{ grid.borderRadius }}</label>
                        <input :id="`border-radius-${grid.id}`" type="range" min="0" max="50" step="1"
                            :value="parseFloat(grid.borderRadius || '0')"
                            @input="updateGrid(grid.id, 'borderRadius', `${($event.target as HTMLInputElement).value}%`)" />
                    </div>
                    <div class="controls--group">
                        <h3>Colors:</h3>
                        <div class="d-flex">
                            <label :for="`color-percentage-angle-${grid.id}`">Angle: {{ grid.colorsAngle }}</label>
                            <input :id="`color-percentage-angle-${grid.id}`" type="range" min="1" max="360"
                                v-model="grid.colorsAngle" />
                        </div>
                        <div v-for="(color, colorIndex) in grid.colors" :key="`color-index-${colorIndex}`"
                            style="position: relative;">
                            <label> Color {{ colorIndex + 1 }}: {{ color.hex }}</label>
                            <div class="d-flex">
                                <v-icon v-if="grid.colors.length > 1" name="md-deleteforever-outlined"
                                    style="position: absolute; right: 0; top: 0; cursor: pointer;"
                                    @click="deleteColor(grid, colorIndex)"></v-icon>
                                <input :id="`color-${grid.id}`" type="color" :value="color.hex"
                                    @input="updateColors(grid, ($event.target as HTMLInputElement).value, colorIndex)" />
                            </div>
                            <div class="d-flex">
                                <label :for="`color-percentage-${grid.id}-${index}`">{{ parseInt(color.percentage)
                                }}%</label>
                                <input :id="`color-percentage-${grid.id}-${index}`" type="range" min="1" max="100"
                                    v-model="color.percentage" />
                            </div>
                        </div>
                        <button class="grid-button" @click="addColors(grid)" style="background: blue;">Add color
                            <v-icon name="md-addcircle-outlined"></v-icon></button>
                    </div>
                    <div class="controls--group">
                        <label :for="`border-top-${grid.id}`">Border-top: {{ grid.borderTop?.size }}</label>
                        <div class="d-flex">
                            <input type="range" min="0" :max="`50`"
                                @input="changeBorder(grid.id, 'borderTop', ($event.target as HTMLInputElement).value, 'size')" />
                            <select :id="`border-top-${grid.id}`" :value="grid.borderTop?.style"
                                @change="changeBorder(grid.id, 'borderTop', ($event.target as HTMLInputElement).value, 'style')">
                                <option value="none">none</option>
                                <option value="solid">solid</option>
                                <option value="inset">inset</option>
                                <option value="dashed">dashed</option>
                            </select>
                            <input :id="`color-${grid.id}`" type="color" :value="grid.borderTop?.color"
                                @input="changeBorder(grid.id, 'borderTop', ($event.target as HTMLInputElement).value, 'color')" />
                        </div>

                        <label :for="`border-bottom-${grid.id}`">Border-bottom: {{ grid.borderBottom?.size }}</label>
                        <div class="d-flex">
                            <input type="range" min="0" :max="`50`"
                                @input="changeBorder(grid.id, 'borderBottom', ($event.target as HTMLInputElement).value, 'size')" />
                            <select :id="`border-bottom-${grid.id}`" :value="grid.borderBottom?.style"
                                @change="changeBorder(grid.id, 'borderBottom', ($event.target as HTMLInputElement).value, 'style')">
                                <option value="none">none</option>
                                <option value="solid">solid</option>
                                <option value="inset">inset</option>
                                <option value="dashed">dashed</option>
                            </select>
                            <input :id="`color-${grid.id}`" type="color" :value="grid.borderBottom?.color"
                                @input="changeBorder(grid.id, 'borderBottom', ($event.target as HTMLInputElement).value, 'color')" />
                        </div>

                        <label :for="`border-bottom-${grid.id}`">Border-left: {{ grid.borderLeft?.size }}</label>
                        <div class="d-flex">
                            <input type="range" min="0" :max="`50`"
                                @input="changeBorder(grid.id, 'borderLeft', ($event.target as HTMLInputElement).value, 'size')" />
                            <select :id="`border-bottom-${grid.id}`" :value="grid.borderLeft?.style"
                                @change="changeBorder(grid.id, 'borderLeft', ($event.target as HTMLInputElement).value, 'style')">
                                <option value="none">none</option>
                                <option value="solid">solid</option>
                                <option value="inset">inset</option>
                                <option value="dashed">dashed</option>
                            </select>
                            <input :id="`color-${grid.id}`" type="color" :value="grid.borderLeft?.color"
                                @input="changeBorder(grid.id, 'borderLeft', ($event.target as HTMLInputElement).value, 'color')" />
                        </div>

                        <label :for="`border-bottom-${grid.id}`">Border-right: {{ grid.borderRight?.size }}</label>
                        <div class="d-flex">
                            <input type="range" min="0" :max="`50`"
                                @input="changeBorder(grid.id, 'borderRight', ($event.target as HTMLInputElement).value, 'size')" />
                            <select :id="`border-bottom-${grid.id}`" :value="grid.borderRight?.style"
                                @change="changeBorder(grid.id, 'borderRight', ($event.target as HTMLInputElement).value, 'style')">
                                <option value="none">none</option>
                                <option value="solid">solid</option>
                                <option value="inset">inset</option>
                                <option value="dashed">dashed</option>
                            </select>
                            <input :id="`color-${grid.id}`" type="color" :value="grid.borderRight?.color"
                                @input="changeBorder(grid.id, 'borderRight', ($event.target as HTMLInputElement).value, 'color')" />
                        </div>
                    </div>
                    <div class="controls--group">
                        <label :for="`excluded-faces-${grid.id}`">Excluded Faces:</label>
                        <div class="d-flex">
                            <div v-for="face in [1, 2, 3, 4, 5, 6]" :key="face">
                                <label>{{ face }}</label>
                                <input :id="`excluded-face-${face}`" :value="face" type="checkbox"
                                    v-model="grid.excludedFaces">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Grid } from '@/types/grid';
import { nextTick, ref, useTemplateRef, watch, computed } from 'vue';
import { generateId } from '@/utils/generateId';
import type { Color } from '@/types/color';

const props = defineProps<{
    grid: Grid[];
    selectedGrid?: Grid | undefined;
}>();

const isgridExpanded = ref(new Array(props.grid.length).fill(false));
const itemRefs = useTemplateRef('items');
const gridsContainer = ref(null);

const emit = defineEmits<{
    (e: 'update:isGridControlOpen', value: boolean): void;
    (e: 'update:grids', grids: Grid[]): void;
}>();

const changeExpand = (index: number) => {
    isgridExpanded.value[index] = !isgridExpanded.value[index];
};

const closeGridControls = () => {
    emit('update:isGridControlOpen', false);
};

const creategrid = () => {
    emit('update:grids', [...props.grid, {
        name: `grid ${props.grid.length}`,
        id: generateId(),
        rows: 5,
        columns: 5,
        excludedWindows: [],
        colors: ['#000000'],
        top: '2%',
        left: '2%',
        windowWidth: '50%',
        windowHeight: '50%',
        gridWidth: '100%',
        gridHeight: '100%',
        rowGap: '5px',
        columnGap: '5px',
        borderRadius: '0%',
        isColumn: true,
        excludedFaces: [5, 6],
    }]);
}

watch(() => props.selectedGrid, async (value: Grid, lastValue: Grid) => {
    isgridExpanded.value = new Array(props.grid.length).fill(false);

    const selectedgridIndex = props.grid.findIndex(grid => value.id === grid.id);
    const selectedgridRef = itemRefs.value[selectedgridIndex];

    const previousSelectedgridIndex = props.grid.findIndex(grid => lastValue?.id === grid.id);
    const previosSelectedgridRef = previousSelectedgridIndex >= 0 ? itemRefs.value[previousSelectedgridIndex] : null;

    isgridExpanded.value[selectedgridIndex] = true;
    removeSelectedStyle(previosSelectedgridRef);
    await nextTick();
    scrollToTarget(selectedgridRef);
    await nextTick();
    addSelectedStyle(selectedgridRef);
});

function reverseSelectedWindows(grid: Grid) {
    const size = grid.columns * grid.rows;
    if (!size) return;

    const newArr = [];

    for (let index = 0; index <= size; index++) {
        if (!grid.excludedWindows?.includes(index)) {
            newArr.push(index);
        }
    }

    grid.excludedWindows = newArr;
}

function scrollToTarget(selectedgridRef: any) {
    gridsContainer.value.scrollTop = selectedgridRef.offsetTop - 100;
}

function addSelectedStyle(selectedgridRef: any) {
    selectedgridRef.classList.add("selected");
}

function removeSelectedStyle(lastgridRef: any) {
    if (lastgridRef) {
        lastgridRef.classList.remove("selected");
    }
}

function updateColors(currentGrid: Grid, color: string, index: number) {
    const updatedGrids = props.grid.map((grid) => {
        if (grid.id === currentGrid.id) {
            const colors = [...grid.colors];
            colors[index].hex = color;
            grid.colors = colors;
        }
        return grid;
    });
    emit('update:grids', updatedGrids);
}

function addColors(grid: Grid) {
    const colorsCopy = [...grid.colors, { hex: '#000000', percentage: 100 }];

    const colors = colorsCopy.map((color: Color, index: number) => {
        return { ...color, percentage: (100 / (colorsCopy.length)) * (index + 1) }
    });

    grid.colors = colors;
}

function deleteColor(grid: Grid, index: number) {
    grid.colors.splice(index, 1);
}

const changeBorder = (id: string, key: keyof Grid, value: string | number, borderProperty: string) => {
    const updatedGrids = props.grid.map((grid) =>
        grid.id === id ? { ...grid, [key]: { ...grid[key], [borderProperty]: value } } : grid
    );
    emit('update:grids', updatedGrids);
}

const switchPosition = (index: number, flag: number) => {
    const switchIndex = index + flag;
    if (switchIndex < 0 || switchIndex >= props.grid.length) return;

    const currentgrid = Object.assign(props.grid[index]);
    const gridToSwitch = Object.assign(props.grid[switchIndex]);

    const updatedgrids = props.grid.map((grid) => {
        if (grid.id === currentgrid.id) return gridToSwitch;
        if (grid.id === gridToSwitch.id) return currentgrid;
        return grid;
    });

    emit('update:grids', updatedgrids);
}

const duplicateGrid = (grid: Grid) => {
    const newgrid = {
        ...grid,
        id: generateId(),
        name: grid.name + " duplicated"
    };

    const deepCloneGrid = JSON.parse(JSON.stringify(newgrid));

    emit('update:grids', [...props.grid, deepCloneGrid]);
}

const deleteGrid = (id: string) => {
    const grids = props.grid.filter((grid) =>
        grid.id !== id
    );
    emit('update:grids', grids);
}

const updateGrid = (id: string, key: keyof Grid, value: string | number) => {
    const updatedGrids = props.grid.map((grid) =>
        grid.id === id ? { ...grid, [key]: value } : grid
    );
    emit('update:grids', updatedGrids);
};

</script>

<style scoped>
.pi-file-plus:before {
    content: "\ea17";
}

.controls-expandable {
    max-height: 0vh;
    /* transition: 0.5s max-height; */
    overflow: hidden;
}

.controls-expandable.expanded {
    max-height: 200vh;
    /* transition: 0.5s max-height; */
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

.grid-button {
    margin-right: 5px;
    border-radius: 10px;
    border: 1px solid black;
    color: white;
    text-shadow: 1px 1px 1px black;
    padding: 5px 10px;
    font-weight: 600;
    cursor: pointer;
}

.grids.selected {
    background: red;
}

.duplicate-grid {
    background: green;
}

.delete-grid {
    background: #df635a;
}

.reverse-grid {
    background: #000000;
}

.grids-container {
    max-height: 80vh;
    padding-bottom: 20px;
    overflow-y: scroll;
}

label {
    margin-bottom: 0.5rem;
}

input[type="range"],
input[type="color"] {
    width: 100%;
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