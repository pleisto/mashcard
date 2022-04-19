import { sql, SqlToken } from 'slonik'

import { translateValue, getColumnNameFromResult, getValueFromResult } from './translate.utils'

export function fromObject(payload: Record<string, any>, translate = translateValue): SqlToken {
  const values = Object.values(
    Object.entries(payload).map(([column, value]) => {
      const translated = translate(column, value)
      return sql`${sql.identifier([getColumnNameFromResult(translated) ?? column])} = ${getValueFromResult(translated)}`
    })
  )
  return sql.join(values, sql`, `)
}

export function fromMap(payload: Map<string, any>): SqlToken {
  return fromObject(Object.fromEntries(payload))
}
