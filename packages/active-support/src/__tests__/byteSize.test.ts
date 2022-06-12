import { byteSize } from '../byteSize'

describe('.byteSize', () => {
  it('should work', () => {
    expect(byteSize('3 mb')).toEqual(24_000_000)
    expect(byteSize('2 Gigabytes')).toEqual(16_000_000_000)
    expect(byteSize('1 Byte')).toEqual(8)
    expect(byteSize(32_000_000)).toEqual('4 MB')
    expect(byteSize(2)).toEqual('2 Bits')
  })
})
