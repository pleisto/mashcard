import React from 'react'
import { Completion } from '@brickdoc/formula'
import { KeyDownHandlerType } from '../../extensions/formula/FormulaEditor/extensions/handleKeyDown'

export function useKeydownHandler({
  activeCompletion,
  completions,
  activeCompletionIndex,
  setActiveCompletion,
  setActiveCompletionIndex,
  handleSelectActiveCompletion
}: {
  activeCompletion: Completion | undefined
  completions: Completion[]
  activeCompletionIndex: number
  handleSelectActiveCompletion: (completion?: Completion) => void
  setActiveCompletion: React.Dispatch<React.SetStateAction<Completion | undefined>>
  setActiveCompletionIndex: React.Dispatch<React.SetStateAction<number>>
}): KeyDownHandlerType {
  const latestCompletion = React.useRef(activeCompletion)

  React.useEffect(() => {
    latestCompletion.current = activeCompletion
  }, [activeCompletion])

  const keyDownHandler = React.useCallback(
    (view, event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        return true
      }

      let newIndex: number
      switch (event.key) {
        case 'Tab':
          handleSelectActiveCompletion(latestCompletion.current)
          break
        case 'ArrowDown':
          newIndex = activeCompletionIndex + 1 > completions.length - 1 ? 0 : activeCompletionIndex + 1
          setActiveCompletion(completions[newIndex])
          setActiveCompletionIndex(newIndex)
          break
        case 'ArrowUp':
          newIndex = activeCompletionIndex - 1 < 0 ? completions.length - 1 : activeCompletionIndex - 1
          setActiveCompletion(completions[newIndex])
          setActiveCompletionIndex(newIndex)
          break
      }

      return false
    },
    [handleSelectActiveCompletion, activeCompletionIndex, completions, setActiveCompletion, setActiveCompletionIndex]
  )

  return keyDownHandler
}
