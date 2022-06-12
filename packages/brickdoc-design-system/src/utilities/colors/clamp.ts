/** Clamp a value to ensure it falls within a given range. */
export function clamp(value: number, max: number, min = 0): number {
  if (value < min) {
    return min
  } else {
    return value > max ? max : value
  }
}
