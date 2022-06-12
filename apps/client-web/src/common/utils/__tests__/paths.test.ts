import { rootPath } from '../paths'

const fakeID = 'ffff-ffff-ffff-ffff'
describe('.paths', () => {
  it('.rootPath should work', () => {
    expect(
      rootPath({
        currentPod: {
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
        currentPod: {
          domain: 'alice'
        }
      } as any)
    ).toEqual(`/bob/${fakeID}`)
  })
})
