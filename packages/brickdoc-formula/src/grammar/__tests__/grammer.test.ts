/* eslint-disable jest/no-conditional-expect */
import { parse, interpret, quickInsert } from '..'
import { FormulaContext, ParseErrorType } from '../..'

interface TestCase {
  input: string
  value?: any
  label?: string
  parseErrorType?: ParseErrorType
  errorMessage?: string
  debug?: true
}

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const barNamespaceId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const barVariableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

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
    parseErrorType: 'syntax',
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
    value: [{ type: 'Array', subType: 'void', result: [] }]
  },
  {
    input: '=[',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1,',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1,]',
    label: 'array edit',
    parseErrorType: 'syntax',
    errorMessage: 'Expression count mismatch'
  },
  {
    input: '=[1,2',
    parseErrorType: 'syntax',
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
  // Reference
  {
    input: `=Self`,
    value: { kind: 'self' }
  },
  {
    input: `=#${barNamespaceId}@${barVariableId}`,
    value: 24
  },
  {
    input: `=&#${barNamespaceId}@${barVariableId}`,
    value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId }
  },
  {
    input: `=&#${barNamespaceId}@${barVariableId}.foo`,
    value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId, attribute: 'foo' }
  },
  {
    input: '=&Self',
    value: { kind: 'self' }
  },
  {
    input: '=&Self."foo bar"',
    value: { kind: 'self', attribute: 'foo bar' }
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
      obj: { type: 'Record', subType: 'void', result: {} },
      array: { type: 'Array', subType: 'number', result: [{ type: 'number', result: 1 }] }
    }
  },
  {
    input: '={',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={a',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={a: }',
    parseErrorType: 'syntax',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  {
    input: '={a: 1',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={1: "a"}',
    parseErrorType: 'syntax',
    label: 'TODO record number as key',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={"foo":}',
    parseErrorType: 'syntax',
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
    parseErrorType: 'syntax',
    errorMessage: 'TODO build not all input parsed :7'
  },
  {
    input: "= 'hello'",
    label: 'Single quote => parseError',
    parseErrorType: 'syntax',
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
    input: '=true and !2 && true',
    value: false
  },
  {
    input: '=Input.foo',
    value: 'Key foo not found'
  },
  {
    input: '=Input.bar',
    value: 'bar123'
  },
  {
    input: '=$1',
    value: 'Foo1234123'
  },
  {
    input: '=$2',
    value: 'Argument 2 not found'
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
    parseErrorType: 'syntax',
    errorMessage: 'Missing number'
  },
  {
    input: '1+1',
    parseErrorType: 'syntax',
    label: 'missing prefix equal',
    errorMessage: 'TODO mismatch token startExpression'
  },
  {
    input: '=1+',
    parseErrorType: 'syntax',
    label: 'TODO missing suffix expression',
    errorMessage: 'Expecting: one of these possible Token sequences:'
  },
  {
    input: '=(1',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis1',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=(1',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis1',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=ABS(',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis2',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=ABS(1',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis3',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=POWER(1,',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis4',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=POWER(1,2',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis5',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '= 1+$',
    parseErrorType: 'syntax',
    errorMessage: 'Expecting: one of these possible Token sequences:'
  },
  {
    input: '= 1;',
    label: 'Semicolon 1',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '= 1; 2',
    label: 'Semicolon 2',
    value: 2
  },
  {
    input: '= (1; 2+1)',
    value: 3
  },
  {
    input: '="foo" &&& 123',
    parseErrorType: 'syntax',
    label: 'TODO &&&',
    errorMessage: 'Expected boolean but got string'
  },
  {
    input: '=1**2',
    parseErrorType: 'syntax',
    errorMessage: 'Expecting: one of these possible Token sequences:'
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
    input: '=ABS(IF(false, -3, -4))',
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
  // Access
  {
    input: '=1.a',
    parseErrorType: 'syntax',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=1."a"',
    parseErrorType: 'syntax',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=true.a',
    parseErrorType: 'syntax',
    errorMessage: 'Access error'
  },
  {
    input: '={a:1}.a',
    value: 1
  },
  {
    input: '={a:1}.b',
    value: 'Key b not found'
  },
  {
    input: '=[123].b',
    value: 'Access not supported for Array'
  },
  {
    input: '={a:1}."a"',
    value: 1
  },
  {
    input: '=ERROR("Foo").result',
    value: 'Foo'
  },
  // Chain
  {
    input: '="FOO".',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '="FOO".T',
    parseErrorType: 'syntax',
    errorMessage: 'Access error'
  },
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
    parseErrorType: 'syntax',
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
    input: '=ABS ( true )',
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
    value: 4
  },
  {
    input: '=ABS(1; 2; (1+3))',
    label: 'multiline function call ok',
    value: 4
  },
  {
    input: '=1; 2; 1/0; (1+3)',
    value: 4
  },
  {
    input: '=1; 2;',
    label: 'multiline error',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '=;',
    label: 'multiline error 2',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '=;123',
    label: 'multiline error 3',
    parseErrorType: 'syntax',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  // TODO List
  {
    input: '= 中文',
    label: 'TODO chinese',
    parseErrorType: 'syntax',
    errorMessage: 'Expecting: one of these possible Token sequences'
  },
  {
    input: '=varvarabc中文var',
    label: 'TODO chinese2',
    parseErrorType: 'syntax',
    errorMessage: 'Unknown function varvarabc'
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
    parseErrorType: 'syntax',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=1.START_WITH("123")',
    parseErrorType: 'syntax',
    label: 'TODO chain type 3',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=123.ABS()',
    parseErrorType: 'syntax',
    errorMessage: 'TODO build not all input parsed :5'
  }
]

const formulaContext = new FormulaContext({})

const name = 'foo'
const meta = { variableId, namespaceId, name }

const parseInput = { formulaContext, meta }

describe('Simple test case', () => {
  beforeAll(async () => {
    await quickInsert({
      formulaContext,
      meta: { namespaceId: barNamespaceId, name: 'bar', variableId: barVariableId, input: '=24' }
    })
  })

  testCases.forEach(({ input, label, parseErrorType, errorMessage, value, debug }) => {
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
        } = await interpret({
          cst,
          meta: newMeta,
          formulaContext,
          interpretContext: {
            ctx: { bar: { type: 'string', result: 'bar123' } },
            arguments: [{ type: 'string', result: 'Foo1234123' }]
          }
        })

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
