import { TEST_ID_ENUM } from '@/../../packages/test-helper/src'

export const DOCUMENT_TITLE_SELECTORS = {
  article: '#article',
  documentTitle: `[data-testid=${TEST_ID_ENUM.page.DocumentPage.titleInput.id}] input`,
  documentEmoji: `[data-testid=${TEST_ID_ENUM.page.DocumentPage.titleIcon.id}] span`,
  documentImageIcon: `[data-testid=${TEST_ID_ENUM.page.DocumentPage.titleIcon.id}] div`,
  actionButtons: `[data-testid=${TEST_ID_ENUM.page.DocumentPage.actionButtons.id}]`,
  addIconButton: '#article button:has-text("Add icon")',
  addCoverButton: '#article button:has-text("Add cover")',
  pageCover: `[data-testid=${TEST_ID_ENUM.page.DocumentPage.cover.id}] div img`,
  changeCoverButton: `[data-testid=${TEST_ID_ENUM.page.DocumentPage.coverButton.id}]`,
  removeButton: '.uploader-dashboard-action-buttons button:has-text("Remove")'
}
