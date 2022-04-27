import { checkValidName, FormulaLexer, FUNCTION_NAME_REGEX, TOKEN_SUFFIX_PATTERN } from '../lexer'

const SPECIAL_INVALID_CHARS = [...'()[]{}!@#$%^&*-+=|\\:;\'"<>,./?`~', ' ', '\t', '\n', '\r', '\u2003']
const VALID_SUFFIX_ONLY = ['中文', 'é', '😉', '1', '감사']
const BUILTIN_STRINGS = ['in', 'EXACTIN', 'true', 'False', 'and', 'not', 'Null', 'Or']
const VALID_PREFIX = ['a', '_', ...BUILTIN_STRINGS]

const validNames: string[] = [
  ...[...VALID_SUFFIX_ONLY, ...VALID_PREFIX].flatMap(s => VALID_PREFIX.map(p => `${p}${s}`))
]
const invalidNames: string[] = [
  '',
  ...VALID_SUFFIX_ONLY.flatMap(s => [s, ...VALID_PREFIX.map(p => `${s}${p}`)]),
  ...SPECIAL_INVALID_CHARS.flatMap(char => [
    char,
    ...VALID_PREFIX.map(p => `${char}${p}`),
    ...VALID_PREFIX.map(p => `${p}${char}`)
  ])
]

describe('name', () => {
  it.each(validNames)('valid: "%s"', name => {
    expect(checkValidName(name)).toBe(true)
  })

  it.each(BUILTIN_STRINGS)('builtin: "%s"', name => {
    expect(checkValidName(name)).toBe(false)
  })

  it.each(invalidNames)('invalid: "%s"', name => {
    expect(checkValidName(name)).toBe(false)
  })

  it.each(validNames)('FUNCTION_NAME_REGEX valid "%s"', (input: string) => {
    expect(input.match(FUNCTION_NAME_REGEX)![0]).toBe(input)
  })

  it.each(invalidNames)('FUNCTION_NAME_REGEX invalid "%s"', (input: string) => {
    expect(input.match(FUNCTION_NAME_REGEX)?.[0]).not.toBe(input)
  })

  const trueRegex = RegExp(String.raw`true${TOKEN_SUFFIX_PATTERN}`, 'i')
  const trueFalseRegex = RegExp(String.raw`(?:true|false)${TOKEN_SUFFIX_PATTERN}`, 'i')
  const trueOrRegex = RegExp(String.raw`(?:!|true${TOKEN_SUFFIX_PATTERN})`, 'i')

  it.each(['!a', '!123', '! 123'])('test ! "%s"', (input: string) => {
    expect(input.match(trueOrRegex)?.[0]).toBe('!')
  })

  it.each(['true', 'TRUE', 'True'].flatMap(t => [...VALID_SUFFIX_ONLY, ...VALID_PREFIX].map(s => `${t}${s}`)))(
    'true invalid "%s"',
    (input: string) => {
      expect(input.match(trueRegex)?.[0]).not.toBe(input)
      expect(input.match(trueFalseRegex)?.[0]).not.toBe(input)
      expect(input.match(trueOrRegex)?.[0]).not.toBe(input)
    }
  )

  it.each(
    ['true', 'TRUE', 'True'].flatMap(t => [t, ...SPECIAL_INVALID_CHARS.flatMap(s => [`${t}${s}`, `${t}${s}foobar`])])
  )('true valid "%s"', (input: string) => {
    expect(input.match(trueRegex)![0].toUpperCase()).toBe('TRUE')
    expect(input.match(trueFalseRegex)![0].toUpperCase()).toBe('TRUE')
    expect(input.match(trueOrRegex)![0].toUpperCase()).toBe('TRUE')

    const { tokens, errors } = FormulaLexer.tokenize(input)
    expect(errors).toHaveLength(0)
    expect(tokens[0].tokenType.name).toBe('BooleanLiteral')
  })
})
