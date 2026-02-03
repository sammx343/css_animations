<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="action-feedback" :class="variantClass" @click="handleClose">
        <div class="action-feedback-content" @click.stop>
          <h3 class="action-feedback-title">{{ title }}</h3>
          <p class="action-feedback-description">{{ description }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export type ActionFeedbackVariant = 'success' | 'error'

const props = withDefaults(
  defineProps<{
    variant?: ActionFeedbackVariant
    title: string
    description: string
    duration?: number
  }>(),
  {
    variant: 'success',
    duration: 3000,
  },
)

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const variantClass = computed(() => `action-feedback--${props.variant}`)

const handleClose = () => {
  isVisible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  // Wait for transition to complete before emitting close
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  // Start auto-dismiss timer
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
})
</script>

<style scoped>
.action-feedback {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  min-width: 300px;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.action-feedback-content {
  padding: 16px 20px;
}

.action-feedback--success {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
}

.action-feedback--error {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
}

.action-feedback-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.action-feedback-description {
  margin: 0;
  font-size: 14px;
  opacity: 0.95;
  font-family: 'Poppins', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
