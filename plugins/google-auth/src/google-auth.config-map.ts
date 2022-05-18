import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'
import { string } from 'yup'

@ConfigMap('plugin.brickdoc.google-auth')
export class GoogleAuthConfigMap {
  /**
   * GOOGLE CLIENT ID
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: string().required()
  })
  googleClientId: string = env.GOOGLE_CLIENT_ID!

  /**
   * GOOGLE CLIENT SECRET
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: string().required()
  })
  googleClientSecret: string = env.GOOGLE_CLIENT_SECRET!
}
