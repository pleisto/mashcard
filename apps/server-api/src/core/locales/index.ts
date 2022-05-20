import { enUS } from './en-US'

export { Locale } from './locale.object-type'

export const supportLocales = [enUS] as const

export type LocalesType = typeof supportLocales
export type LocaleTagType = LocalesType[number]['tag']
