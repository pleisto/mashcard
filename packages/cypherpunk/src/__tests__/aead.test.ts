import { aeadEncrypt, aeadDecrypt } from '../aead'

describe('aead', () => {
  it('should work', () => {
    const key = Math.random().toString(36).substring(2, 15)
    const plain = 'Made with ❤️ in Earth'
    expect(aeadDecrypt(aeadEncrypt(plain, key), key)).toBe(plain)
  })

  it('should work with CJK chars', () => {
    const cjk = '私は硝子を食べられます'
    const c = 'wQ6u5KTsyJOY0qwel0AYa+Q0hN1BgW6D$5T8GN6QV6USsV5Y6SNLB3c6SCAZrc9+RSj57Rj1+ok3WDi0Z7849qBM4r0lzZmyZmg=='
    expect(aeadDecrypt(c, cjk)).toBe(cjk)
  })
})
