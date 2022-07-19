/* eslint-disable jest/no-conditional-expect */
import { parse, innerInterpret } from '../grammar/core'
import { ErrorMessageType, ParseErrorType } from '../type'
import { display as displayF } from '../context/persist'
import { makeContext } from '../tests/testHelper'

interface TestCase {
  input: string
  value?: any
  label?: string
  display?: string
  parseErrorType?: ParseErrorType
  errorMessage?: ErrorMessageType
  debug?: true
}

const namespaceId = '11111111-1111-4444-1111-111111111111'
const barNamespaceId = '11111111-1111-6666-1111-111111111111'
const barVariableId = '44444444-4444-7777-9999-cccccccccccc'
const bazVariableId = 'cccccccc-cccc-1111-bbbb-dddddddddddd'

const testCases: TestCase[] = [
  {
    input: `=Self`,
    value: { kind: 'self' }
  },
  {
    input: `=&#${barNamespaceId}.bar`,
    // value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId }
    parseErrorType: 'syntax',
    errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"#"' }]
  },
  {
    input: `=&#${barNamespaceId}.bar.foo`,
    // value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId, attribute: 'foo' }
    parseErrorType: 'syntax',
    errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"#"' }]
  },
  {
    input: '=&Self',
    value: { kind: 'self' }
  },
  {
    input: '=&Self."foo bar"',
    value: { kind: 'self', attribute: 'foo bar' }
  },
  // Combine
  {
    input: '=Input.foo',
    value: { message: ['errors.interpret.not_found.key', { key: 'foo' }], type: 'runtime' }
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
    value: { message: 'Argument 2 not found', type: 'runtime' }
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
        variableParseResult: { cst, codeFragments, definition: newInput },
        errorType,
        errorMessages,
        inputImage,
        parseImage
      } = parseResult

      if (label) {
        expect(codeFragments).toMatchSnapshot()
      }

      if (debug) {
        expect(cst).toMatchSnapshot()
        expect({ newInput, input, inputImage, parseImage }).toMatchSnapshot()
      }

      if (value !== undefined) {
        const variableValue = await innerInterpret({ parseResult, ctx: { ...ctx, meta: newMeta } })
        const displayResult = displayF(variableValue.result, ctx.formulaContext)

        expect(errorMessages).toEqual([])

        expect(errorType).toEqual(undefined)
        expect(success).toEqual(true)

        if (display) {
          expect(displayResult.result).toEqual(display)
        } else {
          expect(variableValue.result.result).toEqual(value)
          expect(variableValue.success).toEqual(true)
        }
      } else if (parseErrorType) {
        expect(errorMessages[0]).not.toEqual(undefined)
        expect(errorMessages[0]!.message).toEqual(errorMessage)
        expect(errorType).toEqual(parseErrorType)
      } else {
        throw new Error('Unexpected error')
      }
    })
  })
})
