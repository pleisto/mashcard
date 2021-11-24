import { createToken, ILexerErrorMessageProvider, IToken, Lexer } from 'chevrotain'
import { ArgumentType } from '..'

export const CompareOperator = createToken({ name: 'CompareOperator', pattern: Lexer.NA })
export const AdditionOperator = createToken({ name: 'AdditionOperator', pattern: Lexer.NA })
export const MultiplicationOperator = createToken({ name: 'MultiplicationOperator', pattern: Lexer.NA })
export const CombineOperator = createToken({ name: 'CombineOperator', pattern: Lexer.NA })

export const And = createToken({
  name: 'And',
  pattern: /and|&&/,
  categories: CombineOperator
})

export const Or = createToken({
  name: 'Or',
  pattern: /or|\|\|/,
  categories: CombineOperator
})

export const Not = createToken({
  name: 'Not',
  pattern: /not|!/
})

export const GreaterThan = createToken({
  name: 'GreaterThan',
  pattern: />/,
  categories: CompareOperator
})

export const Equal = createToken({
  name: 'Equal',
  pattern: /=/,
  categories: CompareOperator
})

export const Equal2 = createToken({
  name: 'Equal2',
  pattern: /==/,
  categories: CompareOperator
})

export const LessThan = createToken({
  name: 'LessThan',
  pattern: /</,
  categories: CompareOperator
})

export const NotEqual = createToken({
  name: 'NotEqual',
  pattern: /<>/,
  categories: CompareOperator
})

export const NotEqual2 = createToken({
  name: 'NotEqual2',
  pattern: /!=/,
  categories: CompareOperator
})

export const GreaterThanEqual = createToken({
  name: 'GreaterThanEqual',
  pattern: />=/,
  categories: CompareOperator
})

export const LessThanEqual = createToken({
  name: 'LessThanEqual',
  pattern: /<=/,
  categories: CompareOperator
})

export const Plus = createToken({
  name: 'Plus',
  pattern: /\+/,
  categories: AdditionOperator
})

export const Ampersand = createToken({
  name: 'Ampersand',
  pattern: /&/,
  categories: AdditionOperator
})

export const Caret = createToken({
  name: 'Caret',
  pattern: /\^/,
  categories: MultiplicationOperator
})

export const Sign = createToken({
  name: 'Sign',
  pattern: /%/
})

export const Dollar = createToken({
  name: 'Dollar',
  pattern: /\$/
})

export const At = createToken({
  name: 'At',
  pattern: /@/
})

export const Sharp = createToken({
  name: 'Sharp',
  pattern: /#/
})

export const Dot = createToken({
  name: 'Dot',
  pattern: /\./
})

export const UUID = createToken({
  name: 'UUID',
  pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
})

export const Minus = createToken({
  name: 'Minus',
  pattern: /-/,
  categories: AdditionOperator
})

export const Multi = createToken({
  name: 'Multi',
  pattern: /\*/,
  categories: MultiplicationOperator
})

export const Div = createToken({
  name: 'Div',
  pattern: /\//,
  categories: MultiplicationOperator
})

export const LParen = createToken({ name: 'LParen', pattern: /\(/ })
export const RParen = createToken({ name: 'RParen', pattern: /\)/ })
export const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /[0-9]+[.]?[0-9]*([eE][+-][0-9]+)?/
})

export const BooleanLiteral = createToken({
  name: 'BooleanLiteral',
  pattern: /true|false/
})

export const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(""|[^"])*"/
})

export const Comma = createToken({ name: 'Comma', pattern: /,/ })

export const DoubleColon = createToken({ name: 'Colon', pattern: /::/ })

export const FunctionGroupName = createToken({
  name: 'FunctionGroupName',
  pattern: /[a-zA-Z][a-zA-Z0-9_]*/
})

export const FunctionName = createToken({
  name: 'FunctionName',
  pattern: /[A-Z][A-Z0-9_]*/
})

// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
export const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED
})

export const allTokens = [
  WhiteSpace, // whitespace is normally very common so it should be placed first to speed up the lexer's performance

  And, // and &&
  Or, // or ||

  Equal2, //  ==
  NotEqual2, // !=

  Not, // not !

  LessThanEqual, // <=
  GreaterThanEqual, // >=
  NotEqual, // <>

  Equal, // =
  LessThan, // <
  GreaterThan, // >

  Plus, // +
  Minus, // -
  Ampersand, // &

  Multi, // *
  Div, // /
  Caret, // ^

  LParen, // (
  RParen, // )

  Sign, // %

  Dollar, // $
  At, // @
  Sharp, // #
  DoubleColon, // ::
  Dot, // .

  UUID,

  CombineOperator,
  CompareOperator,
  AdditionOperator,
  MultiplicationOperator,

  NumberLiteral,
  BooleanLiteral,
  StringLiteral,

  FunctionName,
  FunctionGroupName,
  Comma // ,
]

const errorProvider: ILexerErrorMessageProvider = {
  // eslint-disable-next-line max-params
  buildUnexpectedCharactersMessage: (fullText, startOffset, length, line, column): string => {
    return `Unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset},` + ` skipped ${length} characters.`
  },

  buildUnableToPopLexerModeMessage: (token: IToken): string => {
    return 'Unable to pop lexer mode:'
  }
}

export const FormulaLexer = new Lexer(allTokens, {
  errorMessageProvider: errorProvider,
  ensureOptimizations: true
})

export const tokenVocabulary = allTokens.reduce((o, acc) => {
  o[acc.name] = acc
  return o
}, {})

export const AllowTypes: { [key: string]: ArgumentType } = Object.entries({
  'Equal2,Equal,NotEqual,NotEqual2': 'any',
  Not: 'any',
  'LessThanEqual,LessThan,GreaterThan,GreaterThanEqual': 'number',
  Ampersand: 'string',
  'Multi,Div,Plus,Minus,Caret': 'number',
  'And,Or': 'boolean',
  NumberLiteral: 'number',
  BooleanLiteral: 'boolean',
  StringLiteral: 'string'
}).reduce((o, [key, value]) => {
  key.split(',').forEach(k => (o[k] = value))
  return o
}, {})
