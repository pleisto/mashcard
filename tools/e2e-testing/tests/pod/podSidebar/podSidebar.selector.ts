import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const POD_SIDEBAR_TAB = {
  generalTab: 'generalTab',
  accountTab: 'accountTab',
  teamTab: 'teamTab'
}

export const POD_SIDEBAR_SELECTOR = {
  openMenuButton: 'header span[role="img"].mc-icon-change',
  currentPodName: `header span[data-testid=${TEST_ID_ENUM.pod.name.id}]`,
  backToPodButton: 'footer button:has-text("Back to Pod")',
  generalTab: 'section nav a:has-text("General")',
  accountTab: 'section nav a:has-text("Account")',
  teamTab: 'section nav a:has-text("Team Pod")'
}
