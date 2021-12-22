/* eslint-disable jest/no-conditional-expect */
import { interpret, parse, quickInsert } from '../..'
import { FormulaContext } from '../../context'

const formulaContext = new FormulaContext({})
const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const barVariableId = '28e28190-63bd-4f70-aeca-26e72574c01a'
const testVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'
const unknownVariableId = '99499117-5694-4d83-9ccd-85a3ab0b8f25'

const testName1 = 'varvarabcvar'

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const meta = { namespaceId, variableId, name: testName1, input: '=24' }
const barMeta = { namespaceId, variableId: barVariableId, name: 'bar', input: `=$${namespaceId}@${variableId}` }
describe('Controls', () => {
  beforeAll(async () => {
    await quickInsert({ formulaContext, meta })
    await quickInsert({ formulaContext, meta: barMeta })
  })

  interface TestCase {
    input: string
    label: string
    parseErrorMessage: string | undefined
    result: any
  }

  const testCases: TestCase[] = [
    {
      label: 'set error',
      input: '= Set(a, 1)',
      parseErrorMessage: 'Unknown function a',
      result: null
    },
    {
      label: 'set ok',
      input: `=Set($${namespaceId}@${variableId}, 1)`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'set ok 2',
      input: `=Set($${namespaceId}@${variableId}, (1 + $${namespaceId}@${variableId} + $${namespaceId}@${variableId}))`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'set multiple line',
      input: `=Set($${namespaceId}@${variableId}, (1 + $${namespaceId}@${variableId})); Set($${namespaceId}@${variableId}, (123))`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'set unknown',
      input: `=Set($${namespaceId}@${unknownVariableId}, 1)`,
      parseErrorMessage: `Variable not found: ${unknownVariableId}`,
      result: null
    },
    {
      label: 'set expression',
      input: `=Set($${namespaceId}@${barVariableId}, 1)`,
      parseErrorMessage: undefined,
      result: 'Only constant variable is supported'
    },
    {
      label: 'button',
      input: `=Button("Foo", Set($${namespaceId}@${variableId}, (1 + $${namespaceId}@${variableId})))`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'button multiple set',
      input: `=Button("Foo", Set($${namespaceId}@${variableId}, (1 + $${namespaceId}@${variableId})); Set($${namespaceId}@${variableId}, (123)))`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'switch set',
      input: `=Switch(true, Set($${namespaceId}@${variableId}, (1 + $${namespaceId}@${variableId})); Set($${namespaceId}@${variableId}, (123)))`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'select ok',
      input: `=Select([1,2,3], Set($${namespaceId}@${variableId}, Input.selected))`,
      parseErrorMessage: undefined,
      result: SNAPSHOT_FLAG
    },
    {
      label: 'select []',
      input: `=Select([], Set($${namespaceId}@${variableId}, Input.selected))`,
      parseErrorMessage: undefined,
      result: 'Select expects non empty options'
    },
    {
      label: 'select [[]]',
      input: `=Select([[]], Set($${namespaceId}@${variableId}, Input.selected))`,
      parseErrorMessage: undefined,
      result: 'Select expects an array of strings'
    }
  ]

  testCases.forEach(({ input, label, parseErrorMessage, result }) => {
    it(`[${label}] ${input}`, async () => {
      const meta = { namespaceId, variableId: testVariableId, name: 'foo', input }
      const { errorMessages, valid, codeFragments, cst, success } = parse({
        formulaContext,
        meta
      })

      expect(valid).toBe(true)
      expect(codeFragments).toMatchSnapshot()
      expect(errorMessages[0]?.message).toEqual(parseErrorMessage)

      if (success) {
        const {
          success: interpretSuccess,
          variableValue,
          errorMessages: interpretErrorMessages
        } = await interpret({ cst, meta, formulaContext, interpretContext: {} })

        expect(interpretSuccess).toBe(true)
        expect(interpretErrorMessages).toEqual([])
        if (result === SNAPSHOT_FLAG) {
          expect(variableValue.result).toMatchSnapshot()
        } else {
          expect(variableValue.result.result).toEqual(result)
        }
      }
    })
  })
})
