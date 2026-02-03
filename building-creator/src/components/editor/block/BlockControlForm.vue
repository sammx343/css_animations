<template>
  <div class="block-controls">
    <SliderComponent
      id="block-width"
      label="Width:"
      :min="1"
      :max="1000"
      propertyName="width"
      class="block-controls--group"
      :value="blockProperties.width"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-height"
      label="Height:"
      :min="1"
      :max="1000"
      propertyName="height"
      class="block-controls--group"
      :value="blockProperties.height"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-long"
      label="Long:"
      :min="1"
      :max="1000"
      propertyName="long"
      class="block-controls--group"
      :value="blockProperties.long"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-position-x"
      label="Position X:"
      :min="-1000"
      :max="1000"
      propertyName="positionX"
      class="block-controls--group"
      :value="blockProperties.positionX"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-position-y"
      label="Position Y:"
      :min="-1000"
      :max="1000"
      propertyName="positionY"
      class="block-controls--group"
      :value="blockProperties.positionY"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-position-z"
      label="Position Z:"
      :min="-1000"
      :max="1000"
      propertyName="positionZ"
      class="block-controls--group"
      :value="blockProperties.positionZ"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-rotation-x"
      label="Rotation X:"
      :min="0"
      :max="360"
      propertyName="rotationX"
      class="block-controls--group"
      :value="blockProperties.rotationX || 0"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-rotation-y"
      label="Rotation Y:"
      :min="0"
      :max="360"
      propertyName="rotationY"
      class="block-controls--group"
      :value="blockProperties.rotationY || 0"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <SliderComponent
      id="block-rotation-z"
      label="Rotation Z:"
      :min="0"
      :max="360"
      propertyName="rotationZ"
      class="block-controls--group"
      :value="blockProperties.rotationZ || 0"
      :input-function="updateProperty"
      sufix="px"
    ></SliderComponent>

    <div class="block-controls--group">
      <h3>Color picker:</h3>

      <div
        v-for="(color, index) in blockProperties.colors"
        class=""
        :key="`color-index-${index}`"
        style="position: relative"
      >
        <div class="d-flex">
          <p>Color {{ index + 1 }} : {{ color.hex }}</p>
          <input
            id="block-color-picker"
            type="color"
            :value="color.hex"
            @input="updateColor('hex', ($event.target as HTMLInputElement).value, index)"
          />
        </div>
        <SliderComponent
          v-if="blockProperties.colors.length > 1"
          id="block-color-percentage"
          :label="`Color ${index + 1}# percentage: `"
          :min="1"
          :max="100"
          :index="index"
          propertyName="percentage"
          class="block-controls--group"
          :value="color.percentage"
          :input-function="updateColor"
          sufix="%"
        ></SliderComponent>
        <v-icon
          v-if="blockProperties.colors.length > 1"
          name="md-deleteforever-outlined"
          style="position: absolute; right: 0; top: 0; cursor: pointer"
          @click="deleteColor(index)"
        ></v-icon>
      </div>

      <SliderComponent
        v-if="blockProperties.colors.length > 1"
        id="colors-angle"
        label="Colors Angle: "
        :min="0"
        :max="180"
        propertyName="colorsAngle"
        class="block-controls--group"
        :value="blockProperties.colorsAngle"
        :input-function="updateProperty"
        sufix="degree"
      ></SliderComponent>
      <button class="button multicolor" @click="addColors()">
        Add color <v-icon name="md-addcircle-outlined"></v-icon>
      </button>
    </div>

    <div class="block-controls--group">
      <h3>Visible Faces:</h3>
      <div class="face-visibility-controls">
        <label v-for="(faceVisible, index) in faceVisibility" :key="index" class="face-checkbox">
          <input
            type="checkbox"
            :checked="faceVisible"
            @change="updateFaceVisibility(index, ($event.target as HTMLInputElement).checked)"
          />
          <span>Face {{ index + 1 }}</span>
        </label>
      </div>
    </div>

    <div class="block-controls--group">
      <label class="backface-checkbox">
        <input
          type="checkbox"
          :checked="backfaceVisibility"
          @change="updateBackfaceVisibility(($event.target as HTMLInputElement).checked)"
        />
        <span>Backface Visibility</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Block } from '@/types/block'
import type { Color } from '@/types/color'
import SliderComponent from '@/components/UI/SliderComponent.vue'

const props = defineProps<{
  blockProperties: Block
}>()

const emit = defineEmits(['update:blockProperties', 'update:isGridControlOpen'])

// Initialize visibleFaces if not present (default: all faces visible)
const faceVisibility = computed(() => {
  if (!props.blockProperties.visibleFaces) {
    return [true, true, true, true, true, true]
  }
  return props.blockProperties.visibleFaces
})

// Initialize backfaceVisibility if not present (default: false, meaning backface is hidden)
const backfaceVisibility = computed(() => {
  return props.blockProperties.backfaceVisibility ?? false
})

const updateProperty = (dimension: string, value: string) => {
  emit('update:blockProperties', {
    ...props.blockProperties,
    [dimension]: value,
  })
}

const updateFaceVisibility = (faceIndex: number, isVisible: boolean) => {
  const newVisibleFaces = [...faceVisibility.value]
  newVisibleFaces[faceIndex] = isVisible
  console.log(newVisibleFaces)
  emit('update:blockProperties', {
    ...props.blockProperties,
    visibleFaces: newVisibleFaces,
  })
}

const updateBackfaceVisibility = (isVisible: boolean) => {
  emit('update:blockProperties', {
    ...props.blockProperties,
    backfaceVisibility: isVisible,
  })
}

const addColors = () => {
  const colorsCopy = [...props.blockProperties.colors, { hex: '#000000', percentage: 100 }]

  const colors = colorsCopy.map((color: Color, index: number) => {
    return { ...color, percentage: (100 / colorsCopy.length) * (index + 1) }
  })

  emit('update:blockProperties', {
    ...props.blockProperties,
    colors: colors,
  })
}

const updateColor = (property: string, value: string, index: number) => {
  const newColorArray = [...props.blockProperties.colors]
  newColorArray[index][property] = value

  emit('update:blockProperties', {
    ...props.blockProperties,
    colors: newColorArray,
  })
}

function deleteColor(index: number) {
  const newColorArray = [...props.blockProperties.colors]
  newColorArray.splice(index, 1)

  emit('update:blockProperties', {
    ...props.blockProperties,
    colors: newColorArray,
  })
}
</script>

<style scoped>
.face-visibility-controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.face-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.face-checkbox:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.face-checkbox input[type='checkbox'] {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.face-checkbox span {
  font-size: 14px;
  user-select: none;
}

.backface-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.backface-checkbox:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.backface-checkbox input[type='checkbox'] {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.backface-checkbox > span {
  font-size: 14px;
  font-weight: 500;
  user-select: none;
}
</style>
