/**
 * Payload that keeped in session.
 */
export interface UserSession {
  /**
   * User's id.
   *
   * @type {number}
   */
  id: number

  /**
   * User's slug.
   *
   * @type {string}
   */
  slug: string
}

/**
 * Session key.
 */
export const SESSION_USER_KEY = 'user'
