import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const TEAM_SELECTOR = {
  inviteMember: {
    switch: `div[data-testid=${TEST_ID_ENUM.component.switch.id}]`,
    input: `div[data-testid=${TEST_ID_ENUM.pod.teamPod.inviteInput.id}] input`,
    reset: `button[data-testid=${TEST_ID_ENUM.pod.teamPod.reset.id}]`
  },
  members: {
    leave: (index: number) => `button:has-text("Leave") >> nth=${index}`
  },
  deletePod: {
    button: 'button:has-text("Delete This Team Pod")'
  }
}
