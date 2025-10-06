<template>
  <div class="slider" :class="props.class">
    <div class="d-flex">
      <label :for="id">{{ props.label }}</label>
      <p>{{ value }} {{ sufix }}</p>
    </div>
    <div class="d-flex">
      <button @click="inputFunction(propertyName, parseInt(value) - 1)">
        <v-icon name="hi-solid-chevron-left" style="fill: black" />
      </button>
      <input
        :id="props.id"
        type="range"
        :min="props.min"
        :max="props.max"
        :value="value"
        @input="
          (event) => inputFunction(propertyName, (event.target as HTMLInputElement).value, index)
        "
      />
      <button @click="inputFunction(propertyName, parseInt(value) + 1)">
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
  index?: number
  value: string | number
  propertyName: string
  sufix: string
  inputFunction: (dimension: string, value: string, index?: number) => void
}>()
</script>
