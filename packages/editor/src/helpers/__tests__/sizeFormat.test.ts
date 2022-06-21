import { sizeFormat } from '../file'

describe('sizeFormat', () => {
  it('works correctly', () => {
    expect(sizeFormat(1023)).toMatchInlineSnapshot(`"1023 b"`)
    expect(sizeFormat(1024)).toMatchInlineSnapshot(`"1.0 KB"`)
    expect(sizeFormat(1023 * 1024)).toMatchInlineSnapshot(`"1023.0 KB"`)
    expect(sizeFormat(1024 * 1024)).toMatchInlineSnapshot(`"1.0 MB"`)
    expect(sizeFormat(1023 * 1024 * 1024)).toMatchInlineSnapshot(`"1023.0 MB"`)
    expect(sizeFormat(1024 * 1024 * 1024)).toMatchInlineSnapshot(`"1024.0 MB"`)
  })
})
