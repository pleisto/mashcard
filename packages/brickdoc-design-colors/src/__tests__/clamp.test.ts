import { clamp } from '../clamp'

describe('clamp', () => {
  it('should clamp a value between two bounds', () => {
    expect(clamp(42, 100, 0)).toEqual(42)
    expect(clamp(200, 42, 0)).toEqual(42)
    expect(clamp(30, 100, 42)).toEqual(42)
  })
})
