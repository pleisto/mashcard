import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { ActionType, COMMON_SELECTORS } from '@/tests/common/common.selector'
import { SWITCH_POD_MENU_SELECTOR } from './switchPodMenu.selector'
import { SignInPage } from '@/tests/account/signIn/signIn.page'
import { GeneralTabPage } from '../generalTab/generalTab.page'
import { PodSidebarPage } from '../podSidebar/podSidebar.page'

export class SwitchPodMenuPage extends CommonPage {
  getOpenSwitchPodMenuButton(): Locator {
    return this.page.locator(SWITCH_POD_MENU_SELECTOR.openMenuButton)
  }

  getCurrentPodName(): Locator {
    return this.page.locator(SWITCH_POD_MENU_SELECTOR.currentPodName)
  }

  getPodByName(name: string): Locator {
    return this.page.locator(COMMON_SELECTORS.menubarItems).locator(SWITCH_POD_MENU_SELECTOR.podName(name))
  }

  getPods(): Locator {
    return this.page.locator(COMMON_SELECTORS.menubarItems)
  }

  getCreatePodButton(): Locator {
    return this.page.locator(SWITCH_POD_MENU_SELECTOR.createPod)
  }

  getLogOutButton(): Locator {
    return this.page.locator(SWITCH_POD_MENU_SELECTOR.logOutButton)
  }

  getPodInput(): Locator {
    return this.page.locator(SWITCH_POD_MENU_SELECTOR.podNameInput)
  }

  getPodSettingButton(index: number = 0): Locator {
    return this.page.locator(SWITCH_POD_MENU_SELECTOR.settingPod(index))
  }

  async openSwitchPodMenu(): Promise<void> {
    await this.getOpenSwitchPodMenuButton().click()
  }

  async switchPod(podName: string): Promise<void> {
    await this.openSwitchPodMenu()
    await this.getPodByName(podName).click()
  }

  async openCreatePodDialog(): Promise<void> {
    await this.openSwitchPodMenu()
    await this.getCreatePodButton().click()
  }

  async logOut(): Promise<SignInPage> {
    await this.openSwitchPodMenu()
    await this.getLogOutButton().click()
    await this.page.waitForNavigation()
    return new SignInPage(this.page)
  }

  async cancelCreatePod(): Promise<void> {
    await this.openCreatePodDialog()
    await this.getDialogActionButton(ActionType.Cancel).click()
  }

  async createPod(name: string): Promise<void> {
    await this.openCreatePodDialog()
    await this.getPodInput().fill(name)
    await this.getDialogActionButton(ActionType.Create).click()
  }

  async gotoPersonalSetting(): Promise<{
    generalTab: GeneralTabPage
    podSideBar: PodSidebarPage
  }> {
    await this.getOpenSwitchPodMenuButton().click()
    await this.getPods().nth(0).hover()
    await this.getPodSettingButton().click()
    await this.page.waitForNavigation()
    return {
      generalTab: new GeneralTabPage(this.page),
      podSideBar: new PodSidebarPage(this.page)
    }
  }

  async gotoPublicSetting(index: number): Promise<{
    generalTab: GeneralTabPage
    podSideBar: PodSidebarPage
  }> {
    await this.getOpenSwitchPodMenuButton().click()
    await this.getPods().nth(index).hover()
    await this.getPodSettingButton(index).click()
    await this.page.waitForNavigation()
    return {
      generalTab: new GeneralTabPage(this.page),
      podSideBar: new PodSidebarPage(this.page)
    }
  }
}
