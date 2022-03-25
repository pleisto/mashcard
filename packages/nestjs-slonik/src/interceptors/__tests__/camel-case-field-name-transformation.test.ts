import { camelCaseFieldNameTransformationInterceptor } from '../camel-case-field-name-transformation.interceptor'
describe('camelCaseFieldNameTransformationInterceptor.interceptor.ts', () => {
  it('should work', () => {
    const interceptor = camelCaseFieldNameTransformationInterceptor()
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
        foo_bar: 1
      },
      [
        {
          name: 'foo_bar',
          dataTypeId: 1
        }
      ]
    )
    expect(result.fooBar).toBe(1)
  })
})
