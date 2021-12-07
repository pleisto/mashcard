import type { IToken } from 'chevrotain'
import type { CodeFragment, Completion, ContextInterface, NamespaceId } from '..'

export interface CompleteInput {
  readonly tokens: IToken[]
  readonly formulaContext: ContextInterface
  readonly namespaceId: NamespaceId
  readonly codeFragments: CodeFragment[]
}

// TODO: https://github.com/Chevrotain/chevrotain/blob/master/examples/parser/content_assist/content_assist_complex.js
export const complete = ({ tokens, formulaContext, namespaceId, codeFragments }: CompleteInput): Completion[] => {
  const completions = formulaContext.completions(namespaceId)
  const lastToken = tokens[tokens.length - 1]
  if (!lastToken) {
    return completions
  }
  const {
    tokenType: { name: tokenName },
    image
  } = lastToken

  const checkImage = image.toLowerCase()

  if (!['FunctionGroupName', 'FunctionName', 'NumberLiteral'].includes(tokenName)) {
    return completions
  }

  return completions
    .map(c => {
      const name = c.name.toLowerCase()
      if (name === checkImage) {
        return { ...c, weight: c.weight + 1000 }
      }

      if (name.startsWith(checkImage)) {
        return { ...c, weight: c.weight + 100 }
      }

      if (name.includes(checkImage)) {
        return { ...c, weight: c.weight + 10 }
      }

      return c
    })
    .sort((a, b) => b.weight - a.weight)
}
