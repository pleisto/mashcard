import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'

export { isArray, isEmpty, isFunction }
export { default as isDate } from 'lodash/isDate'
export { default as isBoolean } from 'lodash/isBoolean'
export { default as isError } from 'lodash/isError'
export { default as isPlainObject } from 'lodash/isPlainObject'
export { default as isNull } from 'lodash/isNull'
export { default as isObject } from 'lodash/isObject'
export { default as isNil } from 'lodash/isNil'
export { default as isMatch } from 'lodash/isMatch'
export { default as isEqual } from 'lodash/isEqual'
export { default as isNaN } from 'lodash/isNaN'
export { default as isRegExp } from 'lodash/isRegExp'
export { default as isSet } from 'lodash/isSet'
export { default as isSymbol } from 'lodash/isSymbol'
export { default as isWeakMap } from 'lodash/isWeakMap'
export { default as isWeakSet } from 'lodash/isWeakSet'
export { default as isInteger } from 'lodash/isInteger'
export { default as isBuffer } from 'lodash/isBuffer'

/**
 * Checks if a given value is a string.
 *
 * @see {@link https://bambielli.com/til/2017-06-18-typeof-vs-instanceof/}
 * @param value
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

/**
 * Checks if a given value is a number.
 * @param value
 * @param finiteness - if true, checks if the value is a finite number.
 */
export function isNumber(value: unknown, finiteness = false): value is number {
  if (typeof value !== 'number') return false
  return finiteness ? Number.isFinite(value) : true
}

/**
 * Checks if a given value is a null or undefined.
 * @param value
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  // eslint-disable-next-line eqeqeq
  return value == undefined
}

/**
 * Checks if a given value is a uuid.
 * @param value
 */
export const isUUID = <U>(value: string | U): value is string => {
  return isString(value) && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

/**
 * Checks if a given value is non empty array.
 * @param value
 */
export const isNonEmptyArray = <T, U>(value: T[] | U): value is T[] => isArray(value) && value.length > 0

/**
 * Checks if a given value is a non empty string.
 * @param value
 */
export const isNonEmptyString = <U>(value: string | U): value is string => isString(value) && value.length > 0

/**
 * Checks if a given value is a empty like Ruby on Rails.
 * @param value
 */
export const isBlank = (value: unknown): boolean =>
  isNumber(value) || isFunction(value) || value === true ? false : isEmpty(value)

/**
 * Checks if a given value is a url.
 * @param value
 * @param schema - if not null, checks if the uri is valid with the given schema.
 * @returns true if the value is a url, false otherwise.
 */
export const isUrl = (value: string, schema?: string): boolean => {
  if (!isString(value)) return false
  try {
    const url = new URL(value)
    return schema ? url.protocol === `${schema}:` : true
  } catch (_e) {
    return false
  }
}
