import { COMMON_SELECTORS } from '@/tests/common/common.selector'

export const PAGE_SELECTOR = {
  pageSection: '[data-testid=page-tree-heading]',
  pageTree: '[data-testid="virtual-list"]',
  addPageButton: 'button[data-testid="page-document-page-add-page-button"]',
  addSubPageButton: (index: number) => `[data-testid=content-action] .mc-icon-add >> nth=${index}`,
  moreActionIcon: (index: number) => `[data-testid=content-action] .mc-icon-more >> nth=${index}`,
  pages: '[data-testid=McTree]',
  pageItem: (index: number) => `[data-testid=McTree] >> nth=${index}`,
  pageIndent: (index: number) => `[data-testid=indent] >> nth=${index}`,
  actionButton: (button: string, index: number) => `[role="menuitem"]:has-text("${button}") >> nth=${index}`,
  renameInput: `${COMMON_SELECTORS.tooltip} .MuiInput-input`,
  arrow: (index: number) => `[data-testid=content-arrow] >> nth=${index}`
}
