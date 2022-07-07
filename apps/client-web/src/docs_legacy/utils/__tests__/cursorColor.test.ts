import { getCursorColor } from '../cursorColor'

describe('cursorColor', () => {
  it('should can get cursorColor', () => {
    expect(getCursorColor('test')).toBe('#c84116')
  })
})
