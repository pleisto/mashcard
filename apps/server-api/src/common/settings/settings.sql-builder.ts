import { DatabasePool, sql } from '@brickdoc/nestjs-slonik'

/**
 * create or update a setting value on the database
 */
export const createOrUpdateSetting = async (
  dbPool: DatabasePool,
  key: string,
  value: any,
  scope: string
): Promise<boolean> => {
  const encodedValue = JSON.stringify(value)
  const timestampz = new Date().toISOString()
  const result = await dbPool.query(sql`
INSERT Into settings (key, value, scope, created_at, updated_at)
    VALUES (${key}, ${sql.jsonb(encodedValue)}, ${scope}, ${timestampz}, ${timestampz})
ON CONFLICT (key, scope)
    DO UPDATE SET
        value = ${sql.jsonb(encodedValue)}, updated_at = ${timestampz}
`)
  return result.rowCount === 1
}

/**
 * find a setting by key and scope
 * @param dbPool
 * @param key
 * @param scope
 * @returns
 */
export const findSetting = async <T>(
  dbPool: DatabasePool,
  key: string,
  scope: string,
  fallbackScope?: string
): Promise<T | undefined> => {
  const priority = fallbackScope
    ? sql`settings_scope_priority(scope,${fallbackScope})`
    : sql`settings_scope_priority(scope)`

  const findScope = fallbackScope ? sql`( (scope @> ${scope}) OR scope = ${fallbackScope} )` : sql`scope @> ${scope}`

  const result = await dbPool.maybeOne<{ value: string; depth: number }>(sql`
SELECT
    value,
    ${priority} AS depth
FROM
    settings
WHERE
    key = ${key} AND ${findScope}
ORDER BY
    depth DESC
LIMIT 1
`)
  if (!result) return undefined
  return JSON.parse(result.value) as T
}

/**
 * find multiple settings by keys and scope
 */
export const findSettings = async (
  dbPool: DatabasePool,
  items: Array<{ key: string; scope: string; fallbackScope?: string }>
): Promise<Array<{ value: string; key: string }> | undefined> => {
  // use a window function to get the latest matching value for each key
  const result = await dbPool.many<{ value: string; key: string }>(sql`
SELECT
    *
FROM (
    SELECT
        key,
        value,
        row_number() OVER (PARTITION BY key ORDER BY settings_scope_priority(scope, fallback_scope) DESC) AS row_number
    FROM
        settings
        JOIN (
            VALUES (${sql.join(
              [
                ...items.map(({ key, scope, fallbackScope }) =>
                  sql.join(
                    [
                      sql`${key}::ltree`, // key --> k
                      sql`${scope}::ltree`, // scope --> s
                      sql`${fallbackScope ?? ''}` // fallback scope --> f
                    ],
                    sql`,`
                  )
                )
              ],
              sql`), (`
            )})) AS scope_settings (sub_key, current_scope, fallback_scope) ON sub_key = key
                AND (scope @> current_scope OR scope = fallback_scope::ltree)) temp
WHERE
    row_number = 1;

`)
  if (!result) return undefined
  return result.map(row => ({
    ...row,
    value: JSON.parse(row.value)
  }))
}
