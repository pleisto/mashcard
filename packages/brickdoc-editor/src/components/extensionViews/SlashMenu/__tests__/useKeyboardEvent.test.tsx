import { BrickdocEventBus, SlashMenuHide, SlashMenuKeyboardEventTrigger } from '@brickdoc/schema'
import { renderHook } from '@testing-library/react-hooks'
import { useRef } from 'react'
import { SlashMenuItem } from '../SlashMenu'
import { useKeyboardEvent } from '../useKeyboardEvent'

describe('useKeyboardEvent', () => {
  const item: SlashMenuItem = {
    key: 'key',
    icon: <span>icon</span>,
    command: () => {}
  }
  let activeIndex = 1

  beforeEach(() => {
    activeIndex = 1
  })

  const setActiveIndex = (cb: number | ((prevIndex: number) => number)) => {
    if (typeof cb === 'number') {
      activeIndex = cb
      return
    }
    activeIndex = cb(activeIndex)
  }

  it('triggers ArrowUp correctly', () => {
    const command = jest.fn()
    renderHook(() => {
      const itemRef = useRef(item)
      const itemLength = useRef(3)
      return useKeyboardEvent(itemRef, itemLength, setActiveIndex, command)
    })

    BrickdocEventBus.dispatch(
      SlashMenuKeyboardEventTrigger({
        key: 'ArrowUp'
      })
    )

    expect(activeIndex).toBe(0)
  })

  it('triggers ArrowDown correctly', () => {
    const command = jest.fn()
    renderHook(() => {
      const itemRef = useRef(item)
      const itemLength = useRef(3)
      return useKeyboardEvent(itemRef, itemLength, setActiveIndex, command)
    })

    BrickdocEventBus.dispatch(
      SlashMenuKeyboardEventTrigger({
        key: 'ArrowDown'
      })
    )

    expect(activeIndex).toBe(2)
  })

  it('triggers Enter correctly', () => {
    const command = jest.fn()
    renderHook(() => {
      const itemRef = useRef(item)
      const itemLength = useRef(3)
      return useKeyboardEvent(itemRef, itemLength, setActiveIndex, command)
    })

    BrickdocEventBus.dispatch(
      SlashMenuKeyboardEventTrigger({
        key: 'Enter'
      })
    )

    expect(activeIndex).toBe(1)
    expect(command).toBeCalled()
  })

  it('triggers Escape correctly', () => {
    const command = jest.fn()
    renderHook(() => {
      const itemRef = useRef(item)
      const itemLength = useRef(3)
      return useKeyboardEvent(itemRef, itemLength, setActiveIndex, command)
    })

    let hide = false

    BrickdocEventBus.subscribe(SlashMenuHide, () => {
      hide = true
    })

    BrickdocEventBus.dispatch(
      SlashMenuKeyboardEventTrigger({
        key: 'Escape'
      })
    )

    expect(hide).toBeTruthy()
  })
})
