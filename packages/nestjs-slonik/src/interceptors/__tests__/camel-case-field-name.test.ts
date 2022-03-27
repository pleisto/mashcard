import { camelCaseFieldNameInterceptor } from '../camel-case-field-name.interceptor'
describe('camelCaseFieldName.interceptor.ts', () => {
  it('should work', () => {
    const interceptor = camelCaseFieldNameInterceptor()
    const { transformRow } = interceptor
    const result = transformRow!(
      {
        connectionId: '1',
        poolId: '1',
        sandbox: {}
      } as any,
      {
        sql: 'SELECT 1',
        values: []
      },
      {
        foo_bar: 1,
        bazQux: 2
      },
      [
        {
          name: 'foo_bar',
          dataTypeId: 1
        },
        {
          name: 'bazQux',
          dataTypeId: 2
        }
      ]
    )
    expect(result.fooBar).toBe(1)
    expect(result.bazQux).toBe(2)
    expect(result.foo_bar).toBeUndefined()
  })
})
