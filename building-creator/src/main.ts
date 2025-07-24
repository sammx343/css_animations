import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  HiDuplicate,
  MdDeleteforeverOutlined,
  BiChevronUp,
  BiChevronDown,
  BiArrowUp,
  BiArrowDown,
} from 'oh-vue-icons/icons'

const pinia = createPinia()

addIcons(HiDuplicate, MdDeleteforeverOutlined, BiChevronUp, BiChevronDown, BiArrowUp, BiArrowDown)
createApp(App).use(pinia).component('v-icon', OhVueIcon).mount('#app')
