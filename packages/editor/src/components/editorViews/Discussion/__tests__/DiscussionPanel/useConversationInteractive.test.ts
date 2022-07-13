import { useRef } from 'react'
import { renderHook } from '@testing-library/react'
import { useConversationInteractive } from '../../DiscussionPanel/useConversationInteractive'

describe('useConversationInteractive', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn()
  })

  it('triggers onSelect normally', () => {
    const activeMarkId = 'active mark id'

    const { result } = renderHook(() => {
      const conversationRefs = useRef({})
      const setActiveMarkId = jest.fn()
      return useConversationInteractive(conversationRefs, activeMarkId, setActiveMarkId)
    })

    const [, onSelect] = result.current

    expect(() =>
      onSelect({ markId: activeMarkId, node: {} as any, domNode: document.createElement('div'), position: 1 })(
        {} as any
      )
    ).not.toThrow()
  })

  it('triggers onHover normally', () => {
    const activeMarkId = 'active mark id'

    const { result } = renderHook(() => {
      const conversationRefs = useRef({})
      const setActiveMarkId = jest.fn()
      return useConversationInteractive(conversationRefs, activeMarkId, setActiveMarkId)
    })

    const [, , onHover] = result.current

    expect(() =>
      onHover({ markId: '', node: {} as any, domNode: document.createElement('div'), position: 1 })({} as any)
    ).not.toThrow()
  })

  it('triggers onLeave normally', () => {
    const activeMarkId = 'active mark id'
    const { result } = renderHook(() => {
      const conversationRefs = useRef({})
      const setActiveMarkId = jest.fn()
      return useConversationInteractive(conversationRefs, activeMarkId, setActiveMarkId)
    })

    const [, , , onLeave] = result.current

    expect(() =>
      onLeave({ markId: '', node: {} as any, domNode: document.createElement('div'), position: 1 })({} as any)
    ).not.toThrow()
  })
})
