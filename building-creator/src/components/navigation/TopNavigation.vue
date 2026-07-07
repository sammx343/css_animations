<template>
  <nav class="top-navigation">
    <router-link
      v-for="route in routes"
      :key="route.name"
      :to="route.path"
      class="nav-link"
      :class="{ active: $route.name === route.name }"
    >
      {{ route.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routes = computed(() => [
  { name: 'BuildingEditor', path: '/', label: 'Building Editor' },
  { name: 'CityCreator', path: '/city-creator', label: 'City Creator' },
  { name: 'CityParallax', path: '/city-parallax', label: 'City Parallax' },
  { name: 'CityBuilder', path: '/city-builder', label: 'City Builder' },
])
</script>

<style scoped>
.top-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
  font-weight: 500;
  font-size: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}
</style>
