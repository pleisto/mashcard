import { CodeFragment, FunctionContext, OPERATOR_TYPES } from '../types'
import { parse } from './core'

interface FormatResult {
  readonly position: number
  readonly definition: string
}

const PREV_NEED_SPACE_CODES: Array<CodeFragment['code']> = [...OPERATOR_TYPES, 'LParen', 'LBracket', 'LBrace']
const NEXT_NEED_SPACE_CODES: Array<CodeFragment['code']> = [...OPERATOR_TYPES, 'RParen', 'RBracket', 'RBrace']

const maybeAddSpaceOrNewline = (
  { code: currCode, display: currDisplay }: CodeFragment,
  { code: nextCode }: CodeFragment
): string | undefined => {
  if (currCode === 'LParen' && nextCode === 'RParen') return undefined
  if (currCode === 'LBracket' && nextCode === 'RBracket') return undefined
  if (currCode === 'LBrace' && nextCode === 'RBrace') return undefined

  if (PREV_NEED_SPACE_CODES.includes(currCode)) return ' '
  if (NEXT_NEED_SPACE_CODES.includes(nextCode)) return ' '

  // `Not 1` vs `!1`
  if (currCode === 'Not' && currDisplay.toUpperCase() === 'NOT') return ' '

  // Comma
  if (currCode === 'Comma') return ' '

  // Semicolon
  if (currCode === 'Semicolon') return '\n'

  return undefined
}

const removeSpaceOrNewline = (codeFragments: CodeFragment[], position: number): [CodeFragment[], number] => {
  const prevCodeFragments: CodeFragment[] = []
  const newCodeFragments: CodeFragment[] = []

  let gap = 0

  codeFragments.forEach(codeFragment => {
    const prevLength = prevCodeFragments.map(i => i.display).join('').length
    prevCodeFragments.push(codeFragment)

    if (codeFragment.code !== 'Space') {
      newCodeFragments.push(codeFragment)
      return
    }

    if (prevLength >= position) return

    // if the space is before the position
    if (prevLength + codeFragment.display.length <= position) {
      gap += codeFragment.display.length
    } else {
      gap += position - prevLength
    }
  })

  return [newCodeFragments, position - gap]
}

const insertSpaceOrNewline = (codeFragments: CodeFragment[], position: number): [CodeFragment[], number] => {
  const prevCodeFragments: CodeFragment[] = []
  const newCodeFragments: CodeFragment[] = []
  let gap = 0

  codeFragments.forEach((codeFragment, index) => {
    prevCodeFragments.push(codeFragment)
    newCodeFragments.push(codeFragment)

    // Skip first equal
    if (index === 0 && codeFragment.code === 'Equal') return

    const next = codeFragments[index + 1]
    if (!next) return

    const spaceString = maybeAddSpaceOrNewline(codeFragment, next)
    if (!spaceString) return

    const prevLength = prevCodeFragments.map(i => i.display).join('').length
    newCodeFragments.push({ code: 'Space', display: spaceString, type: 'any', attrs: undefined, errors: [] })

    if (prevLength <= position) {
      gap += spaceString.length
    }
  })

  return [newCodeFragments, position + gap]
}

/**
 * Apply format to the formula.
 */
export const applyFormat = (ctx: FunctionContext): { format: FormatResult; minify: FormatResult } => {
  const {
    meta: { input: definition, position }
  } = ctx

  const {
    variableParseResult: { codeFragments, valid }
  } = parse(ctx)

  if (!valid) return { format: { position, definition }, minify: { position, definition } }

  // 1. remove old space or newline
  const [newCodeFragments, newPosition] = removeSpaceOrNewline(codeFragments, position)

  // 2. insert new space or newline
  const [newCodeFragments2, newPosition2] = insertSpaceOrNewline(newCodeFragments, newPosition)

  return {
    format: { position: newPosition2, definition: newCodeFragments2.map(c => c.display).join('') },
    minify: { position: newPosition, definition: newCodeFragments.map(c => c.display).join('') }
  }
}
