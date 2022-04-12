import { event } from '../event'

export const FormulaKeyboardEventTrigger = event<{
  key: string
  formulaId: string
  rootId: string
  completionIndex: number
  isEditor: boolean
}>()('FormulaKeyboardEventTrigger', ({ key, formulaId, rootId, isEditor, completionIndex }) => {
  return { key, formulaId, rootId, isEditor, completionIndex, id: `${rootId},${formulaId}` }
})

export const FormulaEditorHoverEventTrigger = event<{ attrs: any; formulaId?: string; rootId?: string }>()(
  'FormulaEditorHoverEventTrigger',
  ({ attrs, formulaId, rootId }) => {
    return { attrs, formulaId, rootId, id: `${rootId},${formulaId}` }
  }
)

export const FormulaEditorSelectEventTrigger = event<{
  selected: boolean
  formulaId: string
  rootId: string
  parentFormulaId: string
  parentRootId: string
}>()('FormulaEditorSelectEventTrigger', ({ formulaId, rootId, parentFormulaId, parentRootId, selected }) => {
  return { id: `${rootId},${formulaId}`, formulaId, rootId, parentFormulaId, parentRootId, selected }
})

export const FormulaEditorSaveEventTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorSaveEventTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}`, formulaId, rootId }
  }
)

export const FormulaEditorSavedTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorSavedTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}`, formulaId, rootId }
  }
)

export const FormulaEditorReplaceRootTrigger = event<{
  content: any
  position: number
  input: string
  rootId: string
  formulaId: string
}>()('FormulaEditorReplaceRootTrigger', ({ content, position, input, formulaId, rootId }) => {
  return { content, position, input, id: `${rootId},${formulaId}`, formulaId, rootId }
})

export const FormulaCalculateTrigger = event<{
  rootId: string
  formulaId: string
  skipExecute: boolean
}>()('FormulaCalculateTrigger', ({ formulaId, rootId, skipExecute }) => {
  return { id: `${rootId},${formulaId}`, formulaId, rootId, skipExecute }
})