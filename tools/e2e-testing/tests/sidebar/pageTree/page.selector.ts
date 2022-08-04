import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { COMMON_SELECTORS } from '@/tests/common/common.selector'

export const PAGE_SELECTOR = {
  pageSection: `[data-testid=${TEST_ID_ENUM.page.pageTree.heading.id}]`,
  pageTree: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.id}]`,
  addPageButton: `button[data-testid=${TEST_ID_ENUM.page.DocumentPage.addPageButton.id}]`,
  addSubPageButtons: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.action.id}] .mc-icon-add`,
  moreActionIcons: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.action.id}] .mc-icon-more`,
  pages: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.id}]`,
  subPages: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.indent.id}]`,
  renameInput: `${COMMON_SELECTORS.tooltip} .MuiInput-input`,
  arrows: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.arrow.id}]`
}
