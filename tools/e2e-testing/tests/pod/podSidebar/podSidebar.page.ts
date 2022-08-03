import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { POD_SIDEBAR_SELECTOR, POD_SIDEBAR_TAB } from './podSidebar.selector'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { GeneralTabPage } from '../generalTab/generalTab.page'
import { TeamPage } from '../team/team.page'
import { AccountPage } from '../podAccount/podAccount.page'

type SidebarTabPage = GeneralTabPage | TeamPage | AccountPage

export class PodSidebarPage extends CommonPage {
  readonly currentPodName = this.get('currentPodName')
  readonly openMenuButton = this.get('openMenuButton')
  readonly backToPodButton = this.get('backToPodButton')
  readonly generalTab = this.get('generalTab')
  readonly accountTab = this.get('accountTab')
  readonly teamTab = this.get('teamTab')

  get(selector: keyof typeof POD_SIDEBAR_SELECTOR): Locator {
    return this.locator(POD_SIDEBAR_SELECTOR[selector])
  }

  async switchPod(index: number = 0): Promise<void> {
    await this.openMenuButton.click()
    await this.menubarItems.nth(index).click()
    await this.page.waitForNavigation()
  }

  async toggleTab(tab: keyof typeof POD_SIDEBAR_TAB): Promise<SidebarTabPage> {
    await this.locator(POD_SIDEBAR_SELECTOR[tab]).click()

    switch (tab) {
      case 'teamTab':
        return new TeamPage(this.page)
      case 'accountTab':
        return new AccountPage(this.page)
      default:
        return new GeneralTabPage(this.page)
    }
  }

  async backToPod(): Promise<PageTreePage> {
    await this.backToPodButton.click()
    await this.page.waitForNavigation()
    return new PageTreePage(this.page)
  }
}
