import { COMMON_SELECTORS } from '../common'

export const PAGE_SELECTOR = {
  pageSection: '[data-testid=page-tree-heading]',
  pageList: '[data-testid="virtual-list"]',
  addPageButton: 'button[data-testid="page-document-page-add-page-button"]',
  addSubPageButton: (index: number) => `[data-testid=content-action] .brd-icon-add >> nth=${index}`,
  moreActionIcon: (index: number) => `[data-testid=content-action] .brd-icon-more >> nth=${index}`,
  pageItem: (index: number) => `[data-testid="BrkTree"] >> nth=${index}`,
  pageIndent: (index: number) => `[data-testid=indent] >> nth=${index}`,
  actionButton: (button: string, index: number) => `[role="menuitem"]:has-text("${button}") >> nth=${index}`,
  renameInput: `${COMMON_SELECTORS.tooltip} .MuiInput-input`,
  arrow: (index: number) => `[data-testid=content-arrow] >> nth=${index}`
}
