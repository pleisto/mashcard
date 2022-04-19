import { sql, SqlToken } from 'slonik'

import { translateValue, getValueFromResult } from './translate.utils'

/**
 * Create a list of values from an object.
 * @param obj
 * @param translate
 * @returns
 */
export function fromObject(obj: Record<string, any>, translate = translateValue): SqlToken {
  const values = Object.keys(obj).map(identifier => {
    const value = obj[identifier]
    return getValueFromResult(translate(identifier, value))
  })

  return sql.join(values, sql`, `)
}

/**
 * Create a list of values from Map<string, any>.
 * @param payload
 * @param translate
 * @returns
 */
export function fromMap(payload: Map<string, any>, translate = translateValue): SqlToken {
  return fromObject(Object.fromEntries(payload), translate)
}
