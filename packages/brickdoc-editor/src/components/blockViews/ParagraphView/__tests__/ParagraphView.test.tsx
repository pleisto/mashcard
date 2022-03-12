import { render } from '@testing-library/react'
import { ParagraphView } from '../ParagraphView'

describe('ParagraphView', () => {
  const uuid = 'uuid'

  it(`matches snapshot correctly`, () => {
    const props: any = {
      editor: {
        on() {
          return props.editor
        },
        off() {
          return props.editor
        },
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
    const { container } = render(<ParagraphView {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it(`shows placeholder normally`, () => {
    const props: any = {
      editor: {
        on() {
          return props.editor
        },
        off() {
          return props.editor
        },
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
    const { container } = render(<ParagraphView {...(props as any)} />)

    // expect data-placeholder="placeholder" exist
    expect(container.firstChild).toMatchSnapshot()
  })
})
