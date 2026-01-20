/**
 * Application constants
 */

export const STORAGE_KEYS = {
  BUILDINGS: 'buildings',
  DEFAULT_BUILDINGS_INITIALIZED: 'default_buildings_initialized',
} as const

export const ZOOM_CONFIG = {
  MIN: 0.2,
  MAX: 1.5,
  STEP: 0.01,
  DEFAULT: 1,
} as const

export const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-QXWKHBXNL0'
