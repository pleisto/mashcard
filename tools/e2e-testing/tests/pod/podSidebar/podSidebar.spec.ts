import { test, expect } from '@/fixtures'
import { SwitchPodMenuPage } from '../switchPodMenu/switchPodMenu.page'
import { PodSidebarPage } from './podSidebar.page'
import { PodSettingTab } from './podSidebar.selector'

test.describe('Pod Sidebar', () => {
  let switchPodMenu: SwitchPodMenuPage
  let podSideBar: PodSidebarPage
  const podName = 'testPod'

  test.beforeEach(async ({ api, page }) => {
    await api.destroyAllCreatedPod()
    await api.createPod(podName)
    switchPodMenu = new SwitchPodMenuPage(page)
    podSideBar = (await switchPodMenu.gotoPersonalSetting()).podSideBar
  })

  test('Verify switch pods is working well', async () => {
    await podSideBar.switchPod(1)

    await expect(podSideBar.getCurrentPodName()).toContainText(podName)
  })

  test('Verify back to pod when click button', async () => {
    const page = await podSideBar.backToPod()

    await expect(page.getAddPageButton()).toBeVisible()
  })

  test('Verify that default tab is General', async () => {
    await expect(podSideBar.getSideBarTab(PodSettingTab.General)).toHaveClass(/active/)
  })

  test('Verify toggle to Account setting page when click Account Tab', async () => {
    await podSideBar.toggleTab(PodSettingTab.Account)

    await expect(podSideBar.getSideBarTab(PodSettingTab.General)).not.toHaveClass(/active/)
    await expect(podSideBar.getSideBarTab(PodSettingTab.Account)).toHaveClass(/active/)
  })
})
