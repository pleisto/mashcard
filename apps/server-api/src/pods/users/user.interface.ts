/**
 * User credential for login.
 */
export interface UserCredentialInput<T = Record<string, any>> {
  provider: string
  subject: string
  name: string
  avatarUrl: string | null
  bio: string | null
  locale: string | null
  meta: T
}

/**
 * Pod access credential schema.
 */
export interface PodAccessCredentialSchema<T = Record<string, any>> {
  /**
   * podType. `space` or `user`
   *
   * @type {string}
   */
  podType: string

  /**
   * podId.
   */
  podId: number
  provider: string
  subject: string

  /**
   * Metadata
   */
  meta: T
}

/**
 * Api path for auth redirect.
 */
export const AUTH_REDIRECT_PATH = '/.internal-apis/accounts/profile'
