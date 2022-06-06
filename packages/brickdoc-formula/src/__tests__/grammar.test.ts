/* eslint-disable jest/no-conditional-expect */
import { parse, innerInterpret } from '../grammar/core'
import { ParseErrorType } from '../types'
import { displayValue } from '../context/persist'
import { makeContext } from '../tests/testHelper'

interface TestCase {
  input: string
  value?: any
  label?: string
  display?: string
  parseErrorType?: ParseErrorType
  errorMessage?: string
  debug?: true
}

const namespaceId = '11111111-1111-4444-1111-111111111111'
const barNamespaceId = '11111111-1111-6666-1111-111111111111'
const barVariableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const bazVariableId = 'c53c6bf7-c79f-40ce-be2c-da916f1cdb5f'

const testCases: TestCase[] = [
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
    input: '=123123123123123123123',
    label: 'js precision',
    value: 123123123123123130000
  },
  // {
  //   input: '=[2, "foo", true, null].Map(1)',
  //   label: 'Array Map',
  //   value: [
  //     { type: 'number', result: 1 },
  //     { type: 'number', result: 1 },
  //     { type: 'number', result: 1 },
  //     { type: 'number', result: 1 }
  //   ]
  // },
  // {
  //   input: '=[2, "foo", true, null].Map($1)',
  //   label: 'Array Map $1',
  //   value: [
  //     { type: 'number', result: 2 },
  //     { type: 'string', result: 'foo' },
  //     { type: 'boolean', result: true },
  //     { type: 'null', result: null }
  //   ]
  // },
  // Reference
  {
    input: `=Self`,
    value: { kind: 'self' }
  },
  {
    input: `=#`,
    parseErrorType: 'syntax',
    errorMessage: 'Miss expression'
  },
  {
    input: `=#CurrentBlock`,
    value: 'SNAPSHOT',
    display: 'Page1'
  },
  {
    input: `=&#${barNamespaceId}.bar`,
    // value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId }
    parseErrorType: 'syntax',
    errorMessage: 'Parse error: "#"'
  },
  {
    input: `=&#${barNamespaceId}.bar.foo`,
    // value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId, attribute: 'foo' }
    parseErrorType: 'syntax',
    errorMessage: 'Parse error: "#"'
  },
  {
    input: '=&Self',
    value: { kind: 'self' }
  },
  {
    input: '=&Self."foo bar"',
    value: { kind: 'self', attribute: 'foo bar' }
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
    input: '=-1.',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '=01',
    value: 1
  },
  {
    input: '=0001.0000',
    value: 1
  },
  {
    input: '=1.%',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
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
    errorMessage: 'Not all input parsed: lo'
  },
  {
    input: "= 'hello'",
    label: 'Single quote => parseError',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  {
    input: '= "Hello',
    label: 'ParseError without closing quote',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error: "\\"Hello"'
  },
  // %
  {
    input: '= 2%',
    value: 0.02
  },
  {
    input: '=5100%',
    value: 51
  },
  // Combine
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
    input: '= IFERROR(1/0, "Foo")',
    value: 'Foo'
  },
  {
    input: '=DATE("")',
    value: new Date(NaN),
    display: 'Invalid Date'
  },
  {
    input: '=DATE("22/2/2022")',
    value: new Date(NaN),
    display: 'Invalid Date'
  },
  {
    input: '=DATE("2022-2-22")',
    value: new Date('2022-2-22'),
    display: new Date('2022-2-22').toISOString()
  },
  // Case insensitive
  {
    input: '=if(true, 1+2, "2")',
    label: 'Case insensitive',
    value: 3
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
  // TODO List
  {
    input: '= 中文',
    label: 'TODO chinese',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  {
    input: '= 1a1',
    label: 'TODO 1a1',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: a1'
  },
  {
    input: '=varvarabc中文var',
    label: 'TODO chinese2',
    parseErrorType: 'syntax',
    errorMessage: 'Unknown function varvarabc'
  },
  {
    input: '= nottrue',
    label: 'not is a operator',
    parseErrorType: 'syntax',
    errorMessage: 'Unknown function nottrue'
  }
]

describe('Simple test case TODO', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext({
      pages: [
        {
          pageName: 'Page1',
          pageId: namespaceId,
          variables: [
            {
              variableId: bazVariableId,
              definition: '=25',
              variableName: 'baz'
            }
          ]
        },
        {
          pageName: 'Untitled',
          pageId: barNamespaceId,
          variables: [
            {
              variableId: barVariableId,
              definition: '=24',
              variableName: 'bar'
            }
          ]
        }
      ]
    })
  })

  testCases.forEach(({ input, label, parseErrorType, errorMessage, value, debug, display }) => {
    const prefix = label ? `[${label}] ` : ''
    const suffix = value !== undefined ? ` // => ${value}` : ' // => ✗'
    it(`${prefix}${input}${suffix}`, async () => {
      const newMeta = ctx.buildMeta({ definition: input })
      const parseResult = parse({ ...ctx, meta: newMeta })
      const {
        success,
        variableParseResult: { cst, kind, codeFragments, definition: newInput },
        errorType,
        errorMessages,
        completions,
        inputImage,
        parseImage
      } = parseResult

      if (kind === 'literal') {
        expect(completions.length).toEqual(0)
      } else {
        expect(completions.length).not.toEqual(0)
      }

      if (label) {
        expect(codeFragments).toMatchSnapshot()
      }

      if (debug) {
        expect(cst).toMatchSnapshot()
        expect({ newInput, input, inputImage, parseImage }).toMatchSnapshot()
      }

      if (value !== undefined) {
        const variableValue = await innerInterpret({ parseResult, ctx: { ...ctx, meta: newMeta } })
        const displayResult = displayValue(variableValue.result, '')

        expect(errorMessages).toEqual([])

        expect(errorType).toEqual(undefined)
        expect(success).toEqual(true)

        if (display) {
          expect(displayResult).toEqual(display)
        } else {
          expect(variableValue.result.result).toEqual(value)
          expect(variableValue.success).toEqual(true)
        }
      } else if (parseErrorType) {
        expect(errorMessages[0]).not.toEqual(undefined)
        expect(errorMessages[0]!.message).toContain(errorMessage)
        expect(errorType).toEqual(parseErrorType)
      } else {
        throw new Error('Unexpected error')
      }
    })
  })
})
