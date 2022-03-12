import React from 'react'
import { SlashMenuProps } from '.'
import { SlashMenuItem } from './SlashMenu'
import { useKeyboardEvent } from './useKeyboardEvent'

export function useActiveStatus(
  recent: SlashMenuItem[],
  suggestion: SlashMenuItem[],
  type: SlashMenuItem[],
  command: SlashMenuProps['command']
): [number | undefined, (activeIndex: number) => void, React.MutableRefObject<HTMLUListElement | undefined>] {
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const itemLength = React.useRef(0)
  const currentItem = React.useRef<SlashMenuItem>()

  // record active item
  React.useEffect(() => {
    if (activeIndex === undefined) return
    if (suggestion.length > 0) {
      currentItem.current = suggestion[activeIndex]
    } else {
      currentItem.current = recent[activeIndex] ?? type[activeIndex - recent.length]
    }
  }, [activeIndex, recent, suggestion, type])

  // record item length
  React.useEffect(() => {
    setActiveIndex(0)

    if (suggestion.length > 0) {
      itemLength.current = suggestion.length
    } else {
      itemLength.current = type.length + recent.length
    }
  }, [type.length, suggestion.length, recent.length])

  // keyboard events
  const [menuRef] = useKeyboardEvent(currentItem, itemLength, setActiveIndex, command)

  const handleActiveIndexChange = React.useCallback((index: number) => {
    setActiveIndex((index + itemLength.current) % itemLength.current)
  }, [])

  return [activeIndex, handleActiveIndexChange, menuRef]
}
