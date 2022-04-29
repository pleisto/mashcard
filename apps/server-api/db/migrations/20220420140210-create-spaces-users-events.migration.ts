import { Migration } from '@slonik/migrator'

export const up: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  CREATE TABLE "accounts_users" (
    "id" SERIAL PRIMARY KEY,
    "locked_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "last_space_domain" CHARACTER VARYING
  );
  COMMENT ON COLUMN "accounts_users"."last_space_domain" IS 'Last visited domain';

  CREATE TABLE "accounts_providers" (
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "provider" CHARACTER VARYING NOT NULL,
    "uid" CHARACTER VARYING NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "locked_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
  );
  CREATE INDEX "accounts_providers_user_id_key" ON "accounts_providers" ("user_id");
  CREATE UNIQUE INDEX "accounts_providers_provider_uid_ukey" ON "accounts_providers" ("provider", "uid");
  COMMENT ON COLUMN "accounts_providers"."meta" IS 'Provider metadata';

  CREATE TABLE "accounts_members" (
    "id" SERIAL PRIMARY KEY,
    "space_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role" INTEGER NOT NULL,
    "state" INTEGER DEFAULT 0 NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
  );
  CREATE INDEX "accounts_members_user_id_key" ON "accounts_members" ("user_id");
  CREATE INDEX "accounts_members_space_id_key" ON "accounts_members" ("space_id");

  CREATE TABLE "spaces" (
    "id" SERIAL PRIMARY KEY,
    "owner_id" BIGINT NOT NULL,
    "locked_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "domain" CHARACTER VARYING(50) NOT NULL,
    "name" CHARACTER VARYING(50) NOT NULL,
    "bio" CHARACTER VARYING,
    "initialized" BOOLEAN NOT NULL DEFAULT FALSE,
    "personal" BOOLEAN NOT NULL DEFAULT FALSE,
    "invite_enable" BOOLEAN NOT NULL DEFAULT FALSE,
    "invite_secret" CHARACTER VARYING NOT NULL
  );
  CREATE INDEX "spaces_owner_id_key" ON "spaces" ("owner_id");
  CREATE UNIQUE INDEX "spaces_invite_secret_ukey" ON "spaces" ("invite_secret");
  CREATE UNIQUE INDEX "spaces_lower_domain_text_ukey" ON "spaces" USING btree (lower(("domain")::text));

  CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "space_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "state" INTEGER DEFAULT 0 NOT NULL,
    "kind" INTEGER NOT NULL,
    "key" CHARACTER VARYING NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
  );
  CREATE INDEX "events_user_id_key" ON "events" ("user_id");
  CREATE INDEX "events_space_id_kind_key_key" ON "events" ("space_id", "kind", "key");
  COMMENT ON COLUMN "events"."key" IS 'Key of event, used to index';
  `)
}

export const down: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  DROP TABLE IF EXISTS "accounts_users";
  DROP TABLE IF EXISTS "accounts_providers";
  DROP TABLE IF EXISTS "accounts_members";
  DROP TABLE IF EXISTS "spaces";
  DROP TABLE IF EXISTS "events";
  `)
}
