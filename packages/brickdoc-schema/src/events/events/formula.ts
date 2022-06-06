import { event } from '../event'

export const FormulaKeyboardEventTrigger = event<{
  key: string
  formulaId: string
  rootId: string
  completionIndex: number
  isEditor: boolean
}>()('FormulaKeyboardEventTrigger', ({ formulaId, rootId }) => {
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

export const FormulaEditorReplaceRootTrigger = event<{
  content: any
  position: number
  input: string
  rootId: string
  formulaId: string
}>()('FormulaEditorReplaceRootTrigger', ({ formulaId, rootId }) => {
  return { id: `${rootId},${formulaId}` }
})

export const FormulaCalculateTrigger = event<{
  rootId: string
  formulaId: string
  skipExecute: boolean
}>()('FormulaCalculateTrigger', ({ formulaId, rootId }) => {
  return { id: `${rootId},${formulaId}` }
})

export const FormulaEditorSavedTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorSavedTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}`, formulaId, rootId }
  }
)

export const FormulaEditorUpdateTrigger = event<
  {
    rootId: string
    formulaId: string
    content: any
    position: number
  },
  Promise<void>
>()('FormulaEditorUpdateTrigger', ({ formulaId, rootId }) => {
  return { id: `${rootId},${formulaId}` }
})
