import { Rule, url, apply, applyTemplates, chain, mergeWith, MergeStrategy, move } from '@brickdoc/schematics'
import { Buffer } from 'buffer'
import { tmpdir } from 'os'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { env } from 'process'
import selfsigned from 'selfsigned'
import { isNonEmptyString } from '@brickdoc/active-support'
import { generateKey } from '@brickdoc/server-api-crate'
import { Schema as ComponentOptions } from './schema'

export function dotenv(options: ComponentOptions): Rule {
  const defaultPgUrl = env.DATABASE_URL_BASE ?? 'postgres://localhost:5432'
  const defaultRedisUrl = env.REDIS_URL ?? 'redis://localhost:6379'
  const [selfSignedCertificate, selfSignedPrivateKey] = getSelfSignedCert()
  return chain([
    (): Rule =>
      mergeWith(
        apply(url('./files'), [
          applyTemplates({
            dbUrlBase: options.dbUrlBase?.startsWith('postgres') ? formatDbUrlBase(options.dbUrlBase) : defaultPgUrl,
            redisUrl: options.redisUrl?.startsWith('redis') ? options.redisUrl : defaultRedisUrl,
            secretSeed: process.env.SECRET_KEY_SEED ?? generateSeed(),
            selfSignedCertificate,
            selfSignedPrivateKey
          }),
          move('/')
        ]),
        MergeStrategy.Overwrite
      )
  ])
}

/**
 * Generate a base64 encoded secret key seed
 * @returns
 */
function generateSeed(): string {
  return `PlainSeedDecoder:${Buffer.from(generateKey()).toString('base64')}`
}

/**
 * Format a database url and remove the database name
 * @param url
 * @returns
 */
function formatDbUrlBase(url: string): string {
  const uri = new URL(url)
  const pgProtocol = uri.protocol
  // Since WHATWG URL Standard does not support the postgres protocol,
  // We need to use some hacky methods to parse the url.
  uri.protocol = 'https:'
  uri.pathname = ''
  uri.protocol = pgProtocol
  // return base uri without trailing slash
  return uri.toString().replace(/\/$/, '')
}

/**
 * Generate a self signed certificate for development if not already present
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getSelfSignedCert(): [cert: string, key: string] {
  if (isNonEmptyString(env.SELF_SIGNED_CERTIFICATE_FOR_DEV) && isNonEmptyString(env.SELF_SIGNED_PRIVATE_KEY_FOR_DEV)) {
    return [env.SELF_SIGNED_CERTIFICATE_FOR_DEV, env.SELF_SIGNED_PRIVATE_KEY_FOR_DEV]
  }

  /**
   * IETF RFC 5280 4.2.1.6 Subject Alternative Name
   * https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6
   */
  enum SubjectAltNameType {
    OTHER_NAME = 0,
    RFC822_NAME = 1,
    DNS_NAME = 2,
    X400_ADDRESS = 3,
    DIRECTORY_NAME = 4,
    EDIRECTORY_NAME = 5,
    URI = 6,
    IP = 7,
    REGISTERED_ID = 8
  }

  const certificate = selfsigned.generate(
    [
      {
        name: 'commonName',
        value: 'Self Signed Certificate for Brickdoc local development'
      },
      {
        name: 'countryName',
        value: 'SG'
      },
      {
        name: 'organizationName',
        value: 'Brickdoc Open Source'
      },
      {
        shortName: 'ST',
        value: 'Singapore'
      }
    ],
    {
      extensions: [
        {
          name: 'basicConstraints',
          cA: true
        },
        {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        },
        {
          name: 'subjectAltName',
          altNames: [
            {
              type: SubjectAltNameType.DNS_NAME,
              value: 'localhost'
            },
            {
              type: SubjectAltNameType.DNS_NAME,
              value: '*.localhost'
            },
            {
              type: SubjectAltNameType.DNS_NAME,
              value: 'brickdoc.local'
            },
            {
              type: SubjectAltNameType.DNS_NAME,
              value: '*.brickdoc.local'
            },
            {
              type: SubjectAltNameType.DNS_NAME,
              value: 'dev.brickdoc'
            },
            {
              type: SubjectAltNameType.DNS_NAME,
              value: '*.dev.brickdoc'
            }
          ]
        }
      ]
    }
  )
  const certPath = join(tmpdir(), `brickdoc-self-signed-${Date.now()}.pem`)
  writeFileSync(certPath, certificate.cert)
  console.log(
    `
Generated self signed certificate at ${certPath}. \n
Run "sudo security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain-db ${certPath}"
to add to keychain in macOS.`
  )
  return [certificate.cert.replace(/(\r\n|\n|\r)/gm, '\\n'), certificate.private.replace(/(\r\n|\n|\r)/gm, '\\n')]
}
