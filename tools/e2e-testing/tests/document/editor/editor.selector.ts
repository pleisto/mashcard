import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const EDITOR_SELECTORS = {
  content: '.ProseMirror',
  nodes: '.ProseMirror > div',
  blockActions: `[data-testid=${TEST_ID_ENUM.editor.blockAction.button.id}]`
}
