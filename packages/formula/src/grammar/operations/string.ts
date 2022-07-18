import { BlockType } from '../../controls'
import { FunctionContext } from '../../type'
import { block2codeFragment } from '../convert'
import { parseTrackBlock } from '../dependency'
import { OperatorType } from '../operator'
import { parseString } from '../util'

const findToken = (ctx: FunctionContext, name: string): undefined | BlockType => {
  const obj = ctx.formulaContext.findNames(ctx.meta.namespaceId, name).find(obj => obj.kind === 'Block')
  if (obj) {
    return ctx.formulaContext.findBlockById(obj.id)
  }

  return undefined
}

export const stringOperator: OperatorType = {
  name: 'string',
  expressionType: 'any',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  dynamicInterpretLhs: async ({ operators, interpreter }) => {
    const image = parseString(operators[0]!.image)
    const block = findToken(interpreter.ctx, image)
    if (block) return { type: 'Block', result: block }
    return { type: 'string', result: image }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    const string = parseString(image)
    const result = findToken(cstVisitor.ctx, string)
    if (result) {
      parseTrackBlock(cstVisitor, result)
      return { type: 'Block', image, codeFragments: [block2codeFragment(result, cstVisitor.ctx.meta.namespaceId)] }
    }
    return { image, codeFragments: codeFragments.map(c => ({ ...c, type: 'string' })), type: 'string' }
  },
  testCases: {
    successTestCases: [
      { definition: '=""', result: '' },
      {
        definition: '= "hello"',
        result: 'hello',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [{ code: 'Equal' }, { code: 'Space' }, { code: 'StringLiteral', display: '"hello"', type: 'string' }]
          }
        ]
      },
      { definition: '= "hel\'lo"', result: "hel'lo" }
    ],
    errorTestCases: [
      {
        definition: '="123" + 1',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number,Cell', got: 'string' }]
      },
      {
        definition: '="',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"\\""' }],
        valid: false
      },
      { definition: '=foo"', errorType: 'syntax', errorMessage: '"foo" not found' },
      {
        definition: '= "Hello',
        label: 'ParseError without closing quote',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"\\"Hello"' }],
        valid: false
      },
      {
        definition: '= "hel"lo"',
        label: 'lex error when parse "hel"lo" => parseError',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.not_all_input_parsed', { image: 'lo' }],
        valid: false
      },
      {
        definition: "= 'hello'",
        label: 'Single quote => parseError',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"\'hello\'"' }],
        valid: false
      }
    ]
  }
}
