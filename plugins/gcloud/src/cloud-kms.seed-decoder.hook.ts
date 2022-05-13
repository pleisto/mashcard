import { env } from 'process'
import { KeyManagementServiceClient } from '@google-cloud/kms'
import { crc32c } from '@node-rs/crc32'
import { BaseSeedDecoder } from '@brickdoc/server-api/src/common/kms/seed-decoder/base.seed-decoder'
import { ServerPluginHook, HookType, HookProvider } from '@brickdoc/server-api/src/common/server-plugin'
import { BrickdocBaseError } from '@brickdoc/server-api/src/common/errors'
import { projectId } from './gcloud-plugin.utils'

@ServerPluginHook(HookType.COMMON_KMS_SEED_DECODER)
export class CloudKMSSeedDecoderHook extends BaseSeedDecoder implements HookProvider<HookType.COMMON_KMS_SEED_DECODER> {
  /**
   * Decode raw seed via base64
   */
  async seed(rawSeed: Buffer): Promise<string> {
    // compute ciphertext's CRC32C checksum.
    const cipherCrc32c = crc32c(rawSeed)
    const [decryptResponse] = await this.client().decrypt({
      name: this.frn(),
      ciphertext: rawSeed,
      ciphertextCrc32c: {
        value: cipherCrc32c
      }
    })

    const plaintext = decryptResponse.plaintext as string
    if (crc32c(plaintext) !== Number(decryptResponse.plaintextCrc32c?.value))
      throw new BrickdocBaseError(
        'plugin.brickdoc.gcloud.kmsDecoder.CRC32C_CHECKSUM_MISMATCH',
        'crc32c checksum mismatch'
      )
    return plaintext.toString()
  }

  /**
   * Get Google Cloud KMS's Key Full Resource Name from environment variable
   */
  private frn(): string {
    const frn = env.GCP_KMS_FRN
    if (frn === undefined)
      throw new BrickdocBaseError('plugin.brickdoc.gcloud.kmsDecoder.FRN_NOT_FOUND', 'env.GCP_KMS_FRN is not defined')

    return frn
  }

  private client(): KeyManagementServiceClient {
    return new KeyManagementServiceClient({
      projectId
    })
  }
}
