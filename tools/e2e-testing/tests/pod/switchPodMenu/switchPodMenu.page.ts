import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { SWITCH_POD_MENU_SELECTOR } from './switchPodMenu.selector'
import { SignInPage } from '@/tests/account/signIn/signIn.page'
import { GeneralTabPage } from '../generalTab/generalTab.page'
import { PodSidebarPage } from '../podSidebar/podSidebar.page'

export class SwitchPodMenuPage extends CommonPage {
  readonly openMenuButton = this.get('openMenuButton')
  readonly currentPodName = this.get('currentPodName')
  readonly podName = this.get('podName')
  readonly createPodButton = this.get('createPod')
  readonly podNameInput = this.get('podNameInput')
  readonly logOutButton = this.get('logOutButton')
  readonly settingPods = this.get('settingPods')

  get(selector: keyof typeof SWITCH_POD_MENU_SELECTOR): Locator {
    return this.locator(SWITCH_POD_MENU_SELECTOR[selector])
  }

  async openSwitchPodMenu(): Promise<void> {
    await this.openMenuButton.click()
  }

  async switchPod(podName: string): Promise<void> {
    await this.openSwitchPodMenu()
    await this.podName.locator(`text=${podName}`).click()
  }

  async openCreatePodDialog(): Promise<void> {
    await this.openSwitchPodMenu()
    await this.createPodButton.click()
  }

  async logOut(): Promise<SignInPage> {
    await this.openSwitchPodMenu()
    await this.logOutButton.click()
    await this.page.waitForNavigation()
    return new SignInPage(this.page)
  }

  async cancelCreatePod(): Promise<void> {
    await this.openCreatePodDialog()
    await this.dialogCancelButton.click()
  }

  async createPod(name: string): Promise<void> {
    await this.openCreatePodDialog()
    await this.podNameInput.fill(name)
    await this.dialogCreateButton.click()
  }

  async gotoPersonalSetting(): Promise<{
    generalTab: GeneralTabPage
    podSideBar: PodSidebarPage
  }> {
    await this.openMenuButton.click()
    await this.menubarItems.nth(0).hover()
    await this.settingPods.nth(0).click()
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
    await this.openMenuButton.click()
    await this.menubarItems.nth(index).hover()
    await this.settingPods.nth(index).click()
    await this.page.waitForNavigation()
    return {
      generalTab: new GeneralTabPage(this.page),
      podSideBar: new PodSidebarPage(this.page)
    }
  }
}
