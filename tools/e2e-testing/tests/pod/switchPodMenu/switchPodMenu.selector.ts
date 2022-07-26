import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const SWITCH_POD_MENU_SELECTOR = {
  openMenuButton: 'header span[role="img"].mc-icon-change',
  currentPodName: `header span[data-testid=${TEST_ID_ENUM.pod.name.id}]`,
  podName: (name: string) => `span[data-testid=${TEST_ID_ENUM.pod.name.id}]:has-text("${name}")`,
  createPod: 'li[role=menuitem]:has-text("Create New pod")',
  podNameInput: 'input[name="name"]',
  logOutButton: 'li[role=menuitem]:has-text("Log out")',
  settingPod: (index: number) => `.action-setting >> nth=${index}`
}
