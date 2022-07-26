import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { TEAM_SELECTOR } from './team.selector'
import { ActionType } from '@/tests/common/common.selector'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'

export class TeamPage extends CommonPage {
  getInviteSwitch(): Locator {
    return this.page.locator(TEAM_SELECTOR.inviteMember.switch)
  }

  getInviteInput(): Locator {
    return this.page.locator(TEAM_SELECTOR.inviteMember.input)
  }

  getInviteLinkReset(): Locator {
    return this.page.locator(TEAM_SELECTOR.inviteMember.reset)
  }

  getLeaveByIndex(index: number = 0): Locator {
    return this.page.locator(TEAM_SELECTOR.members.leave(index))
  }

  getDeletePodButton(): Locator {
    return this.page.locator(TEAM_SELECTOR.deletePod.button)
  }

  async toggleInvite(status: 'enable' | 'disable'): Promise<void> {
    const currentStatus = (await this.getInviteSwitch().getAttribute('class'))?.includes('-checked-true')
      ? 'enable'
      : 'disable'

    if (currentStatus !== status) {
      await this.getInviteSwitch()
        .locator('input')
        .setChecked(status === 'enable', { force: true })
    }
  }

  async resetInviteLink(): Promise<string> {
    await this.getInviteLinkReset().click()
    await this.getDialogActionButton(ActionType.Confirm).click()
    return await this.getInviteInput().inputValue()
  }

  async leaveTeam(index?: number): Promise<void> {
    await this.getLeaveByIndex(index).click()
  }

  async deletePod(podName: string): Promise<PageTreePage> {
    await this.getDeletePodButton().click()
    await this.getDialogInput().fill(podName)
    await this.waitForResponseWithAction('groupDestroy', this.getDialogActionButton(ActionType['Delete Pod']).click())
    await this.page.waitForNavigation()
    return new PageTreePage(this.page)
  }
}
