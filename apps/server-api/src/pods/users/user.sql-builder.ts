import { DatabasePool, sql, withResultType } from '@brickdoc/nestjs-slonik'
import { Result } from '@brickdoc/active-support'
import { PodAccessCredentialSchema, UserCredentialInput } from './user.interface'
import { User } from './user.model'
import { genSlug } from '@brickdoc/server-api-crate'

/**
 * Find credential by `provider` and `subject`
 */
export const findCredential = async (
  dbPool: DatabasePool,
  provider: string,
  subject: string
): Promise<Result<null | PodAccessCredentialSchema, Error>> => {
  return await withResultType(dbPool).maybeOne(sql<PodAccessCredentialSchema>`
SELECT
    pod_type "podType",
    pod_id "podId",
    provider,
    subject,
    meta
FROM
    pod_access_credentials
WHERE
    provider = ${provider}
    AND subject = ${subject}
LIMIT 1
`)
}

/**
 * Find user by `id`
 */
export const findUserById = async (dbPool: DatabasePool, podId: number): Promise<Result<User, Error>> => {
  return await withResultType(dbPool).one(sql<User>`
SELECT
    id,
    slug,
    name,
    bio,
    avatar_url "avatarUrl",
    locked_at::timestamp "lockedAt",
    created_at::timestamp "createdAt",
    updated_at::timestamp "updatedAt",
    is_initialized "isInitialized"
FROM
    v_users
WHERE
    id = ${podId}
LIMIT 1
`)
}

/**
 * Find user by `slug`
 */
export const findUserBySlug = async (dbPool: DatabasePool, slug: string): Promise<Result<User, Error>> => {
  return await withResultType(dbPool).one(sql<User>`
SELECT
    id,
    slug,
    name,
    bio,
    avatar_url "avatarUrl",
    locked_at::timestamp "lockedAt",
    created_at::timestamp "createdAt",
    updated_at::timestamp "updatedAt",
    is_initialized "isInitialized"
FROM
    v_users
WHERE
    slug = ${slug}
LIMIT 1
`)
}

/**
 * Create user by credential.
 *
 * Use `alternative` slug if `preferred` exist.
 */
export const createUserByCredential = async (
  dbPool: DatabasePool,
  { name, bio, avatarUrl, provider, subject, meta }: UserCredentialInput
): Promise<Result<User, Error>> => {
  const [preferred, alternative] = genSlug(name)

  return await withResultType(dbPool).transaction(async t => {
    const user = await t.one(sql<User>`
INSERT INTO v_users (slug, name, type, bio, avatar_url, created_at, updated_at)
    VALUES ((
            CASE WHEN EXISTS (
                SELECT
                    1
                FROM
                    pods
                WHERE
                    pods.slug = ${preferred}) THEN
                ${alternative}
            else
                ${preferred}
            end),
        ${name},
        'user',
        ${bio},
        ${avatarUrl},
        NOW(),
        NOW())
RETURNING
    id,
    slug,
    name,
    bio,
    avatar_url "avatarUrl",
    locked_at::timestamp "lockedAt",
    created_at::timestamp "createdAt",
    updated_at::timestamp "updatedAt",
    is_initialized "isInitialized"
`)
    await t.query(sql`
INSERT INTO pod_access_credentials (pod_id, pod_type, provider, subject, meta, created_at, updated_at)
    VALUES (${user.id}, 'user', ${provider}, ${subject}, ${sql.jsonb(meta)}, NOW(), NOW())
`)

    return user
  })
}
