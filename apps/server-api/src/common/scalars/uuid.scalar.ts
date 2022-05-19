import { Kind, ValueNode } from 'graphql'
import { Scalar, CustomScalar } from '@nestjs/graphql'
import { isUUID } from '@brickdoc/active-support'

const validate = (value: any): string => {
  const valid = isUUID(value)

  if (!valid) {
    throw new TypeError(`Value is not a valid UUID: ${value}`)
  }

  return value
}

@Scalar('UUID', type => UUID)
export class UUID implements CustomScalar<string, string> {
  description =
    'A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.'

  serialize(value: unknown): string {
    return validate(value)
  }

  parseValue(value: unknown): string {
    return validate(value)
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`Can only validate strings as UUIDs but got a: ${ast.kind}`)
    }

    return validate(ast.value)
  }
}
