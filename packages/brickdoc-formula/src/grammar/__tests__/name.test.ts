import { checkValidName } from '../util'

const validNames: Array<{ name: string }> = [{ name: 'a213' }, { name: '_a' }, { name: 'a_' }, { name: 'a测试' }]
const invalidNames: Array<{ name: string }> = [
  { name: '123' },
  { name: '1a' },
  { name: 'a+1' },
  { name: 'a;a' },
  { name: ' aa' },
  { name: 'a ' },
  { name: '' },
  { name: '测试' },

  // Blank
  { name: 'a a' },
  { name: 'a\na' },
  { name: 'a\u2003a' },

  // Special char
  { name: 'a!' },
  { name: 'a@' },
  { name: 'a#' },
  { name: 'a$' },
  { name: 'a%' },
  { name: 'a^' },
  { name: 'a&' },
  { name: 'a*' },
  { name: 'a(' },
  { name: 'a)' },
  { name: 'a-' },
  { name: 'a[' },
  { name: 'a]' },
  { name: 'a{' },
  { name: 'a}' },
  { name: 'a\\' },
  { name: 'a|' },
  { name: 'a:' },
  { name: 'a"' },
  { name: "a'" },
  { name: 'a<' },
  { name: 'a>' },
  { name: 'a?' },
  { name: 'a/' },
  { name: 'a.' },
  { name: 'a,' },
  { name: 'a;' },
  { name: 'a`' },
  { name: 'a~' },
  { name: 'a=' },
  { name: 'a+' }
]

describe('name', () => {
  it.each(validNames)('valid: "$name"', ({ name }) => {
    expect(checkValidName(name)).toBe(true)
  })

  it.each(invalidNames)('invalid: "$name"', ({ name }) => {
    expect(checkValidName(name)).toBe(false)
  })
})
