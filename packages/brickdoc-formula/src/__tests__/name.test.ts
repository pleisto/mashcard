import { BUILTIN_STRINGS, NAME_SPECIAL_INVALID_CHARS, NAME_VALID_PREFIX, NAME_VALID_SUFFIX_ONLY } from '../tests'
import { checkValidName, FormulaLexer, FUNCTION_NAME_REGEX, TOKEN_SUFFIX_PATTERN } from '../grammar/lexer'

const validNames: string[] = [
  ...[...NAME_VALID_SUFFIX_ONLY, ...NAME_VALID_PREFIX].flatMap(s => NAME_VALID_PREFIX.map(p => `${p}${s}`))
]
const invalidNames: string[] = [
  '',
  ...NAME_VALID_SUFFIX_ONLY.flatMap(s => [s, ...NAME_VALID_PREFIX.map(p => `${s}${p}`)]),
  ...NAME_SPECIAL_INVALID_CHARS.flatMap(char => [
    char,
    ...NAME_VALID_PREFIX.map(p => `${char}${p}`),
    ...NAME_VALID_PREFIX.map(p => `${p}${char}`)
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

  it.each(
    ['true', 'TRUE', 'True'].flatMap(t => [...NAME_VALID_SUFFIX_ONLY, ...NAME_VALID_PREFIX].map(s => `${t}${s}`))
  )('true invalid "%s"', (input: string) => {
    expect(input.match(trueRegex)?.[0]).not.toBe(input)
    expect(input.match(trueFalseRegex)?.[0]).not.toBe(input)
    expect(input.match(trueOrRegex)?.[0]).not.toBe(input)
  })

  it.each(
    ['true', 'TRUE', 'True'].flatMap(t => [
      t,
      ...NAME_SPECIAL_INVALID_CHARS.flatMap(s => [`${t}${s}`, `${t}${s}foobar`])
    ])
  )('true valid "%s"', (input: string) => {
    expect(input.match(trueRegex)![0].toUpperCase()).toBe('TRUE')
    expect(input.match(trueFalseRegex)![0].toUpperCase()).toBe('TRUE')
    expect(input.match(trueOrRegex)![0].toUpperCase()).toBe('TRUE')

    const { tokens, errors } = FormulaLexer.tokenize(input)
    expect(errors).toHaveLength(0)
    expect(tokens[0].tokenType.name).toBe('BooleanLiteral')
  })
})
