# @brickdoc/plugin-gcloud

This server plugin makes the Brickdoc server a first-class citizen in Google Cloud Platform.

## Features

All features needed your set `env.GCP_PROJECT` is your gcp project id. And you can set `env.GOOGLE_APPLICATION_CREDENTIALS`
to manually set the path to your gcp credentials.

### Cloud Storage Adapter

[Cloud storage](https://cloud.google.com/storage) is a s3-like object storage service, your could use it as a storage adapter in Brickdoc server.

Set `env.BLOB_ADAPTOR="GCSStorageAdaptorHook"` to enabled this feature. Next you also need to set the GCS Bucket options in `env.GCP_GCS_PUBLIC_BUCKET` and `env.GCP_GCS_PRIVATE_BUCKET`. The values of these options should be the JSON string of the following schema:

```ts
object({
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
```

For example, you dotenv file could be:

```dotenv
ENABLED_SERVER_PLUGINS="brickdoc.gcloud,${other-plugins}"
BLOB_ADAPTOR="GCSStorageAdaptorHook"
GCP_PROJECT="foo"
GCP_GCS_PUBLIC_BUCKET="{"name":"$public","cname":"https://public.cdn.example.com"}"
GCP_GCS_PRIVATE_BUCKET="{"name":"$private","virtualHostedStyle":true}"
```

### Cloud KMS encryption of secrets key seeds

Brickdoc use secrets key seeds to derivate the keys. And, you can encrypt the secrets key seeds with Cloud KMS to enure the security in production.

Set `env.GCP_KMS_FRN` to the Cloud KMS keyring full name and update `env.SECRET_KEY_SEED` to `CloudKMSDecoderHook.${BASED64_ENCODED_CIPHER_TEXT}` to enabled.

Tips: your could follow above steps to generate BASED64_ENCODED_CIPHER_TEXT:

```bash
openssl rand -hex 32 > seed.txt
gcloud kms encrypt --plaintext-file=seed.txt --ciphertext-file=seed.txt.enc --keyring=KEYRING --key=KEY --location=LOCATION --project=PROJECT
rm seed.txt
cat seed.txt.enc | base64 -w0
```

### Cloud Profiler Integration

Cloud Profiler is a statistical, low-overhead profiler that continuously gathers CPU usage and memory-allocation information from your production applications. It attributes that information to the application's source code, helping you identify the parts of the application consuming the most resources, and otherwise illuminating the performance characteristics of the code.

Set `env.GCP_ENABLED_CLOUD_PROFILER` to `true` to enable Cloud Profiler. See [Cloud Profiler Docs](https://cloud.google.com/profiler/docs) for more details.
