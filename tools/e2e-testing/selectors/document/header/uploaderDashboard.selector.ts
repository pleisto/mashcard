import { CoverTab } from './cover.selector'
import { IconTab } from './icon.selector'

export type TabType = IconTab | CoverTab

export const UPLOADER_DASHBOARD_SELECTOR = {
  tabButton: (tab: TabType) => `.uploader-dashboard-navbar button:has-text("${tab}")`,
  uploadImageButton: '.dashboard-upload-file-input',
  linkInput: '[data-testid=uploader-dashboard-modules-link-input]',
  linkSubmitButton: '[data-testid=uploader-dashboard-modules-link-button]',
  invalidUrlTooltip: 'span:has-text("Invalid image url")',
  removeButton: '.uploader-dashboard-action-buttons button:has-text("Remove")'
}
