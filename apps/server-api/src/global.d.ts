declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production'
      SELF_SIGNED_CERTIFICATE_FOR_DEV: string
      SELF_SIGNED_PRIVATE_KEY_FOR_DEV: string
      REDIS_URL: string
      SECRET_KEY_SEED: string
      DATABASE_URL_BASE: string
      DATABASE_NAME: string
    }
  }
}

export {}
