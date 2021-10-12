const storage: { [key: string]: File } = {}

export function set(key: string, file: File): void {
  storage[key] = file
}

export function get(key: string): File | undefined {
  return storage[key]
}
