import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { BrickdocEventBus, SlashMenuKeyboardEventTrigger, SlashMenuHide } from '@brickdoc/schema'
import { SlashMenuItem, SlashMenuProps } from '.'

export function useKeyboardEvent(
  type: SlashMenuItem[],
  currentItem: MutableRefObject<SlashMenuItem | undefined>,
  itemLength: MutableRefObject<number>,
  setActiveIndex: Dispatch<SetStateAction<number>>,
  command: SlashMenuProps['command']
): [MutableRefObject<HTMLUListElement | undefined>] {
  const menuRef = useRef<HTMLUListElement>()

  const formulaMenuItem = type.find(item => item.key === 'formula')

  const scrollItemIntoView = (index: number): void =>
    menuRef.current
      ?.getElementsByTagName('li')
      .item(index)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

  useEffect(() => {
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
        case 'Escape':
          BrickdocEventBus.dispatch(SlashMenuHide({}))
          break
        case '=':
          if (formulaMenuItem) command(formulaMenuItem)
          break
      }
    })
    return () => listener.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command])

  return [menuRef]
}
