import { Migration } from '@slonik/migrator'

export const up: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  CREATE TABLE "event_logs" (
    "id" BIGSERIAL PRIMARY KEY,
    "actor_type" TEXT NOT NULL,
    "actor_id" TEXT,
    "event" LTREE NOT NULL,
    "context" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) WITH (fillfactor=95);
  CREATE INDEX "event_logs_actor_type_actor_id" ON "event_logs" ("actor_type", "actor_id");
  CREATE INDEX "event_logs_created_at" ON "event_logs" using brin("created_at");
  COMMENT ON TABLE "event_logs" IS 'event_logs is a generic event log table';
  COMMENT ON COLUMN "event_logs"."event" IS 'event name could has multiple levels, such as "user.create"';
  COMMENT ON COLUMN "event_logs"."actor_type" IS
    'actor_type is the type of the action trigger, such as user, background_job, etc.';
  COMMENT ON COLUMN "event_logs"."actor_id" IS 'actor_id is the identifier of the actor and can be null';
  `)
}

export const down: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`DROP TABLE IF EXISTS "event_logs";`)
}
