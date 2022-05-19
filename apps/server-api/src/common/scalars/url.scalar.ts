import { Kind, ValueNode } from 'graphql'
import { Scalar, CustomScalar } from '@nestjs/graphql'
import { isUrl } from '@brickdoc/active-support'

const validate = (value: any): string => {
  const valid = isUrl(value)

  if (!valid) {
    throw new TypeError(`Value is not a valid URL: ${value}`)
  }

  return value
}

@Scalar('URL', type => URL)
export class URL implements CustomScalar<string, string> {
  description =
    'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt'

  serialize(value: unknown): string {
    return validate(value)
  }

  parseValue(value: unknown): string {
    return validate(value)
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`Can only validate strings as URLs but got a: ${ast.kind}`)
    }

    return validate(ast.value)
  }
}
