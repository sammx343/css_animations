<template>
  <div
    class="block__face"
    :class="`block__face--${faceIndex + 1}`"
    :style="faceStyle"
    @dblclick="selectBlock"
  >
    <template v-for="grid in grids">
      <GridScene
        v-if="!grid.excludedFaces.includes(faceIndex + 1)"
        :key="grid.id"
        :grid="grid"
        :blockId="block.id"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GridScene from './GridScene.vue'
import type { Grid } from '@/types/grid'
import type { Block } from '@/types/block'
import type { Color } from '@/types/color'
import { useBlockStore } from '@/store/useBlockStore'
const props = defineProps<{
  faceIndex: number
  block: Block
  grids: Grid[]
}>()

const blockStore = useBlockStore()

const faceStyle = computed(() => {
  const { width, long, height, colors, colorsAngle } = props.block
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

const selectBlock = () => {
  blockStore.setSelectedBlockId(props.block.id)
}

const colorsToLinearBackground = (colors: Color[], colorsAngle = 90) => {
  const colorString = colors.map((color) => `${color.hex} ${color.percentage}%`)
  return `linear-gradient(${colorsAngle}deg, ${colorString})`
}
</script>

<style scoped>
.block__face {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  position: absolute;
  backface-visibility: hidden;
  border: 1px solid black;
}
</style>
