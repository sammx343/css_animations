<template>
  <div class="modal">
    <v-icon name="io-close" class="close-icon" @click="closeModal"></v-icon>
    <div class="modal-container">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, onBeforeUnmount, onMounted } from 'vue'
const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
})

onMounted(() => {
  document.body.classList.add('modal-open')
})
</script>
<style>
.close-icon {
  fill: #fff;
  transform: scale(3);
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}
</style>
