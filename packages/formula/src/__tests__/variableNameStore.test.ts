import { variableNameStore } from '../states'

describe('variableNameStore', () => {
  let store: typeof variableNameStore
  const namespaceId = 'namespaceId'

  beforeAll(() => {
    store = variableNameStore
  })

  it('initial', () => {
    expect(store.getState().data.number).toStrictEqual({})
    expect(store.getState().getDefaultVariableName(namespaceId, 'number')).toStrictEqual('num1')
  })

  it('set invalid', () => {
    store.getState().maybeAddVariableName('name', namespaceId)

    expect(store.getState().getDefaultVariableName(namespaceId, 'number')).toStrictEqual('num1')
  })

  it('set valid', () => {
    store.getState().maybeAddVariableName('num10', namespaceId)
    expect(store.getState().data.number).toStrictEqual({ [namespaceId]: 10 })

    expect(store.getState().getDefaultVariableName(namespaceId, 'number')).toStrictEqual('num11')
  })
})
