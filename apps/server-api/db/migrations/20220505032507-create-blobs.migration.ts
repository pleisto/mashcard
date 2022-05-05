import { Migration } from '@slonik/migrator'

export const up: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`
  CREATE TYPE blob_bucket AS ENUM ('public_read', 'private_attachment');
  CREATE TABLE "blobs" (
    "id" BIGSERIAL PRIMARY KEY,
    "pod_id" BIGINT NOT NULL,
    "cid" TEXT NOT NULL,
    "bucket" blob_bucket NOT NULL,
    "mime_type" TEXT NOT NULL DEFAULT 'application/octet-stream',
    "metadata" JSONB NOT NULL DEFAULT '{"analyzed": false}'::jsonb,
    "byte_size" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE UNIQUE INDEX "blobs_pod_id_cid_bucket_ukey" ON "blobs" ("pod_id", "cid", "bucket");
  CREATE INDEX "blobs_metadata" ON "blobs" USING GIN("metadata");

  COMMENT ON TABLE "blobs" IS 'blobs is a table for uploaded files metadata';
  COMMENT ON COLUMN "blobs"."pod_id" IS 'associated with a pod';
  COMMENT ON COLUMN "blobs"."cid" IS
    'cid is the unique content id of the file. It is compatible with IPFS CIDv1 spec.
    Multihash is blake3(mime_type:byte_size:md5_checksum)';
  `)
}

export const down: Migration = async ({ context: { connection, sql } }) => {
  await connection.query(sql`DROP TABLE IF EXISTS "blobs";`)
}
