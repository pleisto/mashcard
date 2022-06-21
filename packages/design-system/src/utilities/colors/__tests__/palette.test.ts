import { cssStr2color, color2cssStr } from '../converter'
import { colorWithShade, generatePalette, Shade } from '../palette'

describe('colorPalette', () => {
  it('shoudle color2sahde work', () => {
    const red = cssStr2color('#d43730')
    expect(color2cssStr(colorWithShade(red!, Shade.Shade1, true)!)).toEqual('#080202')
    expect(color2cssStr(colorWithShade(red!, Shade.Shade8, true)!)).toEqual('#e78883')
    expect(generatePalette('test', '#d5c4ff')).toEqual({
      test1: '#beafe3',
      test2: '#a699c7',
      test3: '#8f84ab',
      test4: '#776e8f',
      test5: '#605873',
      test6: '#d5c4ff',
      test7: '#484357',
      test8: '#312d3b',
      test9: '#1a181f'
    })
  })
})
