import { test, expect } from '@/fixtures'
import { SwitchPodMenuPage } from './switchPodMenu.page'

test.describe('Switch Pod Menu', () => {
  let switchPodMenu: SwitchPodMenuPage
  const podName = 'podName'

  test.beforeEach(async ({ api, page }) => {
    switchPodMenu = new SwitchPodMenuPage(page)
    await api.destroyAllCreatedPod()
    await api.createPod(podName)
    await api.pageReload()
  })

  test('Verify that create pod is working well', async ({ page }) => {
    const podName = 'createPod'
    await switchPodMenu.createPod(podName)
    await page.waitForNavigation()

    await expect(switchPodMenu.currentPodName).toContainText(podName)
  })

  test('Verify that can switch to pod when click it', async () => {
    await switchPodMenu.switchPod(podName)

    await expect(switchPodMenu.currentPodName).toContainText(podName)
  })

  test('Verify it will logout when click logout button', async () => {
    const signIn = await switchPodMenu.logOut()

    await expect(signIn.title).toContainText('Sign into MashCard')
  })

  test('Verify it will redirect to personal pod setting page', async () => {
    const { generalTab } = await switchPodMenu.gotoPersonalSetting()
    await expect(generalTab.titles.nth(0)).toContainText('User Profile')
  })

  test('Verify it will redirect to public pod setting page', async () => {
    const { generalTab } = await switchPodMenu.gotoPublicSetting(1)

    await expect(generalTab.titles.nth(0)).toContainText('Group Profile')
  })
})
