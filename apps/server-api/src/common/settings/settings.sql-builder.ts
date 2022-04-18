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
export const findSetting = async <T>(dbPool: DatabasePool, key: string, scope: string): Promise<T | undefined> => {
  const result = await dbPool.maybeOne<{ value: string; depth: number }>(sql`
SELECT
    value,
    nlevel (scope) AS depth
FROM
    settings
WHERE
    key = ${key}
    AND (scope @> ${scope})
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
  items: Array<{ key: string; scope: string }>
): Promise<Array<{ value: string; key: string }> | undefined> => {
  // use a window function to get the latest matching value for each key
  const result = await dbPool.many<{ value: string; key: string }>(sql`
SELECT
    *
FROM (
    SELECT
        key,
        value,
        row_number() OVER (PARTITION BY key ORDER BY nlevel (scope) DESC) AS row_number
    FROM
        settings
        JOIN (
            VALUES (${sql.join(
              [...items.map(({ key, scope }) => sql.join([sql`${key}::ltree`, sql`${scope}::ltree`], sql`,`))],
              sql`), (`
            )})) AS t (k, s) ON k = key
                AND (scope @> s)) temp
WHERE
    row_number = 1;

`)
  if (!result) return undefined
  return result.map(row => ({
    ...row,
    value: JSON.parse(row.value)
  }))
}
