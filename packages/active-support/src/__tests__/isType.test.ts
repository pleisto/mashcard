import {
  isString,
  isNumber,
  isNullOrUndefined,
  isBlank,
  isUUID,
  isNonEmptyArray,
  isNonEmptyString,
  isUrl
} from '../isType'

describe('.isString', () => {
  it('should work', () => {
    expect(isString('text')).toBe(true)
    // eslint-disable-next-line no-new-wrappers
    expect(isString(new String('some thing'))).toBe(true)
    expect(isString({})).toBe(false)
  })
})

describe('.isNumber', () => {
  it('should work', () => {
    expect(isNumber('1')).toBe(false)
    expect(isNumber(233)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(isNumber, true)).toBe(false)
  })
})

describe('.isNullOrUndefined', () => {
  it('should work', () => {
    expect(isNullOrUndefined('1')).toBe(false)
    expect(isNullOrUndefined(null)).toBe(true)
    expect(isNullOrUndefined(undefined)).toBe(true)
  })
})

describe('.isBlank', () => {
  it('should work', () => {
    expect(isBlank(() => {})).toBe(false)
    expect(isBlank(true)).toBe(false)
    expect(isBlank(3)).toBe(false)
    expect(isBlank('test')).toBe(false)
    expect(isBlank({ a: 2 })).toBe(false)
    expect(isBlank(false)).toBe(true)
    expect(isBlank({})).toBe(true)
    expect(isBlank(undefined)).toBe(true)
  })
})

describe('.isUUID', () => {
  it('should work', () => {
    expect(isUUID('1xx-xs2')).toBe(false)
    expect(isUUID('aabd8c7b-818c-4223-a404-392fe6324a20')).toBe(true)
  })
})

describe('.isNonEmptyArray', () => {
  it('should work', () => {
    expect(isNonEmptyArray([])).toBe(false)
    expect(isNonEmptyArray([1, 2, 3])).toBe(true)
  })
})

describe('.isNonEmptyString', () => {
  it('should work', () => {
    expect(isNonEmptyString('')).toBe(false)
    expect(isNonEmptyString('test')).toBe(true)
  })
})

describe('.isUrl', () => {
  it('should work', () => {
    expect(isUrl('mashcard://example?pageId=233')).toBe(true)
    expect(isUrl('https://test.com', 'https')).toBe(true)
    expect(isUrl('mashcard.cloud')).toBe(false)
    expect(isUrl('sftp://foss.mashcard.cloud', 'https')).toBe(false)
  })
})
