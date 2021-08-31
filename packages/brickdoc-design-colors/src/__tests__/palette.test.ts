import { colorWithShade, cssStr2color, color2cssStr, colorPalette } from '../index'
import { Shade } from '../palette'

describe('colorPalette', () => {
  it('shoudle color2sahde work', () => {
    const red = cssStr2color('#d43730')
    expect(colorPalette('rgba(84,122,255,0.42)', '2')).toEqual('rgba(228, 234, 255, 0.42)')
    expect(color2cssStr(colorWithShade(red, Shade.Shade1, true))).toEqual('#080202')
    expect(color2cssStr(colorWithShade(red, Shade.Shade8, true))).toEqual('#e78883')
  })
})
