/* eslint-disable jest/no-conditional-expect */
import { parse, interpret } from '..'
import { FormulaContext, ParseErrorType, ParseMode } from '../..'

interface TestCase {
  input: string
  value?: any
  label?: string
  mode?: ParseMode
  parseErrorType?: ParseErrorType
  errorMessage?: string
  debug?: true
}

const testCases: TestCase[] = [
  {
    input: '=1+1',
    value: 2
  },
  {
    input: '=null',
    value: null
  },
  {
    input: '= -0.123%',
    label: 'caret and sign',
    value: -0.00123
  },
  {
    input: '= ( 3 + 4 ) * 5 - 2',
    value: 33
  },
  {
    input: '= 1 + 1 - 1',
    value: 1
  },
  {
    input: '= 1 + 6 / 2 - 3',
    value: 1
  },
  {
    input: '= 1 + 5 / 2',
    value: 3.5
  },
  {
    input: '= 1 + 2 * 3',
    label: 'mul > add',
    value: 7
  },
  // Compare
  {
    input: '= 4 > 3',
    value: true
  },
  {
    input: '= 4 < 3',
    value: false
  },
  {
    input: '= 2 = 2',
    value: true
  },
  {
    input: '= 1 == 1',
    value: true
  },
  {
    input: '= 1 != 1',
    value: false
  },
  {
    input: '= 1 <> 2',
    value: true
  },
  {
    input: '= 1 <> "a"',
    value: true
  },
  {
    input: '= 1 > 1 = 3',
    label: 'compare chain',
    value: false
  },
  {
    input: '= 1 = 1 > 3',
    label: 'compare chain',
    value: false
  },
  {
    input: '= (1 = 1) > 3',
    label: 'compare chain',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 1 * 3 > 1 + 1',
    value: true
  },
  {
    input: '= 2 * 2 = 4',
    value: true
  },
  {
    input: '= 4 = 2 + 2',
    value: true
  },
  // Concat
  {
    input: '= "foo" & "bar"',
    value: 'foobar'
  },
  {
    input: '= "" & ""',
    value: ''
  },
  {
    input: '= 1 & "foo"',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string but got number'
  },
  {
    input: '= "foo" & 1',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string but got number'
  },
  // In
  {
    input: '= "foo" in "barfoobaz"',
    value: true
  },
  {
    input: '= "foo" in "barFoobaz"',
    value: true
  },
  {
    input: '= "foo" exactin "barFoobaz"',
    value: false
  },
  {
    input: '= "foo" exactin "barfoobaz"',
    value: true
  },
  {
    input: '= "foo" in 123',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string,Array,Spreadsheet,Column but got number'
  },
  {
    input: '= "foo" in',
    parseErrorType: 'parse',
    errorMessage: 'Missing right expression'
  },
  {
    input: '= 1 in []',
    value: false
  },
  {
    input: '= false exactin "foo"',
    parseErrorType: 'syntax',
    errorMessage: 'Expected Array but got string'
  },
  {
    input: '= 1 in [1, "foo", true]',
    value: true
  },
  {
    input: '= "Foo" in [1, "foo", true, null]',
    value: true
  },
  {
    input: '= "Foo" exactin [1, "foo", true, null]',
    value: false
  },
  {
    input: '= true in [1, "foo", true, null]',
    value: true
  },
  {
    input: '= true exactin [1, "foo", true, null]',
    value: true
  },
  {
    input: '= null exactin [1, "foo", true, null]',
    value: true
  },
  {
    input: '= false exactin [1, "foo", true, null]',
    value: false
  },
  // Array
  {
    input: '=[]',
    value: []
  },
  {
    input: '=[[]]',
    value: [{ type: 'Array', result: [] }]
  },
  {
    input: '=[',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1,',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1,]',
    label: 'array edit',
    parseErrorType: 'parse',
    errorMessage: 'Expression count mismatch'
  },
  {
    input: '=[1,2',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[2, "foo", true]',
    label: 'Array ok',
    value: [
      { type: 'number', result: 2 },
      { type: 'string', result: 'foo' },
      { type: 'boolean', result: true }
    ]
  },
  // Record
  {
    input: '={}',
    value: {}
  },
  {
    input: '={"foo": 1, bar: "baz", obj: {}, array: [1]}',
    value: {
      foo: { type: 'number', result: 1 },
      bar: { type: 'string', result: 'baz' },
      obj: { type: 'Record', result: {} },
      array: { type: 'Array', result: [{ type: 'number', result: 1 }] }
    }
  },
  {
    input: '={',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={a',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={a: }',
    parseErrorType: 'parse',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  {
    input: '={a: 1',
    parseErrorType: 'parse',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={1: "a"}',
    parseErrorType: 'parse',
    label: 'TODO record number as key',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={"foo":}',
    parseErrorType: 'parse',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  {
    input: '={"fo o": 123}',
    value: { 'fo o': { type: 'number', result: 123 } }
  },
  {
    input: '={a: 1, a: []}',
    parseErrorType: 'syntax',
    errorMessage: 'Record key duplicated'
  },
  {
    input: '={a: 1, "a": 2}',
    parseErrorType: 'syntax',
    errorMessage: 'Record key duplicated'
  },
  // Number Literal
  {
    input: '=123123',
    value: 123123
  },
  {
    input: '=0',
    value: 0
  },
  {
    input: '=0.01',
    value: 0.01
  },
  {
    input: '=12.0',
    value: 12
  },
  {
    input: '=-0',
    value: -0
  },
  {
    input: '=-101',
    value: -101
  },
  // Boolean Literal
  {
    input: '=true',
    value: true
  },
  {
    input: '=false',
    value: false
  },
  {
    input: '= 4 > 3 == true',
    value: true
  },
  {
    input: '= 2 * 2 > 3 != false',
    value: true
  },
  {
    input: '= 3 = "foo"',
    value: false
  },
  // String Literal
  {
    input: '= "hello"',
    value: 'hello'
  },
  {
    input: '= "hel\'lo"',
    value: "hel'lo"
  },
  {
    input: '= "hel"lo"',
    label: 'lex error when parse "hel"lo" => parseError',
    parseErrorType: 'parse',
    errorMessage: 'TODO build not all input parsed :7'
  },
  {
    input: "= 'hello'",
    label: 'Single quote => parseError',
    parseErrorType: 'parse',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  // **
  {
    input: '= 2 ^ 4',
    value: 16
  },
  {
    input: '= 2 ^ true',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 2^0',
    value: 1
  },
  // %
  {
    input: '= 2%',
    value: 0.02
  },
  {
    input: '=1 - (  -40%)',
    value: 1.4
  },
  {
    input: '=5100%',
    value: 51
  },
  // Combine
  {
    input: '= !true',
    value: false
  },
  {
    input: '=!not 1',
    value: true
  },
  {
    input: '= ! not ! false',
    value: true
  },
  {
    input: '= !false',
    value: true
  },
  {
    input: '=true and true',
    value: true
  },
  {
    input: '=false || true',
    value: true
  },
  {
    input: '=1 and 2',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=1 and false or 3',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=true and !2 && TRUE()',
    value: false
  },
  // Error
  {
    input: '= 1/0',
    value: 'Division by zero'
  },
  {
    input: '= ABS(1/0)',
    value: 'Division by zero'
  },
  {
    input: '= 1/0 + 1',
    value: 'Division by zero'
  },
  {
    input: '= 3 = 1/0',
    value: 'Division by zero'
  },
  {
    input: '= IFERROR(1/0, "Foo")',
    value: 'Foo'
  },
  {
    input: '= -',
    label: 'Without number',
    parseErrorType: 'parse',
    errorMessage: 'Missing number'
  },
  {
    input: '1+1',
    parseErrorType: 'parse',
    label: 'missing prefix equal',
    errorMessage: 'TODO mismatch token startExpression'
  },
  {
    input: '=1+',
    parseErrorType: 'parse',
    label: 'TODO missing suffix expression',
    errorMessage: 'Expecting: one of these possible Token sequences:'
  },
  {
    input: '=(1',
    parseErrorType: 'parse',
    label: 'Missing closing parenthesis1',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=(1',
    parseErrorType: 'parse',
    label: 'Missing closing parenthesis1',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=ABS(',
    parseErrorType: 'parse',
    label: 'Missing closing parenthesis2',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=ABS(1',
    parseErrorType: 'parse',
    label: 'Missing closing parenthesis3',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=POWER(1,',
    parseErrorType: 'parse',
    label: 'Missing closing parenthesis4',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=POWER(1,2',
    parseErrorType: 'parse',
    label: 'Missing closing parenthesis5',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '= 1+$',
    parseErrorType: 'parse',
    errorMessage: 'Expecting: one of these possible Token sequences:'
  },
  {
    input: '= 1;',
    label: 'Semicolon 1',
    parseErrorType: 'parse',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '= 1; 2',
    label: 'Semicolon 2',
    parseErrorType: 'parse',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '="foo" &&& 123',
    parseErrorType: 'parse',
    label: 'TODO &&&',
    errorMessage: 'Expected boolean but got string'
  },
  {
    input: '=1**2',
    parseErrorType: 'parse',
    errorMessage: `Expecting: one of these possible Token sequences:
  1. [LParen]
  2. [LBracket]
  3. [LBrace]
  4. [Minus]
  5. [NumberLiteral]
  6. [BooleanLiteral]
  7. [StringLiteral]
  8. [NullLiteral]
  9. [Dollar, UUID, At]
  10. [Dollar, UUID, Sharp]
  11. [Dollar, UUID]
  12. [FunctionName]
  13. [EqualCompareOperator]
  14. [CompareOperator]
but found: '*'`
  },
  // Function Call
  {
    input: '=ABS ( -1  )',
    value: 1
  },
  {
    input: '=core::ABS ( -1  )',
    value: 1
  },
  {
    input: '=ABS ()',
    parseErrorType: 'syntax',
    errorMessage: 'Miss argument'
  },
  {
    input: '=ABS(1,2)',
    parseErrorType: 'syntax',
    errorMessage: 'Argument count mismatch'
  },
  {
    input: '=AVERAGE()',
    parseErrorType: 'syntax',
    errorMessage: 'Miss argument',
    label: 'Spread operator with no argument'
  },
  {
    input: '=AVERAGE(1)',
    value: 1,
    label: 'spread operator'
  },
  {
    input: '=AVERAGE(1, 2, 3)',
    value: 2,
    label: 'spread operator'
  },
  {
    input: '=IF(true, 1+2, "2")',
    value: 3
  },
  {
    input: '=AND(true, false, false)',
    value: false
  },
  {
    input: '=OR(true)',
    value: true
  },
  {
    input: '=ABS(IF(FALSE(), -3, -4))',
    value: 4
  },
  {
    input: '=toString(1)',
    value: '1'
  },
  {
    input: '=toString("Foo")',
    value: '"Foo"'
  },
  {
    input: '=UNKNOWN ()',
    parseErrorType: 'syntax',
    errorMessage: 'Function UNKNOWN not found'
  },
  // Chain
  {
    input: '="FOO".T().T()',
    value: 'FOO'
  },
  {
    input: '=(1+1).TYPE()',
    value: 'number'
  },
  {
    input: '=[1,false,"foo"].toString()',
    value: '[1, false, "foo"]'
  },
  {
    input: '="foobar".START_WITH("foo")',
    value: true
  },
  {
    input: '="foobar".START_WITH("bar")',
    value: false
  },
  {
    input: '="foo".START_WITH(123)',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string but got number',
    label: 'chain type 1'
  },
  {
    input: '=true.START_WITH("123")',
    parseErrorType: 'syntax',
    label: 'TODO chain type 2',
    errorMessage: 'Expected string but got boolean'
  },
  {
    input: '="123".LEN()',
    parseErrorType: 'syntax',
    errorMessage: 'LEN is not chainable'
  },
  // Predicate
  {
    input: '==1',
    label: 'TODO predicate ==1',
    parseErrorType: 'parse',
    errorMessage: 'TODO mismatch token startExpression'
  },
  {
    input: '= =1',
    value: { type: 'number', result: 1 }
  },
  {
    input: '=>=3',
    value: { type: 'number', result: 3 }
  },
  {
    input: '=!="foo"',
    value: { type: 'string', result: 'foo' }
  },
  {
    input: '=>=true',
    debug: true,
    label: 'Predicate check type',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '=<>"123"',
    value: { type: 'string', result: '123' }
  },
  {
    input: '= <= (1+1)',
    value: { type: 'number', result: 2 }
  },
  // Type
  {
    input: '=null + 1',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got null'
  },
  {
    input: '=ABS ( "a" )',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got string'
  },
  {
    input: '=IF(1, -3, -4)',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=ABS( NOW() )',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got Date'
  },
  {
    input: '=AND(1, 2)',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=ABS ( TRUE() )',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 2 * (2 = 4)',
    label: 'type check',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '=if(true, 1+2, "2")',
    parseErrorType: 'syntax',
    label: 'downcase',
    errorMessage: 'Function if not found'
  },
  {
    input: '=1; 2; (1+3)',
    label: 'multiline ok',
    mode: 'multiline',
    value: 4
  },
  {
    input: '=1; 2;',
    label: 'multiline error',
    parseErrorType: 'parse',
    mode: 'multiline',
    errorMessage: 'Missing expression'
  },
  {
    input: '=;',
    label: 'multiline error 2',
    parseErrorType: 'parse',
    mode: 'multiline',
    errorMessage: 'Missing expression'
  },
  {
    input: '=;123',
    label: 'multiline error 3',
    parseErrorType: 'parse',
    mode: 'multiline',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  // TODO List
  {
    input: '= 中文',
    label: 'TODO chinese',
    parseErrorType: 'parse',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  {
    input: '=varvarabc中文var',
    label: 'TODO chinese2',
    parseErrorType: 'parse',
    errorMessage: 'TODO mismatch token FunctionCall'
  },
  {
    input: '= nottrue',
    label: 'TODO not is a operator',
    value: false
  },
  {
    input: '=1.',
    label: 'should error',
    value: 1
  },
  {
    input: '=1.T()',
    label: 'should success',
    parseErrorType: 'parse',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=1.START_WITH("123")',
    parseErrorType: 'parse',
    label: 'TODO chain type 3',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=123.ABS()',
    parseErrorType: 'parse',
    errorMessage: 'TODO build not all input parsed :5'
  }
]

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const formulaContext = new FormulaContext({})

const name = 'foo'
const meta = { variableId, namespaceId, name }

const parseInput = { formulaContext, meta }

describe('Simple test case', () => {
  testCases.forEach(({ input, label, parseErrorType, errorMessage, mode, value, debug }) => {
    const prefix = label ? `[${label}] ` : ''
    const suffix = value !== undefined ? ` // => ${value}` : ' // => ✗'
    it(`${prefix}${input}${suffix}`, async () => {
      const newMeta = { ...meta, input }
      const {
        success,
        cst,
        errorType,
        errorMessages,
        codeFragments,
        completions,
        input: newInput,
        inputImage,
        parseImage
      } = parse({
        ...parseInput,
        mode,
        meta: newMeta
      })

      expect(completions.length).not.toEqual(0)

      if (label) {
        expect(codeFragments).toMatchSnapshot()
      }

      if (debug) {
        expect(cst).toMatchSnapshot()
        expect({ newInput, input, inputImage, parseImage }).toMatchSnapshot()
      }

      if (value !== undefined) {
        const {
          success: interpretSuccess,
          variableValue,
          errorMessages: interpretErrorMessages
        } = await interpret({ cst, meta: newMeta, formulaContext })

        expect(errorMessages).toEqual([])
        expect(interpretErrorMessages).toEqual([])

        expect(errorType).toEqual(undefined)
        expect(success).toEqual(true)

        expect(variableValue.result.result).toEqual(value)
        expect(interpretSuccess).toEqual(true)
      } else if (parseErrorType) {
        expect(errorMessages[0]!.message).toContain(errorMessage)
        expect(errorType).toEqual(parseErrorType)
      } else {
        throw new Error('Unexpected error')
      }
    })
  })
})
