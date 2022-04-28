# @brickdoc/plugin-gcloud

This server plugin makes the Brickdoc server a first-class citizen in Google Cloud Platform.

## Features

All features needed your set `env.GCP_PROJECT` is your gcp project id.

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

### Cloud Debugger Integration

Cloud Debugger is a feature of Google Cloud Platform that lets you inspect the state of an application, at any code location, without stopping or slowing down the running app. Cloud Debugger makes it easier to view the application state without adding logging statements.

Set `env.GCP_ENABLED_CLOUD_DEBUGGER` to `true` to enable Cloud Debugger. See [Cloud Debugger Docs](https://cloud.google.com/debugger/docs) for more details.

### Cloud Profiler Integration

Cloud Profiler is a statistical, low-overhead profiler that continuously gathers CPU usage and memory-allocation information from your production applications. It attributes that information to the application's source code, helping you identify the parts of the application consuming the most resources, and otherwise illuminating the performance characteristics of the code.

Set `env.GCP_ENABLED_CLOUD_PROFILER` to `true` to enable Cloud Profiler. See [Cloud Profiler Docs](https://cloud.google.com/profiler/docs) for more details.
