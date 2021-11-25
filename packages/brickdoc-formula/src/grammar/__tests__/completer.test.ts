import { complete } from '..'

describe('Complete', () => {
  it('work', () => {
    const input = '=123'
    const functionClauses = []
    const result = complete({ input, functionClauses })
    expect(result.length).toBe(2)
  })
})
