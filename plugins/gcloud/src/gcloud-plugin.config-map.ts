import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'
import { string } from 'yup'

@ConfigMap('plugin.brickdoc.gcloud')
export class CoreConfigMap {
  /**
   * Google cloud project id
   * @returns default value
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: string().required()
  })
  projectID: string = env.GCP_PROJECT!
}
