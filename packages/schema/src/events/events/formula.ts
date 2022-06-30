import { event } from '../event'
import { JSONContent } from '@tiptap/core'

interface FormulaEditorEventType {
  content: JSONContent | undefined
  position: number
  rootId: string
  formulaId: string
}

export const FormulaKeyboardEventTrigger = event<
  {
    event: Pick<KeyboardEvent, 'key' | 'metaKey' | 'ctrlKey' | 'altKey'> | null
    formulaId: string
    rootId: string
    completionIndex: number
    type: 'editor' | 'name' | 'autoComplete'
  },
  Promise<void>
>()('FormulaKeyboardEventTrigger', ({ formulaId, rootId }) => {
  return { id: `${rootId},${formulaId}` }
})

export const FormulaEditorHoverEventTrigger = event<{ attrs: any; formulaId: string; rootId: string }>()(
  'FormulaEditorHoverEventTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}` }
  }
)

export const FormulaEditorSelectEventTrigger = event<{
  selected: boolean
  formulaId: string
  rootId: string
  parentFormulaId: string
  parentRootId: string
}>()('FormulaEditorSelectEventTrigger', ({ formulaId, rootId }) => {
  return { id: `${rootId},${formulaId}` }
})

export const FormulaEditorReplaceRootTrigger = event<FormulaEditorEventType, Promise<void>>()(
  'FormulaEditorReplaceRootTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}` }
  }
)

export const FormulaCalculateTrigger = event<
  {
    rootId: string
    formulaId: string
    skipExecute: boolean
  },
  Promise<void>
>()('FormulaCalculateTrigger', ({ formulaId, rootId }) => {
  return { id: `${rootId},${formulaId}` }
})

export const FormulaEditorCloseTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorCloseTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}`, formulaId, rootId }
  }
)

export const FormulaEditorUpdateTrigger = event<FormulaEditorEventType, Promise<void>>()(
  'FormulaEditorUpdateTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}` }
  }
)

export const FormulaEditorBlurTrigger = event<FormulaEditorEventType, Promise<void>>()(
  'FormulaEditorBlurTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}` }
  }
)
