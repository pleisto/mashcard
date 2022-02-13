import { genericHash } from '../genericHash'

describe('genericHash', () => {
  it('should return the correct hash without key', () => {
    expect(genericHash('example')).toEqual('9796546c64ab15ab7468b479f3b3c20d5840af05ac0f999ad7a089512d01572e')

    expect(genericHash('应是天仙狂醉 乱把白云揉碎', undefined, 8)).toEqual('dcb1c0ade885d4a1')
  })
  it('should return the correct hash with salt', () => {
    expect(genericHash('🦴🥩📦🔗', 'abc')).toEqual('2086dee5213a3f4607a21ab184fd6c684ad37f198d00b2d1ea16aa71fefda88b')

    expect(genericHash('🦴🥩📦🔗', '404E635266568576D5A7134743756A586A576D5A71347437MAXMAXMAX')).toEqual(
      '7c0415154806acadb86183ed4b99355adff1a53f37e7314b94660c4c126f5245'
    )
  })
})
