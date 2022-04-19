import { sql, ListSqlToken } from 'slonik'

/**
 * Create a set of identifiers from an array of strings.
 * @param identifiers
 * @param tableName
 * @returns
 */
export function fromArray(identifiers: string[], tableName?: string): ListSqlToken {
  return sql.join(
    identifiers.map(ident => {
      const idents = [ident]
      if (tableName) {
        idents.unshift(tableName)
      }
      return sql.identifier(idents)
    }),
    sql`, `
  )
}

/**
 * Create a set of identifiers from an object.
 * @param obj
 * @param tableName
 * @returns
 */
export function fromObject(obj: Record<string, any>, tableName?: string): ListSqlToken {
  return fromArray(Object.keys(obj), tableName)
}

/**
 * Create a set of identifiers from a Set<string>
 * @param identifiers
 * @param tableName
 * @returns
 */
export function fromSet(identifiers: Set<string>, tableName?: string): ListSqlToken {
  return fromArray(Array.from(identifiers), tableName)
}
