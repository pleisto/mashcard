import React from 'react'
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
  activeCompletion: Completion | undefined
  content: JSONContent | undefined
  completions: Completion[]
  activeCompletionIndex: number
  handleSelectActiveCompletion: (completion?: Completion, content?: JSONContent) => void
  setActiveCompletion: React.Dispatch<React.SetStateAction<Completion | undefined>>
  setActiveCompletionIndex: React.Dispatch<React.SetStateAction<number>>
}): KeyDownHandlerType {
  const latestCompletion = React.useRef(activeCompletion)
  React.useEffect(() => {
    latestCompletion.current = activeCompletion
  }, [activeCompletion])

  const latestContent = React.useRef(content)
  React.useEffect(() => {
    latestContent.current = content
  }, [content])

  const latestActiveCompletionIndex = React.useRef(activeCompletionIndex)
  React.useEffect(() => {
    latestActiveCompletionIndex.current = activeCompletionIndex
  }, [activeCompletionIndex])

  const latestCompletions = React.useRef(completions)
  React.useEffect(() => {
    latestCompletions.current = completions
  }, [completions])

  const keyDownHandler = React.useCallback(
    (view, event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        return true
      }

      let newIndex: number
      switch (event.key) {
        case 'Tab':
          handleSelectActiveCompletion(latestCompletion.current, latestContent.current)
          return true
        case 'ArrowDown':
          newIndex =
            latestActiveCompletionIndex.current + 1 > latestCompletions.current.length - 1
              ? 0
              : latestActiveCompletionIndex.current + 1

          setActiveCompletion(latestCompletions.current[newIndex])
          setActiveCompletionIndex(newIndex)
          return true
        case 'ArrowUp':
          newIndex =
            latestActiveCompletionIndex.current - 1 < 0
              ? latestCompletions.current.length - 1
              : latestActiveCompletionIndex.current - 1
          setActiveCompletion(latestCompletions.current[newIndex])
          setActiveCompletionIndex(newIndex)
          return true
      }

      return false
    },
    [handleSelectActiveCompletion, setActiveCompletion, setActiveCompletionIndex]
  )

  return keyDownHandler
}
