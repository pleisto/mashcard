import { passwordHash, verifyPasswordHash } from '../passwordHash'

describe('passwordHash', () => {
  it('should work', () => {
    const input = Math.random().toString(36).substring(2, 15)
    expect(verifyPasswordHash(passwordHash(input), input)).toBe(true)

    const hash = '$argon2id$v=19$m=16000,t=2,p=1$Sjc1UDI2V3JlOEJiYzBXRA$bF1+pm5UGB+w1dCZu3r+tg'
    const hashStr = 'brickdoc'
    expect(verifyPasswordHash(hash, hashStr)).toBe(true)
  })
})
