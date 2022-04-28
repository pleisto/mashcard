import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '../common/settings'
import { string, mixed } from 'yup'
import { supportLocales } from './locales'
import { supportedTimezones } from './timezones'

@ConfigMap('core')
export class CoreConfigMap {
  /**
   * Application environment
   */
  @Item({ scope: ScopeLookupStrategy.LOCAL_STATIC, clientExposed: true })
  appEnv?: string = env.NODE_ENV!

  /**
   * Application base URL, it's used to generate links in emails or other places
   */
  @Item({ clientExposed: true, validation: string().url() })
  appUrl: string = env.SERVER_BASE_URL ?? 'http://example.com/'

  /**
   * Enable https support
   * If enabled, the session cookies will be set to secure flag
   * @returns default value
   */
  @Item({})
  tlsEnabled: boolean = env.NODE_ENV === 'production'

  /**
   * Default language
   */
  @Item({
    clientExposed: true,
    scope: ScopeLookupStrategy.USER_BASED,
    validation: mixed().oneOf(supportLocales.map(l => l.tag))
  })
  defaultLanguage: string = 'en-US'

  /**
   * Default timezone
   */
  @Item({
    clientExposed: true,
    scope: ScopeLookupStrategy.USER_BASED,
    validation: mixed().oneOf(supportedTimezones)
  })
  defaultTimezone: string = 'Etc/UTC'
}
