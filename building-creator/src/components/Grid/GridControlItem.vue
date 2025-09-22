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
      <SliderComponent
        :id="`number-of-rows-${grid.id}`"
        label="Number of rows: "
        :min="1"
        :max="20"
        propertyName="rows"
        class="controls--group"
        :value="localGrid.rows"
        :input-function="updateGrid"
        sufix=""
      ></SliderComponent>

      <SliderComponent
        :id="`number-of-columns-${grid.id}`"
        label="Number of columns: "
        :min="1"
        :max="20"
        propertyName="columns"
        class="controls--group"
        :value="localGrid.columns"
        :input-function="updateGrid"
        sufix=""
      ></SliderComponent>
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

      <SliderComponent
        :id="`position-top-${grid.id}`"
        label="Position top: "
        :min="-100"
        :max="100"
        propertyName="top"
        class="controls--group"
        :value="localGrid.top"
        :input-function="updateGrid"
        sufix="%"
      ></SliderComponent>

      <SliderComponent
        :id="`position-left-${grid.id}`"
        label="Position left: "
        :min="-100"
        :max="100"
        propertyName="left"
        class="controls--group"
        :value="localGrid.left"
        :input-function="updateGrid"
        sufix="%"
      ></SliderComponent>

      <SliderComponent
        :id="`window-width-${grid.id}`"
        label="Window Width: "
        :min="0"
        :max="100"
        propertyName="windowWidth"
        class="controls--group"
        :value="localGrid.windowWidth"
        :input-function="updateGrid"
        sufix="px"
      ></SliderComponent>

      <SliderComponent
        :id="`window-height-${grid.id}`"
        label="Window Height: "
        :min="0"
        :max="100"
        propertyName="windowHeight"
        class="controls--group"
        :value="localGrid.windowHeight"
        :input-function="updateGrid"
        sufix="px"
      ></SliderComponent>

      <SliderComponent
        :id="`grid-width-${grid.id}`"
        label="Grid Width: "
        :min="0"
        :max="100"
        propertyName="gridWidth"
        class="controls--group"
        :value="localGrid.gridWidth"
        :input-function="updateGrid"
        sufix="%"
      ></SliderComponent>

      <SliderComponent
        :id="`grid-height-${grid.id}`"
        label="Grid Height: "
        :min="0"
        :max="100"
        propertyName="gridHeight"
        class="controls--group"
        :value="localGrid.gridHeight"
        :input-function="updateGrid"
        sufix="%"
      ></SliderComponent>

      <SliderComponent
        :id="`row-gap-${grid.id}`"
        label="Row gap: "
        :min="0"
        :max="100"
        propertyName="rowGap"
        class="controls--group"
        :value="localGrid.rowGap"
        :input-function="updateGrid"
        sufix="px"
      ></SliderComponent>

      <SliderComponent
        :id="`column-gap-${grid.id}`"
        label="Column gap: "
        :min="0"
        :max="100"
        propertyName="columnGap"
        class="controls--group"
        :value="localGrid.columnGap"
        :input-function="updateGrid"
        sufix="px"
      ></SliderComponent>

      <SliderComponent
        :id="`border-radius-${grid.id}`"
        label="Border Radius: "
        :min="0"
        :max="50"
        propertyName="borderRadius"
        class="controls--group"
        :value="localGrid.borderRadius"
        :input-function="updateGrid"
        sufix="%"
      ></SliderComponent>

      <div class="controls--group">
        <h3>Colors:</h3>
        <SliderComponent
          v-if="localGrid.colors.length > 1"
          :id="`color-percentage-angle-${grid.id}`"
          label="Colors angle: "
          :min="0"
          :max="360"
          propertyName="colorsAngle"
          class="controls--group"
          :value="localGrid.colorsAngle"
          :input-function="updateGrid"
          sufix="deg"
        ></SliderComponent>
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
import { ref, watch } from 'vue'
import SliderComponent from '../UI/SliderComponent.vue'

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
