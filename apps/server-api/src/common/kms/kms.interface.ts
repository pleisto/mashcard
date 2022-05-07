export enum SecretSubKey {
  ROOT_KEY = 0,
  HASH_SALT = 1,
  DATA_ENCRYPTION = 2,
  SECURE_COOKIE = 3,
  INT_ID_OBFUSCATION = 4
}

export const KMS_MODULE_OPTIONS = Symbol('KMS_MODULE_OPTIONS')
export const KMS_ROOT_SECRET_KEY = Symbol('KMS_ROOT_SECRET_KEY')

export interface KMSModuleOptions {
  /**
   * Secret key seed. {seedName}:{base64-encoded-seed}
   * @example 'plain:MTIz=='
   */
  seed: string
}
