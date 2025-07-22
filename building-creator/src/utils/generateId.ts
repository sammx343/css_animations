import { randomNumber } from './random'

export function generateId() {
  return `${randomNumber(1, 10000)}${new Date().getTime()}`
}
