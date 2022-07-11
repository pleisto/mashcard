import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import ListItem from '@tiptap/extension-list-item'
import { ParagraphAttributes, ParagraphOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { ParagraphView } from '../ParagraphView'
import { usePlaceholder } from '../usePlaceholder'

describe('ParagraphView', () => {
  it(`matches snapshot correctly`, () => {
    const props = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      editor: {
        state: {
          doc: {
            resolve: () => ({
              parent: {
                type: {
                  name: 'unknown'
                }
              }
            })
          }
        }
      },
      getPos: () => 0
    })
    const { container } = render(<ParagraphView {...props} />)

    expect(container).toMatchSnapshot()
  })

  it('get placeholder for ListItem correctly', () => {
    const props = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      editor: {
        state: {
          doc: {
            resolve: () => ({
              parent: {
                type: {
                  name: ListItem.name
                }
              }
            })
          }
        }
      },
      getPos: () => 0
    })

    const { result } = renderHook(() => usePlaceholder(props.editor, props.node, props.getPos))
    const placeholder = result.current

    expect(placeholder).toEqual(`placeholder.${ListItem.name}`)
  })

  it('get none placeholder if paragraph is not empty correctly', () => {
    const props = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      node: {
        childCount: 1
      },
      getPos: () => 0
    })

    const { result } = renderHook(() => usePlaceholder(props.editor, props.node, props.getPos))
    const placeholder = result.current

    expect(placeholder).toEqual('')
  })
})
