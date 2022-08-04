import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { TEAM_SELECTOR } from './team.selector'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'

export class TeamPage extends CommonPage {
  readonly toggleInviteButton = this.get('toggleInvite')
  readonly inviteInput = this.get('inviteInput')
  readonly resetInviteButton = this.get('resetInvite')
  readonly memberLeaves = this.get('memberLeaves')
  readonly deletePodButton = this.get('deletePodButton')

  get(selector: keyof typeof TEAM_SELECTOR): Locator {
    return this.locator(TEAM_SELECTOR[selector])
  }

  async toggleInvite(status: 'enable' | 'disable'): Promise<void> {
    const currentStatus = (await this.toggleInviteButton.getAttribute('class'))?.includes('-checked-true')
      ? 'enable'
      : 'disable'

    if (currentStatus !== status) {
      await this.waitForResponseWithAction(
        'createOrUpdatePod',
        this.toggleInviteButton.locator('input').setChecked(status === 'enable', { force: true })
      )
    }
  }

  async resetInviteLink(): Promise<string> {
    await this.resetInviteButton.click()
    await this.dialogConfirmButton.click()
    return await this.inviteInput.inputValue()
  }

  async leaveTeam(index: number): Promise<void> {
    await this.memberLeaves.nth(index).click()
  }

  async deletePod(podName: string): Promise<PageTreePage> {
    await this.deletePodButton.click()
    await this.dialogInput.fill(podName)
    await this.waitForResponseWithAction('groupDestroy', this.dialogDeletePodButton.click())
    await this.page.waitForNavigation()
    return new PageTreePage(this.page)
  }
}
