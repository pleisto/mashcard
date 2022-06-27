import { CodeFragment, FunctionContext, OPERATOR_TYPES } from '../types'
import { parse } from './core'

interface FormatResult {
  readonly position: number
  readonly definition: string
}

const PREV_NEED_SPACE_CODES: Array<CodeFragment['code']> = [...OPERATOR_TYPES, 'LParen', 'LBracket', 'LBrace']
const NEXT_NEED_SPACE_CODES: Array<CodeFragment['code']> = [...OPERATOR_TYPES, 'RParen', 'RBracket', 'RBrace']

const maybeInnerAddSpaceOrNewline = (
  curr: CodeFragment,
  next: CodeFragment
): [undefined, undefined] | [string, CodeFragment] => {
  const { code: currCode, display: currDisplay } = curr
  const { code: nextCode } = next
  if (currCode === 'LParen' && nextCode === 'RParen') return [undefined, undefined]
  if (currCode === 'LBracket' && nextCode === 'RBracket') return [undefined, undefined]
  if (currCode === 'LBrace' && nextCode === 'RBrace') return [undefined, undefined]

  if (PREV_NEED_SPACE_CODES.includes(currCode)) return [' ', curr]
  if (NEXT_NEED_SPACE_CODES.includes(nextCode)) return [' ', next]

  // `Not 1` vs `!1`
  if (currCode === 'Not' && currDisplay.toUpperCase() === 'NOT') return [' ', curr]

  // Comma
  if (currCode === 'Comma') {
    return [' ', curr]
  }

  // Semicolon
  if (currCode === 'Semicolon') return ['\n', curr]

  return [undefined, undefined]
}

const maybeAddSpaceOrNewline = (
  curr: CodeFragment,
  index: number,
  codeFragments: CodeFragment[]
): string | undefined => {
  // Skip first equal
  if (index === 0 && curr.code === 'Equal') return

  const next = codeFragments[index + 1]
  if (!next) return undefined

  const [str, codeFragment] = maybeInnerAddSpaceOrNewline(curr, next)
  if (!str) return undefined

  if (codeFragment.meta?.args) {
    return codeFragment.meta?.endCode === codeFragment.code ? '\n' : '\n  '
  }

  return str
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

    const spaceString = maybeAddSpaceOrNewline(codeFragment, index, codeFragments)
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
