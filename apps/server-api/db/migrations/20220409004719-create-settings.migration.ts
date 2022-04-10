import { Migration } from '@slonik/migrator'

export const up: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  CREATE EXTENSION IF NOT EXISTS "ltree";
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  CREATE TABLE "settings" (
    "id" SERIAL PRIMARY KEY,
    "key" LTREE NOT NULL,
    "value" JSONB,
    "scope" LTREE NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
  );
  CREATE UNIQUE INDEX "settings_key_scope_ukey"
   ON "settings" ("key", "scope");
  COMMENT ON COLUMN "settings"."key" IS 'Settings key with namespace';
  COMMENT ON COLUMN "settings"."scope" IS 'Scope of application of key. format: {spaceId}.{userId}';
  `)
}

export const down: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  DROP TABLE "settings";
  DROP EXTENSION IF EXISTS "ltree";
  DROP EXTENSION IF EXISTS "pgcrypto";
  `)
}
