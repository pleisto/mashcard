/**
 * General Error Code
 * This values are based on HTTP status code
 */
export enum ErrorCode {
  BAD_USER_INPUT = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  /**
   * e.g. Resource already exists or read-modify-write conflict
   */
  CONFLICT = 409,
  /**
   * Either out of resource quota or reaching rate limiting
   */
  RESOURCE_EXHAUSTED = 429,
  INTERNAL_SERVER_ERROR = 500,
  UNAVAILABLE = 503
}
