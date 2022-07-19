import { MultipleNodeBookmark } from '../MultipleNodeBookmark'
import * as selections from '../MultipleNodeSelection'

jest.mock('../MultipleNodeSelection.ts')

describe('MultipleNodeBookmark', () => {
  it('maps MultipleNodeBookmark correctly', () => {
    const anchor = 1
    const head = 2
    const bookmark = new MultipleNodeBookmark(anchor, head)

    const mapping = {
      map: (position: number): number => position + 1
    }
    const newBookmark = bookmark.map(mapping as any)

    expect(newBookmark.anchor).toBe(anchor + 1)
    expect(newBookmark.head).toBe(head + 1)
  })

  it('resolves selection correctly', () => {
    class MockMultipleNodeSelection {
      public anchor: any
      public head: any
      constructor(anchor: any, head: any) {
        this.anchor = anchor
        this.head = head
      }
    }

    jest
      .spyOn(selections, 'MultipleNodeSelection')
      .mockImplementation((anchor, head) => new MockMultipleNodeSelection(anchor, head) as any)
    const anchor = 1
    const head = 2
    const bookmark = new MultipleNodeBookmark(anchor, head)

    const doc = {
      resolve: (position: number) => position + 1
    }
    const selection = bookmark.resolve(doc as any)

    expect(selection.anchor).toBe(anchor + 1)
    expect(selection.head).toBe(head + 1)
  })
})
