import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { PodSettingTab, POD_SIDEBAR_SELECTOR } from './podSidebar.selector'
import { COMMON_SELECTORS } from '@/tests/common/common.selector'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { GeneralTabPage } from '../generalTab/generalTab.page'
import { TeamPage } from '../team/team.page'
import { AccountPage } from '../podAccount/podAccount.page'

type SidebarTabPage = GeneralTabPage | TeamPage | AccountPage

export class PodSidebarPage extends CommonPage {
  getCurrentPodName(): Locator {
    return this.page.locator(POD_SIDEBAR_SELECTOR.currentPodName)
  }

  getOpenSwitchPodMenuButton(): Locator {
    return this.page.locator(POD_SIDEBAR_SELECTOR.openMenuButton)
  }

  getPodsByIndex(index: number = 0): Locator {
    return this.page.locator(COMMON_SELECTORS.menubarItems).nth(index)
  }

  getBackToPodButton(): Locator {
    return this.page.locator(POD_SIDEBAR_SELECTOR.backToPodButton)
  }

  getSideBarTab(tab: PodSettingTab): Locator {
    return this.page.locator(POD_SIDEBAR_SELECTOR.settingTab(tab))
  }

  async switchPod(index: number = 0): Promise<void> {
    await this.getOpenSwitchPodMenuButton().click()
    await this.getPodsByIndex(index).click()
    await this.page.waitForNavigation()
  }

  async toggleTab(tab: PodSettingTab): Promise<SidebarTabPage> {
    await this.getSideBarTab(tab).click()

    switch (tab) {
      case PodSettingTab['Team Pod']:
        return new TeamPage(this.page)
      case PodSettingTab.Account:
        return new AccountPage(this.page)
      default:
        return new GeneralTabPage(this.page)
    }
  }

  async backToPod(): Promise<PageTreePage> {
    await this.getBackToPodButton().click()
    await this.page.waitForNavigation()
    return new PageTreePage(this.page)
  }
}
