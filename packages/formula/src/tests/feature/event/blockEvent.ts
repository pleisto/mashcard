import { buildEvent, generateUUIDs } from '../../testHelper'
import { mockBlock } from '../../testMock'
import { TestCaseInterface } from '../../testType'

const [page0Id, page1Id] = generateUUIDs()

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
        event: buildEvent([])
      },
      {
        definition: '=Page1',
        resultBefore: '"Page1" not found',
        resultAfter: mockBlock('Page1', page1Id),
        event: buildEvent([['blockChangeName', { id: page1Id, name: 'Page1' }]])
      },
      {
        definition: '=Page1',
        resultBefore: '"Page1" not found',
        resultAfter: mockBlock('Page1 modified', page1Id),
        variableParseResultAfter: { definition: '="Page1 modified"' },
        event: buildEvent([
          ['blockChangeName', { id: page1Id, name: 'Page1' }],
          ['blockChangeName', { id: page1Id, name: 'Page1 modified' }]
        ])
      },
      {
        definition: '=Page1.num0',
        resultBefore: '"Page1" not found',
        resultAfter: 0,
        event: buildEvent([['blockChangeName', { id: page0Id, name: 'Page1' }]])
      },
      {
        definition: '=Page1.num0',
        resultBefore: '"Page1" not found',
        resultAfter: 0,
        variableParseResultAfter: { definition: '="Page1 modified2".num0' },
        event: buildEvent([
          ['blockChangeName', { id: page0Id, name: 'Page1' }],
          ['blockChangeName', { id: page0Id, name: 'Page1 modified2' }]
        ])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([['blockChangeName', { id: page0Id, name: 'BlockEventPage1' }]])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: mockBlock('BlockEventPage222', page0Id),
        variableParseResultAfter: { definition: '=BlockEventPage222' },
        event: buildEvent([['blockChangeName', { id: page0Id, name: 'BlockEventPage222' }]])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: 0,
        variableParseResultAfter: { definition: '=BlockEventPage1.num0' },
        event: buildEvent([['blockChangeName', { id: page0Id, name: 'BlockEventPage1' }]])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: 0,
        variableParseResultAfter: { definition: '="BlockEventPage222 new".num0' },
        event: buildEvent([
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage222' }],
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage222 new' }]
        ])
      },
      {
        definition: '=BlockEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        variableParseResultAfter: { definition: '=BlockEventPage1.unknownVariable' },
        event: buildEvent([['blockChangeName', { id: page0Id, name: 'BlockEventPage1' }]])
      },
      {
        definition: '=BlockEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        variableParseResultAfter: { definition: '="BlockEventPage222 new".unknownVariable' },
        event: buildEvent([
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage222' }],
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage222 new' }]
        ])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: '"BlockEventPage1" not found',
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([['blockDelete', { id: page0Id }]])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        resultAfter: '"BlockEventPage1" not found',
        variableParseResultAfter: { definition: '=BlockEventPage1.num0' },
        event: buildEvent([['blockDelete', { id: page0Id }]])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([
          ['blockDelete', { id: page0Id }],
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage1' }]
        ])
      },
      {
        definition: '=BlockEventPage1',
        resultBefore: mockBlock('BlockEventPage1', page0Id),
        resultAfter: mockBlock('BlockEventPage1', page1Id),
        variableParseResultAfter: { definition: '=BlockEventPage1' },
        event: buildEvent([
          ['blockDelete', { id: page0Id }],
          ['blockChangeName', { id: page1Id, name: 'BlockEventPage1' }]
        ])
      },
      {
        definition: '=BlockEventPage1.num0',
        resultBefore: 0,
        variableParseResultAfter: { definition: '=BlockEventPage1new.num0' },
        event: buildEvent([
          ['blockDelete', { id: page0Id }],
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage1' }],
          ['blockChangeName', { id: page0Id, name: 'BlockEventPage1new' }]
        ])
      }
    ]
  }
}
