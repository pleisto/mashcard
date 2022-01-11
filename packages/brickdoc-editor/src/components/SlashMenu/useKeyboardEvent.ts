import React from 'react'
import { BrickdocEventBus, SlashMenuKeyboardEventTrigger } from '@brickdoc/schema'
import { SlashMenuItem, SlashMenuProps } from '.'

export function useKeyboardEvent(
  currentItem: React.MutableRefObject<SlashMenuItem | undefined>,
  itemLength: React.MutableRefObject<number>,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  command: SlashMenuProps['command']
): [React.MutableRefObject<HTMLUListElement | undefined>] {
  const menuRef = React.useRef<HTMLUListElement>()

  const scrollItemIntoView = (index: number): void =>
    menuRef.current
      ?.getElementsByTagName('li')
      .item(index)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(SlashMenuKeyboardEventTrigger, event => {
      switch (event.payload.key) {
        case 'ArrowUp':
          setActiveIndex(index => {
            if (index === undefined) {
              return 0
            }
            const activeIndex = (index - 1 + itemLength.current) % itemLength.current
            scrollItemIntoView(activeIndex)
            return activeIndex
          })
          break
        case 'ArrowDown':
          setActiveIndex(index => {
            if (index === undefined) {
              return 0
            }
            const activeIndex = (index + 1 + itemLength.current) % itemLength.current
            scrollItemIntoView(activeIndex)
            return activeIndex
          })
          break
        case 'Enter':
          if (currentItem.current) command(currentItem.current)
          break
      }
    })
    return () => listener.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command])

  return [menuRef]
}
