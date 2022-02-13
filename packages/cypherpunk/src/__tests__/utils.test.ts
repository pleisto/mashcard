import { fixedLengthBuffer } from '../utils'

describe('utils', () => {
  it('should fixedLengthBuffer work', () => {
    const input = '1234567890'
    expect(fixedLengthBuffer(input, 10).toString()).toBe(input)

    const input2 = '12345678901234567890'
    expect(fixedLengthBuffer(input2, 10).toString()).toBe(input)

    const input3 = '123'
    expect(fixedLengthBuffer(input3, 10).toString()).toBe('1231231231')
  })
})
