/* eslint-disable jest/no-conditional-expect */
import { parse, interpret } from '..'
import { FormulaContext } from '../..'

const testCases = [
  {
    input: '=1+1',
    value: 2
  },
  {
    input: '=0/0',
    value: NaN
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
    parseSuccess: false,
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
    parseSuccess: false,
    errorMessage: 'Expected string but got number'
  },
  {
    input: '= "foo" & 1',
    parseSuccess: false,
    errorMessage: 'Expected string but got number'
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
    label: 'lex error when parse "hel"lo"',
    lexSuccess: false,
    errorMessage: 'Unexpected character: ->"<- at offset: 9, skipped 1 characters.'
  },
  {
    input: "= 'hello'",
    label: 'Single quote',
    lexSuccess: false,
    errorMessage: "Unexpected character: ->'<- at offset: 2, skipped 1 characters."
  },
  // **
  {
    input: '= 2 ^ 4',
    value: 16
  },
  {
    input: '= 2 ^ true',
    parseSuccess: false,
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
    parseSuccess: false,
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=1 and false or 3',
    parseSuccess: false,
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=true and !2 && excel::TRUE()',
    value: false
  },
  // Error
  {
    input: '1+1',
    parseSuccess: false,
    label: 'missing prefix equal',
    errorMessage: 'TODO mismatch token startExpression'
  },
  {
    input: '= 1+$',
    parseSuccess: false,
    errorMessage: 'Expecting: one of these possible Token sequences:'
  },
  {
    input: '=1**2',
    parseSuccess: false,
    errorMessage: `Expecting: one of these possible Token sequences:
  1. [LParen]
  2. [Minus]
  3. [NumberLiteral]
  4. [BooleanLiteral]
  5. [StringLiteral]
  6. [Dollar, UUID, At]
  7. [Dollar, UUID, Sharp]
  8. [Dollar, UUID]
  9. [FunctionGroupName]
but found: '*'`
  },
  // Function Call
  {
    input: '=excel::ABS ( -1  )',
    value: 1
  },
  {
    input: '=excel::ABS ()',
    parseSuccess: false,
    errorMessage: 'Miss argument'
  },
  {
    input: '=excel::ABS(1,2)',
    parseSuccess: false,
    errorMessage: 'Argument count mismatch'
  },
  {
    input: '=excel::AVERAGE()',
    parseSuccess: false,
    errorMessage: 'Miss argument',
    label: 'Spread operator with no argument'
  },
  {
    input: '=excel::AVERAGE(1)',
    value: 1,
    label: 'spread operator'
  },
  {
    input: '=excel::AVERAGE(1, 2, 3)',
    value: 2,
    label: 'spread operator'
  },
  {
    input: '=excel::IF(true, 1+2, "2")',
    value: 3
  },
  {
    input: '=excel::AND(true, false, false)',
    value: false
  },
  {
    input: '=excel::OR(true)',
    value: true
  },
  {
    input: '=excel::ABS(excel::IF(excel::FALSE(), -3, -4))',
    value: 4
  },
  {
    input: '=excel::UNKNOWN ()',
    parseSuccess: false,
    errorMessage: 'Function excel.UNKNOWN not found'
  },
  // Chain
  {
    input: '="FOO".core::T().core::T()',
    value: 'FOO'
  },
  {
    input: '=(1+1).core::TYPE()',
    value: 'number'
  },
  {
    input: '="foobar".core::START_WITH("foo")',
    value: true
  },
  {
    input: '="foobar".core::START_WITH("bar")',
    value: false
  },
  {
    input: '="foo".core::START_WITH(123)',
    parseSuccess: false,
    errorMessage: 'Expected string but got number',
    label: 'chain type 1'
  },
  {
    input: '=true.core::START_WITH("123")',
    parseSuccess: false,
    label: 'TODO chain type 2',
    errorMessage: 'Expected string but got boolean'
  },
  {
    input: '="123".excel::LEN()',
    parseSuccess: false,
    errorMessage: 'excel::LEN is not chainable'
  },
  // Type
  {
    input: '=excel::ABS ( "a" )',
    parseSuccess: false,
    errorMessage: 'Expected number but got string'
  },
  {
    input: '=excel::IF(1, -3, -4)',
    parseSuccess: false,
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=excel::ABS( excel::TODAY() )',
    parseSuccess: false,
    errorMessage: 'Expected number but got Date'
  },
  {
    input: '=excel::AND(1, 2)',
    parseSuccess: false,
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=excel::ABS ( excel::TRUE() )',
    parseSuccess: false,
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 2 * (2 = 4)',
    label: 'type check',
    parseSuccess: false,
    errorMessage: 'Expected number but got boolean'
  },
  // TODO List
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
    input: '=1.core::T()',
    label: 'should success',
    parseSuccess: false,
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=1.core::START_WITH("123")',
    parseSuccess: false,
    label: 'TODO chain type 3',
    errorMessage: 'TODO build not all input parsed :3'
  },
  {
    input: '=123.excel::ABS()',
    parseSuccess: false,
    errorMessage: 'TODO build not all input parsed :5'
  },
  {
    input: '=excel::if(true, 1+2, "2")',
    parseSuccess: false,
    label: 'TODO downcase',
    errorMessage: 'TODO mismatch token FunctionCall'
  }
]

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const functionClauses = []
const formulaContext = new FormulaContext({ functionClauses })

const name = 'foo'
const meta = { variableId, namespaceId, name }

const parseInput = { formulaContext, meta }

describe('Simple test case', () => {
  testCases.forEach(({ input, label, lexSuccess = true, parseSuccess = true, errorMessage, value }) => {
    const prefix = label ? `[${label}] ` : ''
    const suffix = value !== undefined ? ` // => ${value}` : ' // => ✗'
    // eslint-disable-next-line jest/valid-title
    it(`${prefix}${input}${suffix}`, async () => {
      const newMeta = { ...meta, input }
      const { success, cst, errorType, errorMessages } = parse({ ...parseInput, meta: newMeta })
      const {
        success: interpretSuccess,
        result,
        errorMessages: interpretErrorMessages
      } = await interpret({ cst, meta: newMeta, formulaContext })

      if (value !== undefined) {
        expect(errorMessages).toEqual([])
        expect(interpretErrorMessages).toEqual([])

        expect(errorType).toEqual(undefined)
        expect(success).toEqual(true)

        expect(result.value).toEqual(value)
        expect(interpretSuccess).toEqual(true)
      } else if (!lexSuccess) {
        expect(errorMessages[0].message).toContain(errorMessage)
        expect(errorType).toEqual('lex')
      } else if (!parseSuccess) {
        expect(errorMessages[0].message).toContain(errorMessage)
        expect(errorType).toEqual('parse')
      } else {
        expect(errorMessages).toEqual([])

        expect(errorType).toEqual(undefined)
        expect(success).toEqual(true)

        expect(interpretSuccess).toEqual(false)
        expect(interpretErrorMessages[0].message).toContain(errorMessage)
        expect(result).toEqual(null)
      }
    })
  })
})
