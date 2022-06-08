export const toUnderline = (name: string): string => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
