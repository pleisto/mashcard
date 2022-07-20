import { getCursorColor } from '../cursorColor'
import { theme } from '@mashcard/design-system'

describe('cursorColor', () => {
  it('should can get cursorColor', () => {
    expect(getCursorColor('test')).toBe(theme.colors.orange8.value)
  })
})
