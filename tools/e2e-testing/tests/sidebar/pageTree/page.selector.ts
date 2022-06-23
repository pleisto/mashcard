import { TEST_ID_ENUM } from '@/../../packages/test-helper/src'
import { COMMON_SELECTORS } from '@/tests/common/common.selector'

export const PAGE_SELECTOR = {
  pageSection: `[data-testid=${TEST_ID_ENUM.page.pageTree.heading.id}]`,
  pageTree: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.id}]`,
  addPageButton: `button[data-testid=${TEST_ID_ENUM.page.DocumentPage.addPageButton.id}]`,
  addSubPageButton: (index: number) =>
    `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.action.id}] .mc-icon-add >> nth=${index}`,
  moreActionIcon: (index: number) =>
    `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.action.id}] .mc-icon-more >> nth=${index}`,
  pages: `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.id}]`,
  pageItem: (index: number) => `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.id}] >> nth=${index}`,
  pageIndent: (index: number) =>
    `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.indent.id}] >> nth=${index}`,
  actionButton: (button: string, index: number) => `[role="menuitem"]:has-text("${button}") >> nth=${index}`,
  renameInput: `${COMMON_SELECTORS.tooltip} .MuiInput-input`,
  arrow: (index: number) =>
    `[data-testid=${TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.arrow.id}] >> nth=${index}`
}
