import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { fireEvent, render, screen } from '@testing-library/react'
import { EditorContext } from '../../../context/EditorContext'
import { TocBlock } from '../TocBlock'

const buildDoc = (nodes: any[]): any => {
  return {
    descendants: (predicate: Function) => {
      nodes.forEach((node, index) => predicate(node, index))
    }
  }
}

describe('TocBlock', () => {
  const h1 = ['h1', 'h1`', 'h1``']
  const h2 = ['h2']
  const h3 = ['h3']
  const h4 = ['h4']
  const h5 = ['h5', 'h5`']
  const anchor = ['anchor']
  const nodes: any[] = [
    {
      type: {
        name: 'heading'
      },
      textContent: h1[0],
      attrs: {
        level: 1
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h2[0],
      attrs: {
        level: 2
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h5[1],
      attrs: {
        level: 5
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h1[1],
      attrs: {
        level: 1
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h3[0],
      attrs: {
        level: 3
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h4[0],
      attrs: {
        level: 4
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h5[0],
      attrs: {
        level: 5
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h2[1],
      attrs: {
        level: 2
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'text'
      },
      textContent: anchor[0],
      marks: [
        {
          type: {
            name: 'anchor'
          }
        }
      ],
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      textContent: h1[2],
      attrs: {
        level: 1
      },
      nodeSize: 1
    },
    // includes a non-toc node
    {
      type: {
        name: 'others'
      },
      marks: [
        {
          type: {
            name: 'others'
          }
        }
      ]
    }
  ]
  const doc = buildDoc(nodes)
  const editor: any = {
    chain: () => editor,
    focus: () => editor,
    commands: {
      scrollIntoView: () => editor
    },
    scrollIntoView: () => editor,
    run: () => editor,
    state: {
      doc
    },
    view: {
      domAtPos() {
        return null
      }
    },
    on: () => {},
    off: () => {}
  }

  it('matches correct snapshot', () => {
    const props: any = { editor }
    const { container } = render(<TocBlock {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders toc tree normally', () => {
    const props: any = { editor }
    render(<TocBlock {...props} />)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(nodes.length - 1)
  })

  it('triggers toc item click normally', () => {
    const props: any = { editor }
    const mockSetTextSelection = jest.fn()
    editor.setTextSelection = (...args: any) => {
      mockSetTextSelection(...args)
      return editor
    }
    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <EditorContext.Provider value={{ editor, t: key => key }}>
        <TocBlock {...props} />
      </EditorContext.Provider>
    )

    const position = 0
    fireEvent.click(screen.getAllByTestId(TEST_ID_ENUM.editor.tocBlock.item.title.id)[position])
    expect(mockSetTextSelection).toBeCalledWith(position)
  })
})
