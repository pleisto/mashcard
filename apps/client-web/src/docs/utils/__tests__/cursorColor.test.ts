import { getCursorColor } from '../cursorColor'

describe('cursorColor', () => {
  it('should can get cursorColor', () => {
    expect(getCursorColor('test')).toBe('var(--mc-colors-orange8)')
  })
})
