import { millisecondsToSeconds, array2Tree } from '../index'

describe('millisecondsToSeconds', () => {
  it('should work', () => {
    expect(millisecondsToSeconds(20200828009)).toEqual(20200828)
  })
})

describe('array2Tree', () => {
  it('should work', () => {
    expect(
      array2Tree([
        { id: '4', parentId: null, custom: 'abc' },
        { id: '31', parentId: '4', custom: '12' },
        { id: '1941', parentId: '418', custom: 'de' },
        { id: '1', parentId: '418', custom: 'ZZZz' },
        { id: '418', parentId: null, custom: 'ü' }
      ])
    ).toEqual(20200828)
  })
})
