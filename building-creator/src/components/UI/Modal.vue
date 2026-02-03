<template>
  <Teleport to="body">
    <div class="modal" @click="handleBackdropClick">
      <v-icon name="io-close" class="close-icon" @click="closeModal"></v-icon>
      <div class="modal-container" @click.stop>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { defineEmits, onBeforeUnmount, onMounted, Teleport } from 'vue'
const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

const handleBackdropClick = (event: MouseEvent) => {
  // Close modal when clicking on the gray backdrop (not on the content)
  if (event.target === event.currentTarget) {
    closeModal()
  }
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
