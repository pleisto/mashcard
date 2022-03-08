import { columnDisplayIndex } from '../helper'

describe('Spreadsheet Helper', () => {
  it('index to display', () => {
    expect(columnDisplayIndex(0)).toBe('A')
    expect(columnDisplayIndex(25)).toBe('Z')

    expect(columnDisplayIndex(26)).toBe('AA')
    expect(columnDisplayIndex(51)).toBe('AZ')

    expect(columnDisplayIndex(52)).toBe('BA')

    expect(columnDisplayIndex(702)).toBe('AAA')
  })
})
