import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BuildingEditor',
    component: () => import('@/views/buildingEditor.vue'),
  },
  {
    path: '/city-creator',
    name: 'CityCreator',
    component: () => import('@/views/cityCreator.vue'),
  },
  {
    path: '/city-parallax',
    name: 'CityParallax',
    component: () => import('@/views/cityParallax.vue'),
  },
  {
    path: '/city-builder',
    name: 'CityBuilder',
    component: () => import('@/views/cityBuilder.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
