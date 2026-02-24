<template>
  <Teleport to="body">
    <div class="prompt" @click="handleBackdropClick">
      <div class="prompt-container" @click.stop>
        <v-icon name="io-close" class="close-icon" @click="closePrompt"></v-icon>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, Teleport } from 'vue'
const emit = defineEmits(['closePrompt'])

const closePrompt = () => {
  emit('closePrompt')
}

const handleBackdropClick = (event: MouseEvent) => {
  // Close prompt when clicking on the gray backdrop (not on the content)
  if (event.target === event.currentTarget) {
    closePrompt()
  }
}

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
})

onMounted(() => {
  document.body.classList.add('modal-open')
})
</script>
<style scoped>
.close-icon {
  fill: #000;
  transform: scale(2);
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.prompt {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.prompt-container {
  width: 600px;
  max-width: 90%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
