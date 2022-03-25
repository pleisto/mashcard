import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { SlashMenuProps } from '.'
import { SlashMenuItem } from './SlashMenu'
import { useKeyboardEvent } from './useKeyboardEvent'

export function useActiveStatus(
  recent: SlashMenuItem[],
  suggestion: SlashMenuItem[],
  type: SlashMenuItem[],
  command: SlashMenuProps['command']
): [number | undefined, (activeIndex: number) => void, MutableRefObject<HTMLUListElement | undefined>] {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const itemLength = useRef(0)
  const currentItem = useRef<SlashMenuItem>()

  // record active item
  useEffect(() => {
    if (activeIndex === undefined) return
    if (suggestion.length > 0) {
      currentItem.current = suggestion[activeIndex]
    } else {
      currentItem.current = recent[activeIndex] ?? type[activeIndex - recent.length]
    }
  }, [activeIndex, recent, suggestion, type])

  // record item length
  useEffect(() => {
    setActiveIndex(0)

    if (suggestion.length > 0) {
      itemLength.current = suggestion.length
    } else {
      itemLength.current = type.length + recent.length
    }
  }, [type.length, suggestion.length, recent.length])

  // keyboard events
  const [menuRef] = useKeyboardEvent(currentItem, itemLength, setActiveIndex, command)

  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex((index + itemLength.current) % itemLength.current)
  }, [])

  return [activeIndex, handleActiveIndexChange, menuRef]
}
