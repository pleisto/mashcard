import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const TRASH_SELECTOR = {
  trashButton: `button[data-testid=${TEST_ID_ENUM.trash.button.id}]`,
  trashTitle: 'main.content title h1',
  trashSearchInput: 'main.content title .MuiInput-input',
  trashItems: `main.content ul li[data-testid=${TEST_ID_ENUM.trash.pageItem.id}]`,
  trashItemTitle: (nth: number) =>
    `main.content ul li span[data-testid=${TEST_ID_ENUM.trash.pageItem.title.id}] >> nth=${nth}`,
  trashItemPath: (nth: number) =>
    `main.content ul li div[data-testid=${TEST_ID_ENUM.trash.pageItem.path.id}] >> nth=${nth}`,
  trashItemIcon: (nth: number) =>
    `main.content ul li span[data-testid=${TEST_ID_ENUM.trash.pageItem.icon.id}] >> nth=${nth}`,
  trashItemRestoreButton: (nth: number) =>
    `main.content ul li button[data-testid=${TEST_ID_ENUM.trash.pageItem.button.restore.id}] >> nth=${nth}`,
  trashItemRemoveButton: (nth: number) =>
    `main.content ul li button[data-testid=${TEST_ID_ENUM.trash.pageItem.button.remove.id}] >> nth=${nth}`,
  trashItemCheckbox: (nth: number) =>
    `main.content ul li div[data-testid=${TEST_ID_ENUM.trash.pageItem.button.checkbox.id}] >> nth=${nth}`,
  trashSelectedCount: `main.content span[data-testid=${TEST_ID_ENUM.trash.selectedBar.count.id}]`,
  trashIndeterminate: `main.content div[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.checkbox.id}] span.mc-icon-minus`,
  trashSelectedAll: `main.content div[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.checkbox.id}] span.mc-icon-check-box`,
  trashSelectedRestore: `main.content button[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.restore.id}]`,
  trashSelectedRemove: `main.content button[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.remove.id}]`,
  deletedAt: `[data-testid=${TEST_ID_ENUM.trash.pageItem.deletedAt.id}]`
}
