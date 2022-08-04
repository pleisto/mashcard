import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const GENERAL_TAB_SELECTOR = {
  titles: 'main .container div h2',

  // profile
  nameInput: `div[data-testid=${TEST_ID_ENUM.pod.profile.nameInput.id}] input`,
  bioInput: `textarea[data-testid=${TEST_ID_ENUM.pod.profile.bioInput.id}]`,
  updateProfileButton: `button[data-testid=${TEST_ID_ENUM.pod.profile.updateButton.id}]`,

  // avatar
  editAvatar: `button[data-testid=${TEST_ID_ENUM.pod.profile.avatarUpdate.id}]`,
  avatarImg: '#sdfsdf img',
  dialogTab: '.uploader-dashboard-navbar',
  uploadAvatarButton: '.uploader-dashboard-upload-panel .dashboard-upload-file-input',

  // domain
  domainInput: `div[data-testid=${TEST_ID_ENUM.pod.domain.input.id}] input`,
  learnMore: 'a:has-text("Learn More")',
  updateDomainButton: `button[data-testid=${TEST_ID_ENUM.pod.domain.updateButton.id}]`,

  // display
  timezone: 'div[name=timezone] input',
  language: 'div[name=locale] input',
  saveButton: `button[data-testid=${TEST_ID_ENUM.pod.display.saveButton.id}]`
}
