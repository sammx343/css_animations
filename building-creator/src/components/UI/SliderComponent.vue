<template>
  <div class="slider" :class="props.class">
    <div class="d-flex">
      <label for="cube-width">{{ props.label }}</label>
      <p>{{ property }} {{ sufix }}</p>
    </div>
    <div class="d-flex">
      <button @click="substractFunction">
        <v-icon name="hi-solid-chevron-left" style="fill: black" />
      </button>
      <input
        :id="props.id"
        type="range"
        :min="props.min"
        :max="props.max"
        :value="property"
        @input="inputFunction"
      />
      <button @click="addFunction">
        <v-icon name="hi-solid-chevron-right" style="fill: black" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  class: string
  min: number
  max: number
  property: string | number
  propertyName: string
  sufix: string
  substractFunction: (dimension: string, value: string) => void
  addFunction: (dimension: string, value: string) => void
  inputFunction: (dimension: string, value: string) => void
}>()
</script>
