<template>
  <div
    class="cube__face"
    :class="`cube__face--${faceIndex + 1}`"
    :style="faceStyle"
    @dblclick="selectCube"
  >
    <template v-for="grid in grids">
      <GridScene
        v-if="!grid.excludedFaces.includes(faceIndex + 1)"
        :key="grid.id"
        :grid="grid"
        :cubeId="cube.id"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GridScene from '../Grid/GridScene.vue'
import type { Grid } from '@/types/grid'
import { Cube } from '@/types/cube'
import type { Color } from '@/types/color'
import { useCubeStore } from '@/store/cubeStore'
const props = defineProps<{
  faceIndex: number
  cube: Cube
  grids: Grid[]
}>()

const cubeStore = useCubeStore()

const faceStyle = computed(() => {
  const { width, long, height, colors, colorsAngle } = props.cube
  const index = props.faceIndex
  const style = {
    background: colorsToLinearBackground(colors, colorsAngle),
    transform: '',
    width: '',
    height: '',
  }

  if (index === 0) {
    style.transform = `translateZ(${width / 2}px)`
    style.width = `${long}px`
    style.height = `${height}px`
  } else if (index === 1) {
    style.transform = `rotateY(180deg) translateZ(${width / 2}px)`
    style.width = `${long}px`
    style.height = `${height}px`
  } else if (index === 2) {
    style.transform = `rotateY(-90deg) translateZ(${width / 2}px)`
    style.width = `${width}px`
    style.height = `${height}px`
  } else if (index === 3) {
    const sum = long - width
    style.transform = `rotateY(90deg) translateZ(${width / 2 + sum}px)`
    style.width = `${width}px`
    style.height = `${height}px`
  } else if (index === 4) {
    style.width = `${long}px`
    style.height = `${width}px`
    style.transform = `rotateX(90deg) translateZ(${width / 2}px)`
  } else if (index === 5) {
    const sum = height - width
    style.width = `${long}px`
    style.height = `${width}px`
    style.transform = `rotateX(-90deg) translateZ(${width / 2 + sum}px)`
  }

  return style
})

const selectCube = () => {
  cubeStore.setSelectedCube(props.cube)
}

const colorsToLinearBackground = (colors: Color[], colorsAngle = 90) => {
  const colorString = colors.map((color) => `${color.hex} ${color.percentage}%`)
  return `linear-gradient(${colorsAngle}deg, ${colorString})`
}
</script>

<style scoped>
.cube__face {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  position: absolute;
  backface-visibility: inherit;
  border: 1px solid black;
}
</style>
