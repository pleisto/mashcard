import type { IToken } from 'chevrotain'
import { fetchResult } from '../context'
import { ColumnClass } from '../controls'
import { CodeFragment, Completion, FormulaType, FunctionContext } from '../types'
import { codeFragment2value, column2completion } from './convert'

export interface CompleteInput {
  readonly tokens: IToken[]
  readonly position: number
  readonly ctx: FunctionContext
  readonly codeFragments: CodeFragment[]
  readonly cacheCompletions?: Completion[]
}

const matchTypeWeight = (type1: FormulaType, type2: FormulaType, weight: number): number => {
  if (type1 === type2) return weight + 250
  if (type2 === 'any') return weight + 125

  return weight
}

// TODO: https://github.com/Chevrotain/chevrotain/blob/master/examples/parser/content_assist/content_assist_complex.js
export const complete = ({
  tokens,
  position,
  ctx: {
    formulaContext,
    meta: { namespaceId, variableId }
  },
  codeFragments,
  cacheCompletions
}: CompleteInput): Completion[] => {
  let completions = cacheCompletions ?? formulaContext.completions(namespaceId, variableId)
  let lastCodeFragment: CodeFragment | undefined = codeFragments[codeFragments.length - 1]
  const inputs: CodeFragment[] = []

  codeFragments.every(codeFragment => {
    inputs.push(codeFragment)
    if (inputs.map(i => i.display).join('').length <= position) {
      return true
    }

    return false
  })

  let extraSpaces = ''

  inputs.reverse().every(codeFragment => {
    if (codeFragment.code === 'Space') {
      extraSpaces = extraSpaces.concat(codeFragment.display)
      return true
    }

    lastCodeFragment = { ...codeFragment, display: codeFragment.display.concat(extraSpaces) }
    return false
  })

  // console.log('completion', { lastCodeFragment, position, inputs, tokens, codeFragments, completions })

  if (!lastCodeFragment) {
    return completions
  }

  const { code } = lastCodeFragment
  const value = codeFragment2value(lastCodeFragment, namespaceId)
  const tokenLowerCase = value.toLowerCase()
  // const lastTokenText = lastToken.image

  if (code === 'Dot') {
    const last2CodeFragment = codeFragments[codeFragments.length - 2]
    if (last2CodeFragment) {
      completions = completions.map(c => {
        return c.kind === 'function' && c.preview.chain
          ? {
              ...c,
              weight: matchTypeWeight(last2CodeFragment.type, c.preview.args[0].type, c.weight)
            }
          : c
      })

      switch (last2CodeFragment.type) {
        case 'Spreadsheet':
          // eslint-disable-next-line no-case-declarations
          const spreadsheet = formulaContext.findSpreadsheet({
            namespaceId: last2CodeFragment.attrs!.namespaceId,
            type: 'id',
            value: last2CodeFragment.attrs!.id
          })
          if (spreadsheet) {
            const columnCompletions = spreadsheet.listColumns().map(column =>
              column2completion(
                new ColumnClass(spreadsheet, column, false, {
                  namespaceId: spreadsheet.namespaceId,
                  type: 'id',
                  value: column.columnId
                }),
                namespaceId
              )
            )

            completions.push(...columnCompletions)
          }
          break
        case 'Block':
          completions = completions.map(c => {
            return c.kind === 'variable' && c.preview.t.namespaceId === last2CodeFragment.attrs?.id
              ? { ...c, weight: c.weight + 1000 }
              : c
          })
          break
      }
    }
  }

  if (['GreaterThan', 'GreaterThanEqual', 'LessThan', 'LessThanEqual'].includes(code)) {
    completions = completions.map(c => {
      return c.kind === 'variable' && fetchResult(c.preview.t).type === 'number' ? { ...c, weight: c.weight + 1000 } : c
    })
  }

  if (['FunctionName', 'Function'].includes(code)) {
    completions = completions.map(c => {
      const replacements: string[] = []

      if (c.name === value) {
        return { ...c, weight: c.weight + 1000, replacements: [...replacements, ...c.replacements] }
      }

      const completionNameLowerCase = c.name.toLowerCase()
      if (completionNameLowerCase === tokenLowerCase) {
        return { ...c, weight: c.weight + 500, replacements: [...replacements, ...c.replacements] }
      }

      if (completionNameLowerCase.startsWith(tokenLowerCase)) {
        return { ...c, weight: c.weight + 100, replacements: [...replacements, ...c.replacements] }
      }

      if (completionNameLowerCase.includes(tokenLowerCase)) {
        return { ...c, weight: c.weight + 10, replacements: [...replacements, ...c.replacements] }
      }

      return c
    })
  }

  return completions.sort((a, b) => b.weight - a.weight)
}
