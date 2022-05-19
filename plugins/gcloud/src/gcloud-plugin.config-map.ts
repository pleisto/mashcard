import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'
import { safeJsonParse } from '@brickdoc/active-support'
import { string, boolean, object, InferType } from 'yup'

const blobAdaptorEnabled = env.BLOB_ADAPTOR === 'GCSStorageAdaptorHook'

const gcsBucketSchema = object({
  /**
   * Bucket Name
   */
  name: string().required(),
  /**
   * Use virtual hosted-style URLs ('https://mybucket.storage.googleapis.com/...') instead of path-style
   * ('https://storage.googleapis.com/mybucket/...'). Virtual hosted-style URLs should generally be preferred
   * instead of path-style URL. Currently defaults to false for path-style, although this may change in a future
   * major-version release.
   */
  virtualHostedStyle: boolean().default(false),
  /**
   * The cname for this bucket, i.e., "https://cdn.example.com".
   * See reference https://cloud.google.com/storage/docs/access-control/signed-urls#example
   */
  cname: string().url().optional()
})

export type GCSBucketOptions = InferType<typeof gcsBucketSchema>
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
  kmsFrn: string = env.GCP_KMS_FRN!

  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: blobAdaptorEnabled ? gcsBucketSchema : undefined
  })
  gcsPublicBucket: GCSBucketOptions = safeJsonParse(env.GCP_GCS_PUBLIC_BUCKET!).unwrapOr({})

  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: blobAdaptorEnabled ? gcsBucketSchema : undefined
  })
  gcsPrivateBucket: GCSBucketOptions = safeJsonParse(env.GCP_GCS_PRIVATE_BUCKET!).unwrapOr({})
}
