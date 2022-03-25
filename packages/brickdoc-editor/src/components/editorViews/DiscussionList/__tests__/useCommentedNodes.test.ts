import { renderHook } from '@testing-library/react-hooks'
import * as editorContextHooks from '../../../../hooks/useEditorContext'
import { mockEditor } from '../../../common/tests/editor'
import { useCommentedNodes } from '../useCommentedNodes'
import { meta as discussionMeta } from '../../../../extensions/marks/discussion/meta'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

describe('useCommentedNodes', () => {
  it('fetches commentedNodes correctly', () => {
    const editor = mockEditor({
      view: {
        nodeDOM: (position: number) => {
          if (position === 3)
            return {
              nodeType: Node.TEXT_NODE
            }

          return {}
        }
      },
      state: {
        doc: {
          descendants: (cb: (node: any, position: number) => void) => {
            const nodes: any[] = [
              {
                marks: [
                  {
                    type: {
                      name: discussionMeta.name
                    },
                    attrs: {
                      markId: 'm1'
                    }
                  }
                ]
              },
              {
                marks: [
                  {
                    type: {
                      name: 'unknown'
                    },
                    attrs: {
                      markId: 'm1'
                    }
                  }
                ]
              },
              {
                marks: [
                  {
                    type: {
                      name: discussionMeta.name
                    },
                    attrs: {
                      markId: 'm1'
                    }
                  }
                ]
              },
              {
                marks: [
                  {
                    type: {
                      name: discussionMeta.name
                    },
                    attrs: {
                      markId: 'm2'
                    }
                  }
                ]
              }
            ]
            nodes.forEach((node, index) => cb(node, index))
          }
        }
      }
    })

    jest.spyOn(editorContextHooks, 'useEditorContext').mockImplementation(() => ({
      t: key => key,
      editor
    }))
    const { result } = renderHook(() => useCommentedNodes())

    act(() => {
      jest.runAllTimers()
    })

    const [nodes] = result.current

    expect(nodes).toHaveLength(1)
  })
})
