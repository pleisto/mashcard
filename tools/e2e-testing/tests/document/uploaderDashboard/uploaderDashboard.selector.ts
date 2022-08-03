import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const UPLOADER_DASHBOARD_SELECTOR = {
  unsplashTab: '.uploader-dashboard-navbar button:has-text("Unsplash")',
  uploadTab: '.uploader-dashboard-navbar button:has-text("Upload")',
  linkTab: '.uploader-dashboard-navbar button:has-text("Link")',
  emojiTab: '.uploader-dashboard-navbar button:has-text("Emoji")',
  uploadImageTab: '.uploader-dashboard-navbar button:has-text("Upload an Image")',
  uploadImageButton: '.dashboard-upload-file-input',
  linkInput: `div[data-testid=${TEST_ID_ENUM.uploader.Dashboard.modules.link.input.id}] input`,
  linkSubmitButton: `[data-testid=${TEST_ID_ENUM.uploader.Dashboard.modules.link.button.id}]`,
  invalidUrlTooltip: 'span:has-text("Invalid image url")',
  removeButton: '.uploader-dashboard-action-buttons button:has-text("Remove")'
}
