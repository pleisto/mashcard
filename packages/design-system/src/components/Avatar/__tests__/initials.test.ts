import { name2Initials } from '../initials'

describe('Avatar intials', () => {
  it.each([
    // single initial
    { name: 'abc', expected: 'A' },
    { name: '123', expected: '1' },
    { name: '赵钱孙李', expected: '赵' },
    { name: ' John', expected: 'J' }, // leading space
    { name: 'John ', expected: 'J' }, // trailing space
    { name: ' John ', expected: 'J' }, // wrapping space
    // two or more initials
    { name: 'ABC', expected: 'AC' },
    { name: 'HelloWorld', expected: 'HW' },
    { name: 'John Smith', expected: 'JS' },
    { name: 'John Doe Smith', expected: 'JS' },
    { name: '1 2', expected: '12' },
    { name: '赵 钱', expected: '赵钱' },
    // edge case
    { name: '    ', expected: '' }
  ])('should have "$expected" as the initials of "$name"', ({ name, expected }) => {
    expect(name2Initials(name)).toBe(expected)
  })
})
