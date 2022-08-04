import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const TEAM_SELECTOR = {
  toggleInvite: `div[data-testid=${TEST_ID_ENUM.component.switch.id}]`,
  inviteInput: `div[data-testid=${TEST_ID_ENUM.pod.teamPod.inviteInput.id}] input`,
  resetInvite: `button[data-testid=${TEST_ID_ENUM.pod.teamPod.reset.id}]`,
  memberLeaves: 'button:has-text("Leave")',
  deletePodButton: 'button:has-text("Delete This Team Pod")'
}
