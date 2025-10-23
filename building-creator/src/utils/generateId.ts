import { randomNumber } from './random'

export function generateId() {
  return `${randomNumber(1, 100000)}${new Date().getTime() * randomNumber(1, 1000)}`
}
