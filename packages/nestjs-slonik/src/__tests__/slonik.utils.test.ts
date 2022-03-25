import { getPoolToken } from '../slonik.utils'
describe('SlonikUtils', () => {
  it('should getPoolToken work', () => {
    expect(getPoolToken()).toBe('defaultPostgresPool')

    expect(
      getPoolToken({
        connectionUri: 'foo'
      })
    ).toBe('defaultPostgresPool')

    expect(getPoolToken('bar')).toBe('barPostgresPool')
    expect(
      getPoolToken({
        connectionUri: 'foo',
        name: 'bar'
      })
    ).toBe('barPostgresPool')
  })
})
