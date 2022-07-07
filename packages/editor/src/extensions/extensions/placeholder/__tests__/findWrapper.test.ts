import { findParagraphWrapper, findWrapper } from '../findWrapper'

jest.mock('@tiptap/react', () => ({
  findParentNodeClosestToPos: (_pos: any, cb: Function) => {
    const node = { type: { name: 'unknown' } }
    return cb(node)
  }
}))

describe('findWrapper', () => {
  it('findWrapper returns undefined if no nodes matched', () => {
    expect(findWrapper({} as any)).toBeUndefined()
  })

  it('findParagraphWrapper returns undefined if no nodes matched', () => {
    expect(findParagraphWrapper({} as any)).toBeUndefined()
  })
})
