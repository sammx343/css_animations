<!-- GridItem.vue -->
<template>
  <div class="grids" ref="gridRef" :class="{ selected: isSelected }">
    <h3>{{ cube.name }}</h3>
    <hr />
    <div class="d-flex flex-start">
      <label>Name: </label>
      <input :id="`name-${grid.id}`" type="text" v-model="localGrid.name" @input="update" />
    </div>
    <div class="d-flex">
      <button class="grid-button duplicate-grid" @click="$emit('duplicate', grid)">
        <v-icon name="hi-duplicate" />Duplicate
      </button>
      <button class="grid-button delete-grid" @click="$emit('delete', grid.id)">
        <v-icon name="md-deleteforever-outlined"></v-icon> Delete
      </button>
      <button class="grid-button" @click="$emit('switch-position', index, -1)">
        <v-icon name="bi-arrow-up" style="fill: black" />
      </button>
      <button class="grid-button" @click="$emit('switch-position', index, 1)">
        <v-icon name="bi-arrow-down" style="fill: black" />
      </button>
    </div>
    <div class="controls-expandable-icon" @click="$emit('toggle-expand', index)">
      <v-icon v-if="isExpanded" name="bi-arrow-up" style="fill: black" />
      <v-icon v-else name="bi-arrow-down" style="fill: black" />
    </div>

    <div class="controls-expandable" :class="{ expanded: isExpanded }">
      <div class="controls--group">
        <label :for="`number-of-windows-${grid.id}`">Number of rows: {{ localGrid.rows }}</label>
        <input
          :id="`number-of-windows-${grid.id}`"
          type="range"
          min="1"
          max="20"
          :value="localGrid.rows"
          @input="updateGrid('rows', $event.target.value)"
        />
      </div>
      <div class="controls--group">
        <label :for="`number-of-windows-${grid.id}`"
          >Number of columns: {{ localGrid.columns }}</label
        >
        <input
          :id="`number-of-windows-${grid.id}`"
          type="range"
          min="1"
          max="20"
          :value="localGrid.columns"
          @input="updateGrid('columns', $event.target.value)"
        />
      </div>
      <div class="controls--group">
        <div class="d-flex">
          <label>Active windows: {{ localGrid.columns }}</label>
        </div>
        <div
          :style="{
            display: 'grid',
            gridTemplateColumns: `repeat(${localGrid.columns}, 1fr)`,
            gridTemplateRows: `repeat(${localGrid.rows}, 1fr)`,
          }"
        >
          <div
            v-for="index in Array.from(
              { length: localGrid.rows * localGrid.columns },
              (_, i) => i + 1,
            )"
            :key="index"
          >
            <input
              :id="`excluded-windows-${index}`"
              :value="index"
              type="checkbox"
              v-model="localGrid.excludedWindows"
              @change="update"
            />
          </div>
        </div>
        <button class="grid-button reverse-grid" @click="reverseSelectedWindows">
          <v-icon name="md-flipcameraandroid"></v-icon> Reverse
        </button>
      </div>
      <div class="controls--group">
        <label :for="`position-top-${grid.id}`">Position top: {{ localGrid.top }}</label>
        <input
          :id="`position-top-${grid.id}`"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="parseFloat(localGrid.top)"
          @input="updateGrid('top', `${$event.target.value}%`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`position-left-${grid.id}`">Position left: {{ localGrid.left }}</label>
        <input
          :id="`position-left-${grid.id}`"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="parseFloat(localGrid.left)"
          @input="updateGrid('left', `${$event.target.value}%`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`window-width-${grid.id}`">Window Width: {{ localGrid.windowWidth }}px</label>
        <input
          :id="`window-width-${grid.id}`"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="parseFloat(localGrid.windowWidth)"
          @input="updateGrid('windowWidth', `${$event.target.value}`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`window-height-${grid.id}`"
          >Window Height: {{ localGrid.windowHeight }}px</label
        >
        <input
          :id="`window-height-${grid.id}`"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="parseFloat(localGrid.windowHeight)"
          @input="updateGrid('windowHeight', `${$event.target.value}`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`window-width-${grid.id}`">Grid Width: {{ localGrid.gridWidth }}%</label>
        <input
          :id="`window-width-${grid.id}`"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="parseFloat(localGrid.gridWidth)"
          @input="updateGrid('gridWidth', `${$event.target.value}`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`window-height-${grid.id}`">Grid Height: {{ localGrid.gridHeight }}%</label>
        <input
          :id="`window-height-${grid.id}`"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="parseFloat(localGrid.gridHeight)"
          @input="updateGrid('gridHeight', `${$event.target.value}`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`row-gap-${grid.id}`">Row gap: {{ localGrid.rowGap }}</label>
        <input
          :id="`row-gap-${grid.id}`"
          type="range"
          min="0"
          max="100"
          :value="parseFloat(localGrid.rowGap)"
          @input="updateGrid('rowGap', `${$event.target.value}px`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`column-gap-${grid.id}`">Column gap: {{ localGrid.columnGap }}</label>
        <input
          :id="`column-gap-${grid.id}`"
          type="range"
          min="0"
          max="100"
          :value="parseFloat(localGrid.columnGap)"
          @input="updateGrid('columnGap', `${$event.target.value}px`)"
        />
      </div>
      <div class="controls--group">
        <label :for="`border-radius-${grid.id}`">Border Radius {{ localGrid.borderRadius }}</label>
        <input
          :id="`border-radius-${grid.id}`"
          type="range"
          min="0"
          max="50"
          step="1"
          :value="parseFloat(localGrid.borderRadius || '0')"
          @input="updateGrid('borderRadius', `${$event.target.value}%`)"
        />
      </div>
      <div class="controls--group">
        <h3>Colors:</h3>
        <div class="d-flex">
          <label :for="`color-percentage-angle-${grid.id}`"
            >Angle: {{ localGrid.colorsAngle }}</label
          >
          <input
            :id="`color-percentage-angle-${grid.id}`"
            type="range"
            min="1"
            max="360"
            v-model="localGrid.colorsAngle"
            @input="update"
          />
        </div>
        <div
          v-for="(color, colorIndex) in localGrid.colors"
          :key="`color-index-${colorIndex}`"
          style="position: relative"
        >
          <label> Color {{ colorIndex + 1 }}: {{ color.hex }}</label>
          <div class="d-flex">
            <v-icon
              v-if="localGrid.colors.length > 1"
              name="md-deleteforever-outlined"
              style="position: absolute; right: 0; top: 0; cursor: pointer"
              @click="deleteColor(colorIndex)"
            ></v-icon>
            <input
              :id="`color-${grid.id}`"
              type="color"
              :value="color.hex"
              @input="updateColors($event.target.value, colorIndex)"
            />
          </div>
          <div class="d-flex">
            <label :for="`color-percentage-${grid.id}-${colorIndex}`"
              >{{ parseInt(color.percentage) }}%</label
            >
            <input
              :id="`color-percentage-${grid.id}-${colorIndex}`"
              type="range"
              min="1"
              max="100"
              v-model="color.percentage"
              @input="update"
            />
          </div>
        </div>
        <button class="grid-button" @click="addColors" style="background: blue">
          Add color <v-icon name="md-addcircle-outlined"></v-icon>
        </button>
      </div>
      <div class="controls--group">
        <label :for="`border-top-${grid.id}`">Border-top: {{ localGrid.borderTop?.size }}</label>
        <div class="d-flex">
          <input
            type="range"
            min="0"
            max="50"
            :value="localGrid.borderTop?.size || 0"
            @input="changeBorder('borderTop', $event.target.value, 'size')"
          />
          <select
            :id="`border-top-${grid.id}`"
            :value="localGrid.borderTop?.style"
            @change="changeBorder('borderTop', $event.target.value, 'style')"
          >
            <option value="none">none</option>
            <option value="solid">solid</option>
            <option value="inset">inset</option>
            <option value="dashed">dashed</option>
          </select>
          <input
            :id="`color-${grid.id}`"
            type="color"
            :value="localGrid.borderTop?.color"
            @input="changeBorder('borderTop', $event.target.value, 'color')"
          />
        </div>
        <!-- Repeat similar blocks for border-bottom, border-left, border-right -->
        <label :for="`border-bottom-${grid.id}`"
          >Border-bottom: {{ localGrid.borderBottom?.size }}</label
        >
        <div class="d-flex">
          <input
            type="range"
            min="0"
            max="50"
            :value="localGrid.borderBottom?.size || 0"
            @input="changeBorder('borderBottom', $event.target.value, 'size')"
          />
          <select
            :id="`border-bottom-${grid.id}`"
            :value="localGrid.borderBottom?.style"
            @change="changeBorder('borderBottom', $event.target.value, 'style')"
          >
            <option value="none">none</option>
            <option value="solid">solid</option>
            <option value="inset">inset</option>
            <option value="dashed">dashed</option>
          </select>
          <input
            :id="`color-${grid.id}`"
            type="color"
            :value="localGrid.borderBottom?.color"
            @input="changeBorder('borderBottom', $event.target.value, 'color')"
          />
        </div>
        <label :for="`border-left-${grid.id}`">Border-left: {{ localGrid.borderLeft?.size }}</label>
        <div class="d-flex">
          <input
            type="range"
            min="0"
            max="50"
            :value="localGrid.borderLeft?.size || 0"
            @input="changeBorder('borderLeft', $event.target.value, 'size')"
          />
          <select
            :id="`border-left-${grid.id}`"
            :value="localGrid.borderLeft?.style"
            @change="changeBorder('borderLeft', $event.target.value, 'style')"
          >
            <option value="none">none</option>
            <option value="solid">solid</option>
            <option value="inset">inset</option>
            <option value="dashed">dashed</option>
          </select>
          <input
            :id="`color-${grid.id}`"
            type="color"
            :value="localGrid.borderLeft?.color"
            @input="changeBorder('borderLeft', $event.target.value, 'color')"
          />
        </div>
        <label :for="`border-right-${grid.id}`"
          >Border-right: {{ localGrid.borderRight?.size }}</label
        >
        <div class="d-flex">
          <input
            type="range"
            min="0"
            max="50"
            :value="localGrid.borderRight?.size || 0"
            @input="changeBorder('borderRight', $event.target.value, 'size')"
          />
          <select
            :id="`border-right-${grid.id}`"
            :value="localGrid.borderRight?.style"
            @change="changeBorder('borderRight', $event.target.value, 'style')"
          >
            <option value="none">none</option>
            <option value="solid">solid</option>
            <option value="inset">inset</option>
            <option value="dashed">dashed</option>
          </select>
          <input
            :id="`color-${grid.id}`"
            type="color"
            :value="localGrid.borderRight?.color"
            @input="changeBorder('borderRight', $event.target.value, 'color')"
          />
        </div>
      </div>
      <div class="controls--group">
        <label :for="`excluded-faces-${grid.id}`">Excluded Faces:</label>
        <div class="d-flex">
          <div v-for="face in [1, 2, 3, 4, 5, 6]" :key="face">
            <label>{{ face }}</label>
            <input
              :id="`excluded-face-${face}`"
              :value="face"
              type="checkbox"
              v-model="localGrid.excludedFaces"
              @change="update"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Grid } from '@/types/grid'
import type { Cube } from '@/types/cube'
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  grid: Grid
  index: number
  cube: Cube
  isExpanded: boolean
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'update:grid', grid: Grid): void
  (e: 'duplicate', grid: Grid): void
  (e: 'delete', id: string): void
  (e: 'switch-position', index: number, flag: number): void
  (e: 'toggle-expand', index: number): void
}>()

const localGrid = ref({ ...props.grid })

watch(
  () => props.grid,
  (newGrid) => {
    localGrid.value = { ...newGrid }
  },
  { deep: true },
)

const update = () => {
  emit('update:grid', { ...localGrid.value })
}

const updateGrid = (key: keyof Grid, value: string | number) => {
  localGrid.value = { ...localGrid.value, [key]: value }
  update()
}

const updateColors = (color: string, index: number) => {
  const colors = [...localGrid.value.colors]
  colors[index].hex = color
  localGrid.value.colors = colors
  update()
}

const addColors = () => {
  const colorsCopy = [...localGrid.value.colors, { hex: '#000000', percentage: 100 }]
  localGrid.value.colors = colorsCopy.map((color, index) => ({
    ...color,
    percentage: (100 / colorsCopy.length) * (index + 1),
  }))
  update()
}

const deleteColor = (index: number) => {
  localGrid.value.colors.splice(index, 1)
  update()
}

const changeBorder = (key: keyof Grid, value: string | number, borderProperty: string) => {
  localGrid.value = {
    ...localGrid.value,
    [key]: { ...localGrid.value[key], [borderProperty]: value },
  }
  update()
}

const reverseSelectedWindows = () => {
  const size = localGrid.value.columns * localGrid.value.rows
  if (!size) return

  const newArr = []
  for (let index = 0; index <= size; index++) {
    if (!localGrid.value.excludedWindows?.includes(index)) {
      newArr.push(index)
    }
  }
  localGrid.value.excludedWindows = newArr
  update()
}
</script>
