import { Migration } from '@slonik/migrator'

export const up: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  CREATE TYPE pod_type AS ENUM ('user', 'space');

  CREATE TABLE "pods" (
    "type" pod_type NOT NULL,
    "id" BIGSERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_url" TEXT,
    "locked_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "user_is_initialized" BOOLEAN NOT NULL DEFAULT FALSE,
    "space_owner_id" BIGINT NOT NULL,
    "space_is_invite_enabled" BOOLEAN NOT NULL DEFAULT FALSE,
    "space_invite_secret" TEXT,
    CONSTRAINT pods_owner_id_fkey FOREIGN KEY(space_owner_id) REFERENCES pods(id) ON DELETE RESTRICT
  );
  CREATE UNIQUE INDEX "pods_lower_slug_text_ukey" ON "pods" (lower(("slug")::text));
  CREATE UNIQUE INDEX "pods_space_invite_secret_ukey" ON "pods" ("space_invite_secret");
  COMMENT ON TABLE "pods" IS
  'A data pod is a place for storing documents, with mechanisms for controlling who can access what.
  In Brickdoc, pods is an abstract table used to represent tenants, which can be either users or spaces';
  COMMENT ON CONSTRAINT "pods_owner_id_fkey" ON "pods" IS 'deleting a user will fail if the user is the owner of any space';

  CREATE VIEW "v_users" AS SELECT
    id, slug, name, bio, type, avatar_url, locked_at, created_at, updated_at,user_is_initialized as "is_initialized"
    FROM pods WHERE type = 'user' WITH LOCAL CHECK OPTION;
  COMMENT ON VIEW "v_users" IS 'v_users is a updatable database view of user pod.';

  CREATE VIEW "v_spaces" AS SELECT
    id, slug, name, bio, type, avatar_url, locked_at, created_at, updated_at, space_owner_id as "owner_id",
    space_is_invite_enabled as "is_invite_enabled", space_invite_secret as "invite_secret"
    FROM pods WHERE type = 'space' WITH LOCAL CHECK OPTION;
  COMMENT ON VIEW "v_spaces" IS 'v_spaces is a updatable database view of space pod.';

  CREATE TABLE "pod_access_credentials" (
    "id" BIGSERIAL PRIMARY KEY,
    "pod_type" pod_type NOT NULL,
    "pod_id" BIGINT NOT NULL,
    "provider" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    CONSTRAINT pod_access_credentials_pod_id_fk FOREIGN KEY(pod_id) REFERENCES pods(id) ON DELETE CASCADE
  );
  CREATE UNIQUE INDEX "pod_access_credentials_provider_subject_ukey" ON
   "pod_access_credentials" ("provider", "subject");

  COMMENT ON TABLE "pod_access_credentials" IS
    'pod_access_credentials stores user authentication providers, and it is will delete cascade on user deletion';
  COMMENT ON COLUMN "pod_access_credentials"."provider" IS
    'provider is the identity provider, such as google, WebAuthn, etc.';
  COMMENT ON COLUMN "pod_access_credentials"."subject" IS
   'subject is the unique identifier of the user in the provider';
  COMMENT ON COLUMN "pod_access_credentials"."meta" IS
    'meta is a JSON object that contains extra information about the user in the provider';

  CREATE TABLE "spaces_members" (
    "id" BIGSERIAL PRIMARY KEY,
    "space_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role" INTEGER NOT NULL,
    "state" INTEGER DEFAULT 0 NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    CONSTRAINT spaces_members_space_id_fk FOREIGN KEY(space_id) REFERENCES pods(id) ON DELETE CASCADE,
    CONSTRAINT spaces_members_user_id_fk FOREIGN KEY(user_id) REFERENCES pods(id) ON DELETE CASCADE
  );
  COMMENT ON TABLE "spaces_members" IS 'spaces_members will delete cascade on space or user deletion';
  `)
}

export const down: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  DROP VIEW IF EXISTS "v_users";
  DROP VIEW IF EXISTS "v_spaces";
  DROP TABLE IF EXISTS "pod_access_credentials";
  DROP TABLE IF EXISTS "spaces_members";
  DROP TABLE IF EXISTS "pods";
  DROP TYPE IF EXISTS "pod_type";
  `)
}
