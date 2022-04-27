import { createToken, ILexerErrorMessageProvider, IToken, Lexer, TokenType } from 'chevrotain'

export const EqualCompareOperator = createToken({ name: 'EqualCompareOperator', pattern: Lexer.NA })
export const CompareOperator = createToken({ name: 'CompareOperator', pattern: Lexer.NA })
export const AdditionOperator = createToken({ name: 'AdditionOperator', pattern: Lexer.NA })
export const MultiplicationOperator = createToken({ name: 'MultiplicationOperator', pattern: Lexer.NA })
export const CombineOperator = createToken({ name: 'CombineOperator', pattern: Lexer.NA })
export const InOperator = createToken({ name: 'InOperator', pattern: Lexer.NA })

const WORD_BOUNDARY_PATTERN = String.raw`,"'\`&#@:!\$%\^<>/?*=.;~|[(){}+\\\-\]\s`
// export const FUNCTION_NAME_REGEX = /[a-zA-Z_]((?![,"'`&#@:!$%^<>/?*=.;~|[(){}+\\\-\]\s]).)*/
export const FUNCTION_NAME_REGEX = RegExp(String.raw`[a-zA-Z_]((?![${WORD_BOUNDARY_PATTERN}]).)*`)

export const TOKEN_SUFFIX_PATTERN = String.raw`(?![^${WORD_BOUNDARY_PATTERN}])`

export const In = createToken({
  name: 'In',
  pattern: RegExp(String.raw`in${TOKEN_SUFFIX_PATTERN}`, 'i'),
  categories: InOperator
})
export const ExactIn = createToken({
  name: 'ExactIn',
  pattern: RegExp(String.raw`exactin${TOKEN_SUFFIX_PATTERN}`, 'i'),
  categories: InOperator
})

export const Self = createToken({ name: 'Self', pattern: RegExp(String.raw`Self${TOKEN_SUFFIX_PATTERN}`, 'i') })
export const CurrentBlock = createToken({
  name: 'CurrentBlock',
  pattern: RegExp(String.raw`CurrentBlock${TOKEN_SUFFIX_PATTERN}`, 'i')
})
export const Input = createToken({ name: 'Input', pattern: RegExp(String.raw`Input${TOKEN_SUFFIX_PATTERN}`, 'i') })
export const ThisRow = createToken({
  name: 'ThisRow',
  pattern: RegExp(String.raw`ThisRow${TOKEN_SUFFIX_PATTERN}`, 'i')
})
export const ThisRecord = createToken({
  name: 'ThisRecord',
  pattern: RegExp(String.raw`ThisRecord${TOKEN_SUFFIX_PATTERN}`, 'i')
})

export const And = createToken({
  name: 'And',
  pattern: RegExp(String.raw`(?:&&|and${TOKEN_SUFFIX_PATTERN})`, 'i'),
  categories: CombineOperator
})

export const Or = createToken({
  name: 'Or',
  pattern: RegExp(String.raw`(?:\|\||or${TOKEN_SUFFIX_PATTERN})`, 'i'),
  categories: CombineOperator
})

export const Not = createToken({
  name: 'Not',
  pattern: RegExp(String.raw`(?:!|not${TOKEN_SUFFIX_PATTERN})`, 'i')
})

export const GreaterThan = createToken({
  name: 'GreaterThan',
  pattern: />/,
  categories: CompareOperator
})

export const Equal = createToken({
  name: 'Equal',
  pattern: /=/,
  categories: EqualCompareOperator
})

export const Equal2 = createToken({
  name: 'Equal2',
  pattern: /==/,
  categories: EqualCompareOperator
})

export const LessThan = createToken({
  name: 'LessThan',
  pattern: /</,
  categories: CompareOperator
})

export const NotEqual = createToken({
  name: 'NotEqual',
  pattern: /<>/,
  categories: EqualCompareOperator
})

export const NotEqual2 = createToken({
  name: 'NotEqual2',
  pattern: /!=/,
  categories: EqualCompareOperator
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
  pattern: /&/
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

export const LBracket = createToken({ name: 'LBracket', pattern: /\[/ })
export const RBracket = createToken({ name: 'RBracket', pattern: /\]/ })

export const LBrace = createToken({ name: 'LBrace', pattern: /\{/ })
export const RBrace = createToken({ name: 'RBrace', pattern: /\}/ })

export const LambdaArgumentNumber = createToken({ name: 'LambdaArgumentNumber', pattern: /\$[1-9]/ })

export const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /[0-9]+/
  // pattern: /[0-9]+[.]?[0-9]*([eE][+-][0-9]+)?/
})

export const DecimalLiteral = createToken({
  name: 'DecimalLiteral',
  pattern: /[0-9]+\.[0-9]+/
})

export const BooleanLiteral = createToken({
  name: 'BooleanLiteral',
  pattern: RegExp(String.raw`(?:true|false)${TOKEN_SUFFIX_PATTERN}`, 'i')
})

export const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(""|[^"])*"/
})

export const NullLiteral = createToken({
  name: 'NullLiteral',
  pattern: RegExp(String.raw`null${TOKEN_SUFFIX_PATTERN}`, 'i')
})

export const Comma = createToken({ name: 'Comma', pattern: /,/ })

export const Semicolon = createToken({ name: 'Semicolon', pattern: /;/ })

export const DoubleColon = createToken({ name: 'DoubleColon', pattern: /::/ })

export const Colon = createToken({ name: 'Colon', pattern: /:/ })

export const FunctionName = createToken({ name: 'FunctionName', pattern: FUNCTION_NAME_REGEX })

export const AnyName = createToken({ name: 'AnyName', pattern: /\S+/ })

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

  CurrentBlock, // CurrentBlock
  ThisRow, // ThisRow
  ThisRecord, // ThisRecord
  Self, // Self
  Input, // Input
  ExactIn, // exactin
  In, // in

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

  LBracket, // [
  RBracket, // ]

  LBrace, // {
  RBrace, // }

  Sign, // %

  LambdaArgumentNumber,

  Dollar, // $
  At, // @
  Sharp, // #
  DoubleColon, // ::
  Colon, // :

  DecimalLiteral,
  Dot, // .

  UUID,

  CombineOperator,
  InOperator,
  EqualCompareOperator,
  CompareOperator,
  AdditionOperator,
  MultiplicationOperator,

  NumberLiteral,
  BooleanLiteral,
  StringLiteral,
  NullLiteral,

  Comma, // ,
  Semicolon, // ;

  // FunctionName,
  FunctionName,

  AnyName
]

const errorProvider: ILexerErrorMessageProvider = {
  // eslint-disable-next-line max-params
  buildUnexpectedCharactersMessage: (fullText, startOffset, length, line, column): string => {
    return (
      `Unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset},` +
      ` skipped ${length} characters.`
    )
  },

  buildUnableToPopLexerModeMessage: (token: IToken): string => {
    return 'Unable to pop lexer mode:'
  }
}

export const FormulaLexer = new Lexer(allTokens, {
  errorMessageProvider: errorProvider,
  ensureOptimizations: false
})

export const tokenVocabulary = allTokens.reduce((o: Record<string, TokenType>, acc) => {
  o[acc.name] = acc
  return o
}, {})

export const checkValidName = (name: string): boolean => {
  if (name.length !== name.trim().length) {
    return false
  }

  const { tokens, errors } = FormulaLexer.tokenize(name)

  if (errors.length > 0) {
    return false
  }

  if (tokens.length !== 1) {
    return false
  }

  return tokens[0].tokenType.name === 'FunctionName'
}
