import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  HiDuplicate,
  MdDeleteforeverOutlined,
  BiChevronUp,
  BiChevronDown,
  BiArrowUp,
  BiArrowDown,
} from 'oh-vue-icons/icons'

addIcons(HiDuplicate, MdDeleteforeverOutlined, BiChevronUp, BiChevronDown, BiArrowUp, BiArrowDown)
createApp(App).component('v-icon', OhVueIcon).mount('#app')
