import { PageType } from '../types/graphql.types'

export function compareAttributeItem(item1: PageType, item2: PageType): number {
  const text1 = item1.text.toLowerCase().trim()
  const text2 = item2.text.toLowerCase().trim()
  return text2.localeCompare(text1)
}
