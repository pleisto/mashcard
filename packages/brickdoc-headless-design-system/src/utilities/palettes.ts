import { generatePalette as paletteArray } from '@brickdoc/design-colors'

/**
 * Palette Token name
 */
type PaletteToken<T extends string> = `${T}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`

type PaletteObject<T extends string> = {
  [key in PaletteToken<T>]: string
}

/**
 * Generate the color palette
 * @internal
 * @param name The name of the color
 * @param baseColorHex The base color hex
 * @param isInverted is dark mode
 *
 * @example
 * ` generatePalette<'cyan'>('cyan', '#39b3e8')`
 */
export const generatePalette = <T extends string>(
  name: string,
  baseColorHex: string,
  isInverted = false
): PaletteObject<T> =>
  Object.fromEntries(
    paletteArray(baseColorHex, isInverted).map((color, i) => [`${name}${i + 1}`, color])
  ) as unknown as PaletteObject<T>
