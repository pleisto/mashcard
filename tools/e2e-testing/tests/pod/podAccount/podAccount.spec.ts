import { test } from '@/fixtures'
import { PodSidebarPage } from '../podSidebar/podSidebar.page'
import { PodSettingTab } from '../podSidebar/podSidebar.selector'
import { SwitchPodMenuPage } from '../switchPodMenu/switchPodMenu.page'
import { AccountPage } from './podAccount.page'

test.describe('Team Pod', () => {
  let switchPodMenu: SwitchPodMenuPage
  let podSideBar: PodSidebarPage
  let account: AccountPage

  test.beforeEach(async ({ api, page }) => {
    await api.destroyAllCreatedPod()
    switchPodMenu = new SwitchPodMenuPage(page)
    podSideBar = (await switchPodMenu.gotoPersonalSetting()).podSideBar
    account = (await podSideBar.toggleTab(PodSettingTab.Account)) as AccountPage
  })

  test('not as a owner of a pod, can delete account', async () => {
    await account.deleteAccount()
  })

  /**
   * TODO:
   * 1. join pod, leave pod
   * 2. as a owner of a pod, can not delete account
   * 3. not as a owner of a pod, can delete account
   */
})
