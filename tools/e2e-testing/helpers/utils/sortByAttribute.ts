import { PageType } from '../types/graphql.types'

export function compareAttributeItem(item1: PageType, item2: PageType): number {
  const title1 = item1.documentInfo.title.toLowerCase().trim()
  const title2 = item2.documentInfo.title.toLowerCase().trim()
  return title2.localeCompare(title1)
}
