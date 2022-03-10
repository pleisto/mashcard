import { rootPath } from '../paths'

const fakeID = 'ffff-ffff-ffff-ffff'
describe('.paths', () => {
  it('.rootPath should work', () => {
    expect(
      rootPath({
        currentSpace: {
          domain: 'alice'
        },
        lastDomain: undefined
      } as any)
    ).toEqual('/alice')

    expect(
      rootPath({
        lastDomain: 'bob',
        lastBlockIds: {
          bob: fakeID
        },
        currentSpace: {
          domain: 'alice'
        }
      } as any)
    ).toEqual(`/bob/${fakeID}`)
  })
})
