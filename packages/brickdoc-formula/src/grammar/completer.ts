import type { IToken } from 'chevrotain'
import { CodeFragment, Completion, ContextInterface, FormulaType, NamespaceId, VariableId } from '../types'
import { spreadsheetKey } from '../context'

export interface CompleteInput {
  readonly tokens: IToken[]
  readonly input: string
  readonly formulaContext?: ContextInterface
  readonly codeFragments: CodeFragment[]
  readonly namespaceId: NamespaceId
  readonly variableId: VariableId
  readonly cacheCompletions?: Completion[]
}

const matchTypeWeight = (type1: FormulaType, type2: FormulaType, weight: number): number => {
  if (type1 === type2) return weight + 250
  if (type2 === 'any') return weight + 125

  return weight
}

// TODO: https://github.com/Chevrotain/chevrotain/blob/master/examples/parser/content_assist/content_assist_complex.js
export const complete = ({
  input,
  tokens,
  formulaContext,
  namespaceId,
  codeFragments,
  variableId,
  cacheCompletions
}: CompleteInput): Completion[] => {
  let completions = cacheCompletions ?? formulaContext?.completions(namespaceId, variableId) ?? []
  const lastCodeFragment = codeFragments[codeFragments.length - 1]
  const lastToken = tokens[tokens.length - 1]
  // const lastToken = tokens[tokens.length - 1]
  if (!lastCodeFragment || !lastToken) {
    return completions
  }

  // console.log({ lastCodeFragment, lastToken })

  const { code, name } = lastCodeFragment
  const lowerCaseName = name.toLowerCase()
  const lastTokenText = lastToken.image

  // console.log({ name, code, input, lastCodeFragment, tokens, codeFragments, completions })

  if (code === 'Dot') {
    const last2CodeFragment = codeFragments[codeFragments.length - 2]
    if (last2CodeFragment) {
      completions = completions.map(c => {
        return c.kind === 'function' && c.preview.chain
          ? {
              ...c,
              value: `${c.value}()`,
              weight: matchTypeWeight(last2CodeFragment.type, c.preview.args[0].type, c.weight)
            }
          : c
      })

      if (last2CodeFragment.code === 'Spreadsheet') {
        completions = completions.map(c => {
          return c.kind === 'column' && c.preview.namespaceId === last2CodeFragment.namespaceId
            ? { ...c, weight: c.weight + 1000 }
            : c
        })
      }
    }
  }

  if (['GreaterThan', 'GreaterThanEqual', 'LessThan', 'LessThanEqual'].includes(code)) {
    completions = completions.map(c => {
      return c.kind === 'variable' && c.preview.t.variableValue.result.type === 'number'
        ? { ...c, weight: c.weight + 1000 }
        : c
    })
  }

  if (['other', 'NumberLiteral', 'Function'].includes(code)) {
    completions = completions.map(c => {
      const replacements = c.kind === 'column' ? [`${spreadsheetKey(c.preview.namespaceId)}.${name}`, name] : [name]

      if (c.name === name) {
        return { ...c, weight: c.weight + 1000, replacements: [...replacements, ...c.replacements] }
      }

      const cname = c.name.toLowerCase()
      if (cname === lowerCaseName) {
        return { ...c, weight: c.weight + 500, replacements: [...replacements, ...c.replacements] }
      }

      if (cname.startsWith(lowerCaseName)) {
        return { ...c, weight: c.weight + 100, replacements: [...replacements, ...c.replacements] }
      }

      if (cname.includes(lowerCaseName)) {
        return { ...c, weight: c.weight + 10, replacements: [...replacements, ...c.replacements] }
      }

      if (c.name === lastTokenText) {
        return { ...c, weight: c.weight + 1000, replacements: [...replacements, ...c.replacements] }
      }

      if (cname === lastTokenText) {
        return { ...c, weight: c.weight + 500, replacements: [...replacements, ...c.replacements] }
      }

      if (cname.startsWith(lastTokenText)) {
        return { ...c, weight: c.weight + 100, replacements: [...replacements, ...c.replacements] }
      }

      if (cname.includes(lastTokenText)) {
        return { ...c, weight: c.weight + 10, replacements: [...replacements, ...c.replacements] }
      }

      return c
    })
  }

  return completions.sort((a, b) => b.weight - a.weight)
}
