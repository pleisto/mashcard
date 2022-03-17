import { COMMON_SELECTORS } from '../common'

export const SIDEBAR_SELECTORS = {
  mainActions: {
    pageSection: '[data-test-id=page-tree-heading]',
    pageList: '[data-testid="virtual-list"]',
    addPageButton: 'button[data-testid="page-document-page-add-page-button"]',
    trashButton: '.mainActions nav button:has-text("Trash")',
    addSubPageButton: '[data-test-id=content-action] .brd-icon-add',
    moreActionIcon: '[data-test-id=content-action] .brd-icon-more',
    pageItem: (index: number) => `[data-test-id="BrkTree"] >> nth=${index}`,
    pageIndent: '[data-test-id=indent]',
    actionButton: (button: string) => `[role="menuitem"]:has-text("${button}")`,
    renameInput: `${COMMON_SELECTORS.tooltip} .MuiInput-input`,
    arrow: '[data-test-id=content-arrow]'
  },
  footer: {}
}
