import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import { KMSService, SecretSubKey } from '../kms'
import { intDecrypt, intEncrypt } from '@brickdoc/server-api-crate'

@Scalar('HashedID', type => HashedID)
export class HashedID implements CustomScalar<string, number> {
  constructor(private readonly kms: KMSService) {}
  description = 'Hashed IntID Scalar'

  parseValue(value: unknown): number {
    return intDecrypt(value as string, this.key())
  }

  serialize(value: unknown): string {
    return intEncrypt(value as number, this.key())
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind !== Kind.STRING) {
      throw new Error('Only strings can be parsed as HashID')
    }
    return this.parseValue(ast.value)
  }

  private key(): string {
    return this.kms.subKey(SecretSubKey.INT_ID_OBFUSCATION)
  }
}
