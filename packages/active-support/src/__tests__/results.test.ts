import { safeJsonParse } from '../results'

describe('results', () => {
  it('should safeJsonParse work', () => {
    expect(safeJsonParse('x1').unwrapOr({ a: 1 })).toEqual({ a: 1 })
    expect(safeJsonParse('{"a": 2}').unwrapOr({ a: 1 })).toEqual({ a: 2 })
  })
})
