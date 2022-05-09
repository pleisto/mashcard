import { faker } from '@faker-js/faker'
import { anyAscii, base58Decode, base58Encode, shortUUIDExpand, shortUUIDGen, UUIDShorten } from '../index'

describe('encoding utils', () => {
  it('should anyAscii work', () => {
    ;[
      ['Kõik-ἀνθρώπῳ', 'Koik-anthropo'],
      ['◐";╃╞말❤️㊎يَّة', '*";++Mal:heart:Jinyah'],
      ['我能吞下玻璃而不伤身体-私はガラスを食べられます', 'WoNengTunXiaBoLiErBuShangShenTi-SihagarasuoShiberaremasu'],
      ['', '']
    ].forEach(([input, expected]) => {
      expect(anyAscii(input)).toBe(expected)
    })
  })

  describe('base58', () => {
    it('should base58Encode work', () => {
      expect(base58Encode(Buffer.from([1, 2, 3]))).toEqual('Ldp')
      expect(base58Encode(Buffer.from('Life, Liberty and the pursuit of Happiness'))).toEqual(
        '2Gy1vRdFjrFi6PLggkXF8dnRB4VmzHTm8XdtRiWPWEg9qKKUWA5jQkusb8'
      )

      const randomWords = faker.random.words(5)
      expect(base58Decode(base58Encode(randomWords)).toString('utf8')).toEqual(randomWords)
    })
    it('should base58Decode work', () => {
      expect(base58Decode('Ldp')).toEqual(Buffer.from([1, 2, 3]))
      expect(base58Decode('tWTDXkXS')).toEqual(Buffer.from('gotcha'))
      // eslint-disable-next-line max-nested-callbacks
      expect(() => base58Decode('tWTDXkXS!')).toThrowError()
    })
  })

  it('should shortUUID work', () => {
    expect(shortUUIDGen()).toMatch(/^[a-zA-Z0-9].*$/)
    const payload = shortUUIDGen()
    expect(UUIDShorten(shortUUIDExpand(payload))).toEqual(payload)
    expect(UUIDShorten('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000')).toEqual('3C7KpBT6mHTxcU2X1KnbA7')
    expect(shortUUIDExpand('NSipejYiq2LiT9zcRSgc7n')).toEqual('ada74791-6f6d-4edc-a216-25680a2a805d')
  })
})
