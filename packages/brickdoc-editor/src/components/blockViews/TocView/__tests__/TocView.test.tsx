import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { fireEvent, render, screen } from '@testing-library/react'
import { EditorContext } from '../../../../context/EditorContext'
import { TocAttributes, TocOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../common/tests'
import { TocView } from '../TocView'

const buildDoc = (nodes: any[]): any => {
  return {
    descendants: (predicate: Function) => {
      nodes.forEach((node, index) => predicate(node, index))
    }
  }
}

describe('TocView', () => {
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
      content: [
        {
          type: {
            name: 'text'
          },
          text: h1[0]
        }
      ],
      attrs: {
        level: 1
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h2[0]
        }
      ],
      attrs: {
        level: 2
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h5[1]
        }
      ],
      attrs: {
        level: 5
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h1[1]
        }
      ],
      attrs: {
        level: 1
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h3[0]
        }
      ],
      attrs: {
        level: 3
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h4[0]
        }
      ],
      attrs: {
        level: 4
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h5[0]
        }
      ],
      attrs: {
        level: 5
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'heading'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: h2[1]
        }
      ],
      attrs: {
        level: 2
      },
      nodeSize: 1
    },
    {
      type: {
        name: 'text'
      },
      content: [
        {
          type: {
            name: 'text'
          },
          text: anchor[0]
        }
      ],
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
      content: [
        {
          type: {
            name: 'text'
          },
          text: h1[2]
        }
      ],
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

  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<TocOptions, TocAttributes>({
      editor: {
        state: {
          doc
        }
      }
    })
    const { container } = render(<TocView {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders toc tree normally', () => {
    const props = mockBlockViewProps<TocOptions, TocAttributes>({
      editor: {
        state: {
          doc
        }
      }
    })
    render(<TocView {...props} />)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(nodes.length - 1)
  })

  it('triggers toc item click normally', () => {
    const mockSetTextSelection = jest.fn()

    const props = mockBlockViewProps<TocOptions, TocAttributes>({
      editor: {
        commands: {
          setTextSelection: mockSetTextSelection
        },
        state: {
          doc
        }
      }
    })

    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <EditorContext.Provider value={{ editor: props.editor, t: key => key }}>
        <TocView {...props} />
      </EditorContext.Provider>
    )

    const position = 0
    fireEvent.click(screen.getAllByTestId(TEST_ID_ENUM.editor.tocBlock.item.title.id)[position])
    expect(mockSetTextSelection).toBeCalledWith(position)
  })
})
