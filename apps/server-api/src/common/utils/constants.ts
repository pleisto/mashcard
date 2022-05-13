import { join } from 'path'
import { env } from 'process'

export const SERVER_SRC_ROOT = join(__dirname, '..', '..')
export const MONOREPO_ROOT = join(SERVER_SRC_ROOT, '..', '..', '..')

export const IS_DEV_MODE = env.NODE_ENV === 'development'
export const IS_PROD_MODE = env.NODE_ENV === 'production'
export const IS_TEST_MODE = env.NODE_ENV === 'test'
