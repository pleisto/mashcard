import React, { MutableRefObject } from 'react'
import { Completion } from '@brickdoc/formula'
import { KeyDownHandlerType } from '../../extensions/formula/FormulaEditor/extensions/handleKeyDown'
import { JSONContent } from '@tiptap/core'

export function useKeydownHandler({
  activeCompletion,
  completions,
  content,
  activeCompletionIndex,
  setActiveCompletion,
  setActiveCompletionIndex,
  handleSelectActiveCompletion
}: {
  activeCompletion: MutableRefObject<Completion | undefined>
  content: MutableRefObject<JSONContent | undefined>
  completions: MutableRefObject<Completion[]>
  activeCompletionIndex: MutableRefObject<number>
  handleSelectActiveCompletion: (completion?: Completion, content?: JSONContent) => void
  setActiveCompletion: MutableRefObject<React.Dispatch<React.SetStateAction<Completion | undefined>>>
  setActiveCompletionIndex: MutableRefObject<React.Dispatch<React.SetStateAction<number>>>
}): KeyDownHandlerType {
  const keyDownHandler = React.useCallback(
    (view, event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        return true
      }

      let newIndex: number
      switch (event.key) {
        case 'Tab':
          handleSelectActiveCompletion(activeCompletion.current, content.current)
          return true
        case 'ArrowDown':
          newIndex =
            activeCompletionIndex.current + 1 > completions.current.length - 1 ? 0 : activeCompletionIndex.current + 1

          setActiveCompletion.current(completions.current[newIndex])
          setActiveCompletionIndex.current(newIndex)
          return true
        case 'ArrowUp':
          newIndex =
            activeCompletionIndex.current - 1 < 0 ? completions.current.length - 1 : activeCompletionIndex.current - 1
          setActiveCompletion.current(completions.current[newIndex])
          setActiveCompletionIndex.current(newIndex)
          return true
      }

      return false
    },
    [
      activeCompletion,
      activeCompletionIndex,
      completions,
      content,
      handleSelectActiveCompletion,
      setActiveCompletion,
      setActiveCompletionIndex
    ]
  )

  return keyDownHandler
}
