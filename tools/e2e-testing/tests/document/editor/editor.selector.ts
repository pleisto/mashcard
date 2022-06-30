import { TEST_ID_ENUM } from '@/../../packages/test-helper/src'

export const EDITOR_SELECTORS = {
  content: '.ProseMirror',
  nodes: '.ProseMirror .react-renderer',
  blockAction: (index: number = 0) => `[data-testid=${TEST_ID_ENUM.editor.blockAction.button.id}] >> nth=${index}`
}
