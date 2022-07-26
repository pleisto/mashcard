import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const BLOCK_ACTION_SELECTORS = {
  blockAction: (index: number = 0) =>
    `[data-testid=${TEST_ID_ENUM.editor.blockAction.button.id}] button >> nth=${index}`
}
