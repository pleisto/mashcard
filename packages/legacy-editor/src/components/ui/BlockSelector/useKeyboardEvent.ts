import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { MashcardEventBus, SlashMenuKeyboardEventTrigger, SlashMenuHide } from '@mashcard/schema'
import { BlockSelectorItem, BlockSelectorProps } from './BlockSelector'

// eslint-disable-next-line max-params
export function useKeyboardEvent(
  type: BlockSelectorItem[],
  currentItem: MutableRefObject<BlockSelectorItem | undefined>,
  itemLength: MutableRefObject<number>,
  setActiveIndex: Dispatch<SetStateAction<number>>,
  onBlockSelect: BlockSelectorProps['onBlockSelect']
): [MutableRefObject<HTMLUListElement | undefined>] {
  const menuRef = useRef<HTMLUListElement>()

  const formulaMenuItem = type.find(item => item.key === 'formula')

  const scrollItemIntoView = (index: number): void =>
    menuRef.current
      ?.getElementsByTagName('li')
      .item(index)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

  useEffect(() => {
    const listener = MashcardEventBus.subscribe(SlashMenuKeyboardEventTrigger, event => {
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
          if (currentItem.current) onBlockSelect?.(currentItem.current)
          break
        case 'Escape':
          MashcardEventBus.dispatch(SlashMenuHide({}))
          break
        case '=':
          if (formulaMenuItem) onBlockSelect?.(formulaMenuItem)
          break
      }
    })
    return () => listener.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBlockSelect])

  return [menuRef]
}
