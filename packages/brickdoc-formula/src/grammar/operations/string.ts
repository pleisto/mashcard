import { BlockType } from '../../controls'
import { FunctionContext } from '../../types'
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
  dynamicInterpretLhs: async (args, operators, interpreter) => {
    const image = parseString(operators[0].image)
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
      { definition: '= "hello"', result: 'hello' },
      { definition: '= "hel\'lo"', result: "hel'lo" }
    ],
    errorTestCases: [
      { definition: '="', errorType: 'parse', errorMessage: 'Parse error: "\\""', valid: false },
      { definition: '=foo"', errorType: 'syntax', errorMessage: '"foo" not found' },
      {
        definition: '= "Hello',
        label: 'ParseError without closing quote',
        errorType: 'parse',
        errorMessage: 'Parse error: "\\"Hello"',
        valid: false
      },
      {
        definition: '= "hel"lo"',
        label: 'lex error when parse "hel"lo" => parseError',
        errorType: 'parse',
        errorMessage: 'Not all input parsed: lo',
        valid: false
      },
      {
        definition: "= 'hello'",
        label: 'Single quote => parseError',
        errorType: 'parse',
        errorMessage: 'Parse error: "\'hello\'"',
        valid: false
      }
    ]
  }
}
