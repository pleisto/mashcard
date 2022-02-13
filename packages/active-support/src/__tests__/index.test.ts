import { array2Tree } from '../index'

describe('.array2Tree', () => {
  it('should work', () => {
    expect(
      array2Tree([
        { id: '4', parentId: null, custom: 'abc' },
        { id: '31', parentId: '4', custom: '12' },
        { id: '1941', parentId: '418', custom: 'de' },
        { id: '1', parentId: '418', custom: 'ZZZz' },
        { id: '418', parentId: null, custom: 'ü' }
      ])
    ).toEqual([
      {
        children: [{ children: [], custom: '12', id: '31', parentId: '4' }],
        custom: 'abc',
        id: '4',
        parentId: null
      },
      {
        children: [
          { children: [], custom: 'de', id: '1941', parentId: '418' },
          { children: [], custom: 'ZZZz', id: '1', parentId: '418' }
        ],
        custom: 'ü',
        id: '418',
        parentId: null
      }
    ])
  })
})
