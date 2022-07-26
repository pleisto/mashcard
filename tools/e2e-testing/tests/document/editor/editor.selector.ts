import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const EDITOR_SELECTORS = {
  content: '.ProseMirror',
  nodes: '.ProseMirror .react-renderer',
  blockAction: (index: number = 0) => `[data-testid=${TEST_ID_ENUM.editor.blockAction.button.id}] >> nth=${index}`
}
