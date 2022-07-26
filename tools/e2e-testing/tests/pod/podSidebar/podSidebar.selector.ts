import { TEST_ID_ENUM } from '@mashcard/test-helper'

export enum PodSettingTab {
  General = 'General',
  Account = 'Account',
  'Team Pod' = 'Team Pod'
}

export const POD_SIDEBAR_SELECTOR = {
  openMenuButton: 'header span[role="img"].mc-icon-change',
  currentPodName: `header span[data-testid=${TEST_ID_ENUM.pod.name.id}]`,
  backToPodButton: 'footer button:has-text("Back to Pod")',
  settingTab: (tab: PodSettingTab) => `section nav a:has-text("${tab}")`
}
