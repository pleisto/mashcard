import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'
import { string, boolean } from 'yup'

@ConfigMap('plugin.brickdoc.gcloud')
export class GcloudConfigMap {
  /**
   * Google cloud project id
   * @returns default value
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: string().required()
  })
  projectId: string = env.GCP_PROJECT!

  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: boolean()
  })
  enabledCloudProfiler: boolean = !!env.GCP_ENABLED_CLOUD_PROFILER

  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: boolean()
  })
  enabledCloudDebugger: boolean = !!env.GCP_ENABLED_CLOUD_DEBUGGER

  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: string()
  })
  kmsFrn: string | undefined = env.GCP_KMS_FRN
}
