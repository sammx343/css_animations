export function randomNumber(max: number, min: number) {
  return parseInt(Math.random() * (max - min) + min)
}
