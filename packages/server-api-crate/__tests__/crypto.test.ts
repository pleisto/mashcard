import { faker } from '@faker-js/faker'
import {
  genericHash,
  deriveKey,
  generateKey,
  passwordHash,
  passwordHashVerify,
  aeadDecrypt,
  aeadEncrypt,
  intDecrypt,
  intEncrypt
} from '../index'
describe('common.crypto', () => {
  it('should genericHash work', () => {
    expect(genericHash('example')).toEqual('9796546c64ab15ab7468b479f3b3c20d5840af05ac0f999ad7a089512d01572e')
    expect(genericHash('i')).toEqual('e9c0ba08015769a0c4354594b96ce0dfbf27c9eb534a2f8378508985f732ff6d')
    expect(() => genericHash('i', '')).toThrowErrorMatchingSnapshot()
    expect(genericHash('W', '9e85f68e3850f9a65d97c1033e4fb207b611b78e9bf75cfd229d00cb55a520c0')).toEqual(
      'c6f1fb2edd6fb5db8a1471c80c9f08e1dfaa566d18ea748c329d245b4141b2f6'
    )
  })

  it('should deriveKey work', () => {
    const key = '40ee6a6acf9a8e3b3a9182be373085a7ca6858f150dbf376f2c8353b10cb7155'
    const subKey = 'd89ebe7a477b24ff8ade6137cd34f6adcaedd061a23a00ad482cb07454db92fc'
    expect(deriveKey(key, 1, 'user1')).toBe(subKey)
    expect(deriveKey(key, 2, 'user1')).toBe(deriveKey(key, 2, 'user1'))
    expect(deriveKey(key, 3, 'user1')).not.toBe(subKey)
    expect(deriveKey(key, 1, 'user2')).not.toBe(subKey)
  })

  it('should generateKey work', () => {
    expect(typeof deriveKey(generateKey(), 1)).toBe('string')
    expect(generateKey).not.toEqual(generateKey())
  })

  it('should passwordHash work', async () => {
    const plain = faker.random.word()
    const hashed = await passwordHash(plain)
    expect(await passwordHashVerify(hashed, plain)).toBeTruthy()
  })

  it('should aeadEncrypt work', () => {
    const key = generateKey()
    const plain = 'Made with ❤️ in Earth'
    expect(aeadDecrypt(aeadEncrypt(plain, key), key)).toStrictEqual(Buffer.from(plain))
  })

  it('should intEncrypt work', () => {
    const key = generateKey()
    const number = faker.datatype.number({ min: 1, max: Number.MAX_SAFE_INTEGER - 1 })
    expect(intDecrypt(intEncrypt(number, key), key)).toBe(number)
    expect(intDecrypt(intEncrypt(number, key), generateKey())).not.toBe(number)
    expect(intDecrypt(intEncrypt(Number.MAX_SAFE_INTEGER, key), key)).toBe(Number.MAX_SAFE_INTEGER)
  })
})
