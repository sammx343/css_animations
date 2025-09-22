<template>
  <div class="cube-controls">
    <SliderComponent
      id="cube-width"
      label="Cube Width:"
      :min="1"
      :max="1000"
      propertyName="width"
      class="cube-controls--group"
      :value="cubeProperties.width"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="cube-height"
      label="Cube Height:"
      :min="1"
      :max="1000"
      propertyName="height"
      class="cube-controls--group"
      :value="cubeProperties.height"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="cube-long"
      label="Cube Long:"
      :min="1"
      :max="1000"
      propertyName="long"
      class="cube-controls--group"
      :value="cubeProperties.long"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="cube-position-x"
      label="Cube Position X:"
      :min="-1000"
      :max="1000"
      propertyName="positionX"
      class="cube-controls--group"
      :value="cubeProperties.positionX"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="cube-position-y"
      label="Cube Position Y:"
      :min="-1000"
      :max="1000"
      propertyName="positionY"
      class="cube-controls--group"
      :value="cubeProperties.positionY"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="cube-position-z"
      label="Cube Position Z:"
      :min="-1000"
      :max="1000"
      propertyName="positionZ"
      class="cube-controls--group"
      :value="cubeProperties.positionZ"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <div class="cube-controls--group">
      <h3>Color picker:</h3>

      <div
        v-for="(color, index) in cubeProperties.colors"
        class=""
        :key="`color-index-${index}`"
        style="position: relative"
      >
        <div class="d-flex">
          <p>Color {{ index + 1 }} : {{ color.hex }}</p>
          <input
            id="cube-color-picker"
            type="color"
            :value="color.hex"
            @input="updateColor('hex', ($event.target as HTMLInputElement).value, index)"
          />
        </div>
        <SliderComponent
          v-if="cubeProperties.colors.length > 1"
          id="cube-color-percentage"
          :label="`Color ${index + 1}# percentage: `"
          :min="1"
          :max="100"
          :index="index"
          propertyName="percentage"
          class="cube-controls--group"
          :value="color.percentage"
          :input-function="updateColor"
          sufix="%"
        ></SliderComponent>
        <v-icon
          v-if="cubeProperties.colors.length > 1"
          name="md-deleteforever-outlined"
          style="position: absolute; right: 0; top: 0; cursor: pointer"
          @click="deleteColor(index)"
        ></v-icon>
      </div>

      <SliderComponent
        v-if="cubeProperties.colors.length > 1"
        id="colors-angle"
        label="Colors Angle: "
        :min="0"
        :max="180"
        propertyName="colorsAngle"
        class="cube-controls--group"
        :value="cubeProperties.colorsAngle"
        :input-function="updateProperty"
        sufix="degree"
      ></SliderComponent>
      <button
        class="button grid-button"
        @click="addColors()"
        style="background: blue; margin-bottom: 10px"
      >
        Add color <v-icon name="md-addcircle-outlined"></v-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Cube } from '@/types/cube'
import type { Color } from '@/types/color'
import SliderComponent from '../UI/SliderComponent.vue'

const props = defineProps<{
  cubeProperties: Cube
  zoom: string
}>()

const emit = defineEmits(['update:cubeProperties', 'update:isGridControlOpen'])

const updateProperty = (dimension: string, value: string) => {
  emit('update:cubeProperties', {
    ...props.cubeProperties,
    [dimension]: value,
  })
}

const addColors = () => {
  const colorsCopy = [...props.cubeProperties.colors, { hex: '#000000', percentage: 100 }]

  const colors = colorsCopy.map((color: Color, index: number) => {
    return { ...color, percentage: (100 / colorsCopy.length) * (index + 1) }
  })

  emit('update:cubeProperties', {
    ...props.cubeProperties,
    colors: colors,
  })
}

const updateColor = (property: string, value: string, index: number) => {
  const newColorArray = [...props.cubeProperties.colors]
  newColorArray[index][property] = value

  emit('update:cubeProperties', {
    ...props.cubeProperties,
    colors: newColorArray,
  })
}

function deleteColor(index: number) {
  const newColorArray = [...props.cubeProperties.colors]
  newColorArray.splice(index, 1)

  emit('update:cubeProperties', {
    ...props.cubeProperties,
    colors: newColorArray,
  })
}
</script>

<style scoped></style>
