import { name2Initials, string2Color } from '../initials'

describe('name2Initials', () => {
  it('should work', () => {
    expect(name2Initials('Sir. Timothy John Berners-Lee')).toEqual('SL')
    expect(name2Initials('张全蛋عربي/عربى')).toEqual('张')
  })
})

describe('string2Color', () => {
  it('should work', () => {
    expect(string2Color('hypercard')).toEqual('var(--brk-yellow-color-7)')
    expect(string2Color('🍐小花儿')).toEqual('var(--brk-red-color-6)')
  })
})
