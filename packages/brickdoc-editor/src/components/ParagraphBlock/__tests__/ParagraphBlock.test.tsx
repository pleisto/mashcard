import { render } from '@testing-library/react'
import { ParagraphBlock } from '../ParagraphBlock'

describe('ParagraphBlock', () => {
  const uuid = 'uuid'

  it(`matches snapshot correctly`, () => {
    const props: any = {
      editor: {
        on() {},
        off() {},
        state: {
          selection: {
            anchor: 1
          }
        }
      },
      node: {
        isLeaf: false,
        childCount: 0,
        nodeSiz: 1,
        attrs: {
          uuid
        }
      },
      updateAttributes: () => {},
      getPos() {
        return 0
      }
    }
    const { container } = render(<ParagraphBlock {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it(`shows placeholder normally`, () => {
    const props: any = {
      editor: {
        on() {},
        off() {},
        state: {
          selection: {
            anchor: 1
          }
        }
      },
      node: {
        isLeaf: false,
        childCount: 0,
        nodeSize: 1,
        attrs: {
          uuid
        }
      },
      updateAttributes: () => {},
      getPos() {
        return 1
      }
    }
    const { container } = render(<ParagraphBlock {...(props as any)} />)

    // expect data-placeholder="placeholder" exist
    expect(container.firstChild).toMatchSnapshot()
  })
})
