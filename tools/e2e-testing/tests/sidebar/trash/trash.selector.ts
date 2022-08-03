import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const TRASH_SELECTOR = {
  openTrashButton: `button[data-testid=${TEST_ID_ENUM.trash.button.id}]`,
  title: 'main.content title h1',
  searchInput: 'main.content title .MuiInput-input',
  trashes: `main.content ul li[data-testid=${TEST_ID_ENUM.trash.pageItem.id}]`,
  itemTitles: `main.content ul li span[data-testid=${TEST_ID_ENUM.trash.pageItem.title.id}]`,
  itemPaths: `main.content ul li div[data-testid=${TEST_ID_ENUM.trash.pageItem.path.id}]`,
  itemIcons: `main.content ul li span[data-testid=${TEST_ID_ENUM.trash.pageItem.icon.id}]`,
  itemRestoreButtons: `main.content ul li button[data-testid=${TEST_ID_ENUM.trash.pageItem.button.restore.id}]`,
  itemRemoveButtons: `main.content ul li button[data-testid=${TEST_ID_ENUM.trash.pageItem.button.remove.id}]`,
  itemCheckboxes: `main.content ul li div[data-testid=${TEST_ID_ENUM.trash.pageItem.button.checkbox.id}]`,
  selectedCount: `main.content span[data-testid=${TEST_ID_ENUM.trash.selectedBar.count.id}]`,
  indeterminate: `main.content div[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.checkbox.id}] span.mc-icon-minus`,
  selectedAllButton: `main.content div[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.checkbox.id}] span.mc-icon-check-box`,
  selectedRestore: `main.content button[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.restore.id}]`,
  selectedRemove: `main.content button[data-testid=${TEST_ID_ENUM.trash.selectedBar.button.remove.id}]`,
  deletedAt: `[data-testid=${TEST_ID_ENUM.trash.pageItem.deletedAt.id}]`
}
