import { Migration } from '@slonik/migrator'

export const up: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
CREATE FUNCTION "settings_scope_priority"(scope ltree, fallback text default '', root text default 'root' ) RETURNS integer AS $$
BEGIN
  RETURN CASE scope::text
         WHEN 'root' THEN 0
         WHEN fallback THEN 1
         ELSE nlevel(scope)
         END;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION "settings_scope_priority" (scope ltree, fallback text, root text) IS
'Returns the priority of a scope. The root scope has the lowest priority.'
  `)
}

export const down: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`DROP FUNCTION IF EXISTS "settings_scope_priority"`)
}
