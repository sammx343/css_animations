import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { configure, pageview } from 'vue-gtag'

import {
  HiDuplicate,
  MdDeleteforeverOutlined,
  BiChevronUp,
  BiChevronDown,
  BiArrowUp,
  BiArrowDown,
  MdFlipcameraandroid,
  MdAddcircleOutlined,
  MdKeyboardbackspaceRound,
  HiSolidChevronLeft,
  HiSolidChevronRight,
  IoClose,
  IoSave,
  MdDrivefolderuploadTwotone,
  FaRegularBuilding,
  IoCubeOutline,
  LaCubeSolid,
  BiGrid3X3,
} from 'oh-vue-icons/icons'

import { GOOGLE_ANALYTICS_ID } from '@/constants'

const pinia = createPinia()
configure({
  tagId: GOOGLE_ANALYTICS_ID,
})

pageview('/')

addIcons(
  HiDuplicate,
  MdDeleteforeverOutlined,
  BiChevronUp,
  BiChevronDown,
  BiArrowUp,
  BiArrowDown,
  MdFlipcameraandroid,
  MdAddcircleOutlined,
  HiSolidChevronLeft,
  HiSolidChevronRight,
  IoClose,
  IoSave,
  MdDrivefolderuploadTwotone,
  FaRegularBuilding,
  IoCubeOutline,
  LaCubeSolid,
  BiGrid3X3,
  MdKeyboardbackspaceRound,
)
createApp(App).use(pinia).component('v-icon', OhVueIcon).mount('#app')
