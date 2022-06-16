import { dispatchFormulaBlockNameChange, dispatchFormulaBlockSoftDelete } from '../../events'
import { mockBlock } from '../testMock'
import { TestCaseInterface } from '../testType'

const page0Id = '44444444-5555-6666-7777-444444444444'
const page1Id = '55555555-6666-7777-8888-999999999999'

interface AllowEvents {
  change: typeof dispatchFormulaBlockNameChange
  delete: typeof dispatchFormulaBlockSoftDelete
}

type DistributeEvents<Event extends keyof AllowEvents> = Event extends keyof AllowEvents
  ? [AllowEvents[Event], Omit<Parameters<AllowEvents[Event]>[0], 'username'>]
  : never

const buildEvent: (
  input: Array<DistributeEvents<keyof AllowEvents>>
) => NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]['event'] = input => {
  return async ctx => {
    for (const [f, args] of input) {
      await f({ ...args, username: ctx.formulaContext.domain } as any)
    }
  }
}

export const BlockEventTestCase: TestCaseInterface = {
  name: 'blockEvent',
  testCases: {
    pages: [
      {
        pageName: 'BlockEventPage1',
        pageId: page0Id,
        variables: [{ variableName: 'num0', definition: '=0' }]
      }
    ],
    eventTestCases: [
      {
        definition: '=UnknownToken',
        resultBefore: '"UnknownToken" not found',
        resultAfter: '"UnknownToken" not found',
        event: buildEvent([])
      },
      {
        definition: '=Page1',
        resultBefore: '"Page1" not found',
        resultAfter: mockBlock('Page1', page1Id),
        event: buildEvent([[dispatchFormulaBlockNameChange, { id: page1Id, name: 'Page1' }]])
      },
      {
        definition: '=Page1',
        resultBefore: '"Page1" not found',
        resultAfter: mockBlock('Page1 modified', page1Id),
        variableParseResultAfter: { definition: '="Page1 modified"' },
        event: buildEvent([
          [dispatchFormulaBlockNameChange, { id: page1Id, name: 'Page1' }],
          [dispatchFormulaBlockNameChange, { id: page1Id, name: 'Page1 modified' }]
        ])
      },
      {
        definition: '=Page1.num0',
        resultBefore: '"Page1" not found',
        resultAfter: 0,
        event: buildEvent([[dispatchFormulaBlockNameChange, { id: page0Id, name: 'Page1' }]])
      },
      {
        definition: '=Page1.num0',
        resultBefore: '"Page1" not found',
        resultAfter: 0,
        variableParseResultAfter: { definition: '="Page1 modified2".num0' },
        event: buildEvent([
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'Page1' }],
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'Page1 modified2' }]
        ])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: mockBlock('BlockEventPage1', page0Id),
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([[dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage1' }]])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: mockBlock('BlockEventPage222', page0Id),
        variableParseResultAfter: { definition: '=BlockEventPage222' },
        event: buildEvent([[dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage222' }]])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: 0,
        variableParseResultAfter: { definition: '=BlockEventPage1.num0' },
        event: buildEvent([[dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage1' }]])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: 0,
        variableParseResultAfter: { definition: '="BlockEventPage222 new".num0' },
        event: buildEvent([
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage222' }],
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage222 new' }]
        ])
      },
      {
        definition: '=BlockEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        resultAfter: '"unknownVariable" not found',
        variableParseResultAfter: { definition: '=BlockEventPage1.unknownVariable' },
        event: buildEvent([[dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage1' }]])
      },
      {
        definition: '=BlockEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        resultAfter: '"unknownVariable" not found',
        variableParseResultAfter: { definition: '="BlockEventPage222 new".unknownVariable' },
        event: buildEvent([
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage222' }],
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage222 new' }]
        ])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: '"BlockEventPage1" not found',
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([[dispatchFormulaBlockSoftDelete, { id: page0Id }]])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: '"BlockEventPage1" not found',
        variableParseResultAfter: { definition: '=BlockEventPage1.num0' },
        event: buildEvent([[dispatchFormulaBlockSoftDelete, { id: page0Id }]])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: mockBlock('BlockEventPage1', page0Id),
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([
          [dispatchFormulaBlockSoftDelete, { id: page0Id }],
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage1' }]
        ])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: mockBlock('BlockEventPage1', page1Id),
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([
          [dispatchFormulaBlockSoftDelete, { id: page0Id }],
          [dispatchFormulaBlockNameChange, { id: page1Id, name: 'BlockEventPage1' }]
        ])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: 0,
        variableParseResultAfter: { definition: '=BlockEventPage1new.num0' },
        event: buildEvent([
          [dispatchFormulaBlockSoftDelete, { id: page0Id }],
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage1' }],
          [dispatchFormulaBlockNameChange, { id: page0Id, name: 'BlockEventPage1new' }]
        ])
      }
    ]
  }
}
