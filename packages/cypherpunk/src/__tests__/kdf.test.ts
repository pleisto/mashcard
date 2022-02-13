import { generateKey, deriveKey } from '../kdf'

describe('kdf', () => {
  it('should generateKey work', () => {
    expect(typeof generateKey()).toBe('string')
  })

  it('should deriveKey work', () => {
    const key = '40ee6a6acf9a8e3b3a9182be373085a7ca6858f150dbf376f2c8353b10cb7155'
    const subKey = '3fd5374e4cab9dac821a446b604bae88568d1b62467c16d974ffe7c0619f476f'
    expect(deriveKey(key, 1, 'user1')).toBe(subKey)
    expect(deriveKey(key, 2, 'user1')).not.toBe(subKey)
    expect(deriveKey(key, 1, 'user2')).not.toBe(subKey)
  })
})
