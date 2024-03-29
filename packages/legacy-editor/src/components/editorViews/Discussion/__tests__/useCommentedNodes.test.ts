import { renderHook, act } from '@testing-library/react'
import * as editorContextHooks from '../../../../hooks/useEditorContext'
import { mockEditor } from '../../../../test/editor'
import { useCommentedNodes } from '../useCommentedNodes'
import { meta as discussionMeta } from '../../../../extensions/marks/discussion/meta'

jest.mock('../../../../hooks/useEditorContext', () => {
  const { useEditorContext } = jest.requireActual('../../../../hooks/useEditorContext')
  return { useEditorContext: jest.fn().mockImplementation(useEditorContext) }
})

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
      editor,
      documentEditable: true
    }))
    const { result } = renderHook(() => useCommentedNodes())

    act(() => {
      jest.runAllTimers()
    })

    const [nodes] = result.current

    expect(nodes).toHaveLength(1)
  })
})
