import { DatabasePool, sql, values, assignment, withResultType } from '@brickdoc/nestjs-slonik'
import { Result, ok } from '@brickdoc/active-support'

/**
 * create or update a setting value on the database
 */
export const createOrUpdateSetting = async (
  dbPool: DatabasePool,
  key: string,
  value: any,
  scope: string
): Promise<Result<null, Error>> => {
  const timestampz = new Date().toISOString()

  const updatedValues = {
    value: sql.jsonb(value),
    updated_at: timestampz
  }

  const insertValues = {
    key: sql`${key}::ltree`,
    value: updatedValues.value,
    scope: sql`${scope}::ltree`,
    created_at: timestampz,
    updated_at: updatedValues.updated_at
  }

  const result = await withResultType(dbPool).any(sql`
INSERT Into settings (key, value, scope, created_at, updated_at)
    VALUES (${values.fromObject(insertValues)})
ON CONFLICT (key, scope)
    DO UPDATE SET
        ${assignment.fromObject(updatedValues)}
`)

  return result.andThen(() => ok(null))
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
): Promise<Result<T | null, Error>> => {
  const priority = fallbackScope
    ? sql`settings_scope_priority(scope,${fallbackScope})`
    : sql`settings_scope_priority(scope)`

  const findScope = fallbackScope
    ? // with fallback scope
      sql`( (scope @> ${scope}) OR scope = ${fallbackScope} )`
    : // without fallback scope
      sql`scope @> ${scope}`

  const result = await withResultType(dbPool).maybeOne<{ value: string }>(sql`
SELECT
    value,
    ${priority} AS depth
FROM
    settings
WHERE
    key = ${key}
    AND ${findScope}
ORDER BY
    depth DESC
LIMIT 1
`)

  return result.andThen(data => ok(data?.value as unknown as T | null))
}

/**
 * find multiple settings by keys and scope
 */
export const findSettings = async (
  dbPool: DatabasePool,
  items: Array<{ key: string; scope: string; fallbackScope?: string }>
): Promise<Result<Array<{ value: any; key: string }>, Error>> => {
  // use a window function to get the latest matching value for each key
  const result = await withResultType(dbPool).any<{ value: string; key: string }>(sql`
SELECT
    *
FROM (
    SELECT
        key,
        value,
        row_number() OVER (PARTITION BY key ORDER BY settings_scope_priority (scope, fallback_scope) DESC) AS row_number
    FROM
        settings
        JOIN (
            VALUES ${values.fromObject(
              items.map(
                ({ key, scope, fallbackScope }) =>
                  sql`(${values.fromObject({
                    key: sql`${key}::ltree`,
                    scope: sql`${scope}::ltree`,
                    fallbackScope: fallbackScope ?? ''
                  })})`
              )
            )}) AS scope_settings (sub_key, current_scope, fallback_scope) ON sub_key = key
                AND (scope @> current_scope
                    OR scope = fallback_scope::ltree)) temp
WHERE
    row_number = 1;

`)
  return result as Result<Array<{ value: any; key: string }>, Error>
}
