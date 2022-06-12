import { EventScope } from '../types'
import { shouldReceiveEvent } from '../grammar/util'

const testCases: Array<{
  listenedScope: EventScope
  eventScope: EventScope | null
  label: string
  result: boolean
}> = [
  {
    listenedScope: {},
    eventScope: null,
    label: 'empty',
    result: true
  },
  {
    listenedScope: {},
    eventScope: { columns: ['column1'], rows: ['row1'] },
    label: 'cell change',
    result: false
  },
  {
    listenedScope: {},
    eventScope: {},
    label: 'empty2',
    result: true
  },
  {
    listenedScope: { rows: [], columns: [] },
    eventScope: { rows: [], columns: [] },
    label: 'empty3',
    result: true
  },
  {
    listenedScope: { columns: [] },
    eventScope: { rows: [], columns: [] },
    label: 'empty4',
    result: true
  },
  {
    listenedScope: { columns: [] },
    eventScope: { rows: [] },
    label: 'empty5',
    result: true
  },
  {
    listenedScope: { columns: [] },
    eventScope: { columns: ['column2', 'column3'] },
    label: 'empty6',
    result: true
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: {},
    label: 'column - spreadsheet',
    result: true
  },
  {
    listenedScope: { rows: ['row1'] },
    eventScope: {},
    label: 'row - spreadsheet',
    result: true
  },
  {
    listenedScope: { columns: ['column1'], rows: ['row1'] },
    eventScope: {},
    label: 'cell - spreadsheet',
    result: true
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { columns: ['column1'] },
    label: 'column1 ',
    result: true
  },
  {
    listenedScope: { columns: ['column1', 'column2'] },
    eventScope: { columns: ['column1'] },
    label: 'column1 2',
    result: true
  },
  {
    listenedScope: { columns: ['column1', 'column2'] },
    eventScope: { columns: ['column1', 'column3'] },
    label: 'column1 3',
    result: true
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { columns: ['column1', 'column3'] },
    label: 'column1 4',
    result: true
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { columns: ['column2', 'column3'] },
    label: 'column1 5',
    result: false
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { rows: ['row1'] },
    label: 'column - row',
    result: true
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { rows: ['row1'], columns: ['column1'] },
    label: 'column - cell1',
    result: true
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { rows: ['row1'], columns: ['column2'] },
    label: 'column - cell2',
    result: false
  },
  {
    listenedScope: { rows: ['row1'] },
    eventScope: { columns: ['column1'] },
    label: 'row - column',
    result: true
  },
  {
    listenedScope: { rows: ['row1'] },
    eventScope: { rows: ['row1'], columns: ['column1'] },
    label: 'row - cell1',
    result: true
  },
  {
    listenedScope: { rows: ['row1'] },
    eventScope: { rows: ['row2'], columns: ['column1'] },
    label: 'row - cell2',
    result: false
  },
  {
    listenedScope: { columns: ['column1'], rows: ['row1'] },
    eventScope: { columns: ['column1'], rows: ['row1'] },
    label: 'matched',
    result: true
  },
  {
    listenedScope: { columns: ['column1'], rows: ['row1'] },
    eventScope: { columns: ['column1'], rows: ['row2'] },
    label: 'not matched',
    result: false
  },
  {
    listenedScope: { columns: ['column1'], rows: ['row1'] },
    eventScope: { columns: ['column1'] },
    label: 'only column',
    result: true
  },
  {
    listenedScope: { columns: ['column1'], rows: ['row1'] },
    eventScope: { columns: ['column2', 'column3'] },
    label: 'column not match',
    result: false
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { columns: ['column2', 'column3'], rows: ['row1'] },
    label: 'cell update 1',
    result: false
  },
  {
    listenedScope: { columns: ['column1'] },
    eventScope: { columns: ['column1', 'column3'], rows: ['row1'] },
    label: 'cell update 2',
    result: true
  },
  {
    listenedScope: { rows: ['row1'] },
    eventScope: { columns: ['column1', 'column3'], rows: ['row1'] },
    label: 'cell update 3',
    result: true
  }
]

describe('shouldReceiveEvent', () => {
  it.each(testCases)('"$label => $result"', ({ listenedScope, eventScope, result }) => {
    expect(shouldReceiveEvent(listenedScope, eventScope)).toBe(result)
  })
})
