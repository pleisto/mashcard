import { chunk, compact, drop, dropRight, initial, uniq, reject, cloneDeep } from '../modernLodash'

describe('.chunk', () => {
  const array = [0, 1, 2, 3, 4, 5]
  it('should work', () => {
    expect(chunk(array, 3)).toEqual([
      [0, 1, 2],
      [3, 4, 5]
    ])
    expect(chunk(array, 4)).toEqual([
      [0, 1, 2, 3],
      [4, 5]
    ])
    expect(chunk(array, 0)).toEqual([])
    expect(chunk(array, -1)).toEqual([])
    expect(chunk(array)).toEqual([[0], [1], [2], [3], [4], [5]])
  })
  it('should coerce size to an integer', () => {
    expect(chunk(array, array.length / 4)).toEqual([[0], [1], [2], [3], [4], [5]])
  })
})

describe('.compact', () => {
  it('should work', () => {
    expect(compact([0, undefined, 1, false, NaN, 2, '', 3, null])).toEqual([1, 2, 3])
  })
})

describe('.drop', () => {
  it('should work', () => {
    const testArr = [1, 2, 3]
    expect(drop(testArr)).toEqual([2, 3])
    expect(drop(testArr, 2)).toEqual([3])
    expect(drop(testArr, 5)).toEqual([])
    expect(drop(testArr, 0)).toEqual(testArr)
  })
})

describe('.dropRight', () => {
  it('should work', () => {
    const testArr = [1, 2, 3]
    expect(dropRight(testArr)).toEqual([1, 2])
    expect(dropRight(testArr, 2)).toEqual([1])
    expect(dropRight(testArr, 5)).toEqual([])
    expect(dropRight(testArr, 0)).toEqual(testArr)
  })
})

describe('.initial', () => {
  it('should work', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2])
    expect(initial([3])).toEqual([])
  })
})

describe('.uniq', () => {
  it('should work', () => {
    expect(uniq([1, 2, 1])).toEqual([1, 2])
  })
})

describe('.reject', () => {
  it('should work', () => {
    expect(reject([1, 2, 3], n => n === 2)).toEqual([1, 3])
  })
})

describe('.cloneDeep', () => {
  it('should work', () => {
    const obj = [{ a: 1 }, { b: 2 }]
    expect(cloneDeep(obj)[0] === obj[0]).toBeFalsy()
  })
})
