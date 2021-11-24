import { complete } from '..'

describe('Complete', () => {
  it('work', () => {
    const input = '=123'
    const context = {}
    const functionClauses = []
    const result = complete({ input, functionClauses, context })
    expect(result.length).toBe(2)
  })
})
