import { rootPath } from '../paths'

const fakeID = 'ffff-ffff-ffff-ffff'
describe('.paths', () => {
  beforeAll(() => {
    jest.spyOn(globalThis, 'location', 'get').mockImplementation(() => ({ pathname: '/alice' } as any))
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('.rootPath should work', () => {
    expect(
      rootPath({
        lastDomain: undefined
      } as any)
    ).toEqual('/alice')

    expect(
      rootPath({
        lastDomain: 'bob',
        lastBlockIds: {
          bob: fakeID
        }
      } as any)
    ).toEqual(`/bob/${fakeID}`)
  })
})
