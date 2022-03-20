import { COMMON_SELECTORS } from '../common'

export const SIDEBAR_SELECTORS = {
  mainActions: {
    pageSection: '[data-testid=page-tree-heading]',
    pageList: '[data-testid="virtual-list"]',
    addPageButton: 'button[data-testid="page-document-page-add-page-button"]',
    trashButton: '.mainActions nav button:has-text("Trash")',
    addSubPageButton: '[data-testid=content-action] .brd-icon-add',
    moreActionIcon: '[data-testid=content-action] .brd-icon-more',
    pageItem: (index: number) => `[data-testid="BrkTree"] >> nth=${index}`,
    pageIndent: '[data-testid=indent]',
    actionButton: (button: string) => `[role="menuitem"]:has-text("${button}")`,
    renameInput: `${COMMON_SELECTORS.tooltip} .MuiInput-input`,
    arrow: '[data-testid=content-arrow]'
  },
  footer: {}
}
