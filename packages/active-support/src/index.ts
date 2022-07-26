import ms from 'ms'
import { arrayToTree, Config, Item } from 'performant-array-to-tree'
export { v4 as uuid } from '@lukeed/uuid'

export * from './isType'
export * from './modernLodash'
export * from './inflections'
export * from 'neverthrow' // rust style error handing
export * from './results'
export * from './prependUrlScheme'
export * from './sleep'
export * from './typescript'

export {
  ms // Use this package to easily convert various time formats to milliseconds.
}

/**
 * Converts an array of items with ids and parent ids to a nested tree in a performant way (time complexity `O(n)`).
 *
 * @param items array of items
 * @param config please see `performant-array-to-tree`
 */
export function array2Tree<TItem extends Item>(
  items: TItem[],
  config: Partial<Config> = {}
): Array<TItem & { children: TItem[] }> {
  return arrayToTree(items, {
    ...config,
    dataField: null,
    nestedIds: false
  }) as Array<TItem & { children: TItem[] }>
}
