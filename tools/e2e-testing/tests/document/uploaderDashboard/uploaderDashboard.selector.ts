import { TEST_ID_ENUM } from '@/../../packages/test-helper/src'
import { CoverTab } from '@/tests/document/cover/cover.selector'
import { IconTab } from '@/tests/document/icon/icon.selector'

export type TabType = IconTab | CoverTab

export const UPLOADER_DASHBOARD_SELECTOR = {
  tabButton: (tab: TabType) => `.uploader-dashboard-navbar button:has-text("${tab}")`,
  uploadImageButton: '.dashboard-upload-file-input',
  linkInput: `div[data-testid=${TEST_ID_ENUM.uploader.Dashboard.modules.link.input.id}] input`,
  linkSubmitButton: `[data-testid=${TEST_ID_ENUM.uploader.Dashboard.modules.link.button.id}]`,
  invalidUrlTooltip: 'span:has-text("Invalid image url")',
  removeButton: '.uploader-dashboard-action-buttons button:has-text("Remove")'
}
