export const rem2Pixel = (rem: string): string => {
  const remNumber = Number(rem.split('rem')[0])
  const htmlFontSize = 16
  return remNumber ? `${remNumber * htmlFontSize}px` : 'remNumber is not a number'
}
