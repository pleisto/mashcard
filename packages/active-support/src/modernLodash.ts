/* eslint-disable @typescript-eslint/no-restricted-imports */
/**
 * NOTICE: All methods not exported from `lodash` are deprecated.
 * you can replace with ES6
 *
 * @see https://youmightnotneed.com/lodash/
 */
export { default as memoize } from 'moize'
export { default as difference } from 'lodash/difference'
export { default as differenceBy } from 'lodash/differenceBy'
export { default as dropRightWhile } from 'lodash/dropRightWhile'
export { default as dropWhile } from 'lodash/dropWhile'
export { default as findLastIndex } from 'lodash/findLastIndex'
export { default as intersection } from 'lodash/intersection'
export { default as intersectionBy } from 'lodash/intersectionBy'
export { default as intersectionWith } from 'lodash/intersectionWith'
export { default as last } from 'lodash/last'
export { default as nth } from 'lodash/nth'
export { default as pull } from 'lodash/pull'
export { default as pullAll } from 'lodash/pullAll'
export { default as pullAllBy } from 'lodash/pullAllBy'
export { default as pullAllWith } from 'lodash/pullAllWith'
export { default as pullAt } from 'lodash/pullAt'
export { default as remove } from 'lodash/remove'
export { default as slice } from 'lodash/slice'
export { default as uniqBy } from 'lodash/uniqBy'
export { default as uniqWith } from 'lodash/uniqWith'
export { default as unzip } from 'lodash/unzip'
export { default as unzipWith } from 'lodash/unzipWith'
export { default as without } from 'lodash/without'
export { default as xor } from 'lodash/xor'
export { default as xorBy } from 'lodash/xorBy'
export { default as xorWith } from 'lodash/xorWith'
export { default as zip } from 'lodash/zip'
export { default as zipObject } from 'lodash/zipObject'
export { default as zipObjectDeep } from 'lodash/zipObjectDeep'
export { default as zipWith } from 'lodash/zipWith'
export { default as countBy } from 'lodash/countBy'
export { default as forEachRight } from 'lodash/forEachRight'
export { default as findLast } from 'lodash/findLast'
export { default as flatMap } from 'lodash/flatMap'
export { default as flatMapDeep } from 'lodash/flatMapDeep'
export { default as flatMapDepth } from 'lodash/flatMapDepth'
export { default as groupBy } from 'lodash/groupBy'
export { default as invokeMap } from 'lodash/invokeMap'
export { default as keyBy } from 'lodash/keyBy'
export { default as orderBy } from 'lodash/orderBy'
export { default as partition } from 'lodash/partition'
export { default as sample } from 'lodash/sample'
export { default as sampleSize } from 'lodash/sampleSize'
export { default as shuffle } from 'lodash/shuffle'
export { default as size } from 'lodash/size'
export { default as sortBy } from 'lodash/sortBy'
export { default as after } from 'lodash/after'
export { default as before } from 'lodash/before'
export { default as sortedIndex } from 'lodash/sortedIndex'
export { default as sortedIndexBy } from 'lodash/sortedIndexBy'
export { default as sortedIndexOf } from 'lodash/sortedIndexOf'
export { default as sortedLastIndex } from 'lodash/sortedLastIndex'
export { default as sortedLastIndexBy } from 'lodash/sortedLastIndexBy'
export { default as sortedLastIndexOf } from 'lodash/sortedLastIndexOf'
export { default as sortedUniq } from 'lodash/sortedUniq'
export { default as sortedUniqBy } from 'lodash/sortedUniqBy'
export { default as take } from 'lodash/take'
export { default as takeRight } from 'lodash/takeRight'
export { default as takeRightWhile } from 'lodash/takeRightWhile'
export { default as takeWhile } from 'lodash/takeWhile'
export { default as union } from 'lodash/union'
export { default as unionBy } from 'lodash/unionBy'
export { default as unionWith } from 'lodash/unionWith'
export { default as once } from 'lodash/once'
export { default as overArgs } from 'lodash/overArgs'
export { default as unary } from 'lodash/unary'
export { default as wrap } from 'lodash/wrap'
export { default as omit } from 'lodash/omit'
export { default as omitBy } from 'lodash/omitBy'
export { default as debounce } from 'lodash/debounce'
export { default as throttle } from 'lodash/throttle'
export { default as defer } from 'lodash/defer'
export { default as pick } from 'lodash/pick'
export { default as clamp } from 'lodash/clamp'
export { default as findKey } from 'lodash/findKey'
export { default as set } from 'lodash/set'
export { default as unset } from 'lodash/unset'
export { default as escape } from 'lodash/escape'
export { default as capitalize } from 'lodash/capitalize'
export { default as pad } from 'lodash/pad'
export { default as padEnd } from 'lodash/padEnd'
export { default as padStart } from 'lodash/padStart'
export { default as trim } from 'lodash/trim'
export { default as trimEnd } from 'lodash/trimEnd'
export { default as trimStart } from 'lodash/trimStart'
export { default as upperFirst } from 'lodash/upperFirst'
export { default as attempt } from 'lodash/attempt'
export { default as noop } from 'lodash/noop'
export { default as identity } from 'lodash/identity'
export { default as over } from 'lodash/over'
export { default as overEvery } from 'lodash/overEvery'
export { default as overSome } from 'lodash/overSome'
export { default as partial } from 'lodash/partial'
export { default as partialRight } from 'lodash/partialRight'
export { default as range } from 'lodash/range'
export { default as rangeRight } from 'lodash/rangeRight'
export { default as times } from 'lodash/times'
export { default as startCase } from 'lodash/startCase'
export { default as snakeCase } from 'lodash/snakeCase'
export { default as camelCase } from 'lodash/camelCase'
export { default as kebabCase } from 'lodash/kebabCase'

/**
 * ES Version of `lodash.chunk`
 * Creates an array of elements split into groups the length of size.
 * If array can’t be split evenly, the final chunk will be the remaining elements.
 * @param arr - The array to process.
 * @param size - The length of each chunk.
 * @returns Returns the new array of chunks.
 */
export const chunk = <T>(arr: T[], size = 1): T[][] => {
  const mSize = Math.floor(size)
  const output: T[][] = []
  if (mSize > 0) {
    for (let i = 0, l = arr.length; i < l; i += mSize) {
      output.push(arr.slice(i, i + mSize))
    }
  }
  return output
}

/**
 * ES Version of `lodash.compact`
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * @param arr - The array to compact.
 * @returns Returns the new array of filtered values.
 */
export const compact = <T>(arr: T[]): T[] => arr.filter(x => !!x)

/**
 * ES Version of `lodash.drop`
 * Creates a slice of array with n elements dropped from the beginning.
 * @param arr - The array to query.
 * @param n - The number of elements to drop.
 * @returns Returns the slice of array.
 */
export const drop = <T>(arr: T[], n = 1): T[] => arr.slice(n)

/**
 * ES Version of `lodash.dropRight`
 * Creates a slice of array with n elements dropped from the end.
 * @param arr - The array to query.
 * @param n - The number of elements to drop.
 * @returns The slice of array.
 */
export const dropRight = <T>(arr: T[], n = 1): T[] => arr.slice(0, -n || arr.length)

/**
 * ES Version of `lodash.initial`
 * Gets all but the last element of array.
 * @param arr - The array to query.
 * @returns Returns the slice of array.
 */
export const initial = <T>(arr: T[]): T[] => arr.slice(0, -1)

/**
 * ES Version of `lodash.uniq`
 * Creates a duplicate-free version of an array, in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array.
 * @param arr - The array to inspect.
 * @returns Returns the new duplicate free array.
 */
export const uniq = <T>(arr: T[]): T[] => [...new Set(arr)]

/**
 * ES Version of `lodash.reject`
 * The opposite of `filter`; this method returns the elements of collection that predicate does not return truthy for.
 * @param arr - The array to iterate over.
 * @param predicate - The function invoked per iteration.
 * @returns Returns the new filtered array.
 */
export const reject = <T>(arr: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[] =>
  arr.filter((x, i, a) => !predicate(x, i, a))

/** ES Version of `lodash.cloneDeep`
 * Creates a shallow clone of `value`. Assumes that the values of the object are primitive types.
 * @param value - The value to clone.
 * @returns Returns the cloned value.
 */
export const cloneDeep = (value: any): any | never => {
  // @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  if (typeof globalThis?.structuredClone === 'function') return globalThis.structuredClone(value)

  const typeofValue = typeof value
  // primatives are copied by value.
  if (
    ['string', 'number', 'boolean', 'string', 'bigint', 'symbol', 'null', 'undefined', 'function'].includes(typeofValue)
  ) {
    return value
  }
  if (Array.isArray(value)) return value.map(cloneDeep)
  if (typeofValue === 'object') {
    const clone: any = {}
    for (const prop in value) {
      clone[prop] = cloneDeep(value[prop])
    }
    return clone
  }
  throw new Error(`You've tried to clone something that can't be cloned`)
}
