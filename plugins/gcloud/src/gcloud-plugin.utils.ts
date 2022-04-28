import { env } from 'process'

/**
 * return settings key with current namespace
 */
export const withNamespace = (key: string): string => `plugin.brickdoc.gcloud.${key}`

/**
 * GCP Service Context
 *
 * Identifies the context of the running service -
 * [ServiceContext](https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext).
 * This information is utilized in the UI to identify all the running
 * instances of your service. This is discovered automatically when your
 * application is running on Google Cloud Platform. You may optionally
 * choose to provide this information yourself to identify your service
 * differently from the default mechanism.
 */
export const serviceContext = {
  service: env.HELM_RELEASE_NAME ?? `brickdoc-${env.NODE_ENV ?? 'development'}`,
  version: env.VERSION
}

/**
 * projectID is LOCAL_STATIC Item in GcloudConfigMap,
 * so could get it from process.env directly.
 */
export const projectId = env.GCP_PROJECT!
