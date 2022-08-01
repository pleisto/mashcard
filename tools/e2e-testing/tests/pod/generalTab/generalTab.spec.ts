import { test, expect } from '@/fixtures'
import path from 'path'
import { PodSidebarPage } from '../podSidebar/podSidebar.page'
import { SwitchPodMenuPage } from '../switchPodMenu/switchPodMenu.page'
import { GeneralTabPage } from './generalTab.page'

test.describe('General Tab', () => {
  let switchPodMenu: SwitchPodMenuPage
  let generalTab: GeneralTabPage
  let podSideBar: PodSidebarPage
  const podName = 'e2eTestPod'

  test.describe('Profile', () => {
    test.beforeEach(async ({ api, page }) => {
      await api.destroyAllCreatedPod()
      await api.createPod('newPod')
      switchPodMenu = new SwitchPodMenuPage(page)
      const pod = await switchPodMenu.gotoPublicSetting(1)
      generalTab = pod.generalTab
      podSideBar = pod.podSideBar
    })

    test('Verify rename pod is working well', async () => {
      await generalTab.updateProfileName(podName)

      await expect(podSideBar.getCurrentPodName()).toContainText(podName)
    })

    // Skip it for now, because the method to get input value needs to be reconsidered
    test.skip('Verify update bio is working well', async ({ page }) => {
      const bio = 'This is the bio'
      await generalTab.updateProfileBio(bio)
      await page.reload()
      await expect(generalTab.getProfileBioInput()).toContainText(bio)
    })

    test('Verify it will open uploader when click avatar', async () => {
      await generalTab.openUploadAvatarDialog()

      await expect(generalTab.getUploadDashboard()).toContainText('Local File')
    })

    // CORS issue, blocked by: https://github.com/pleisto/corp/issues/1637
    test.skip('Verify avatar will be updated when upload photo', async () => {
      await generalTab.updateAvatar(path.join(__dirname, './generalTab.data.jpg'))

      await expect(generalTab.getAvatar()).toHaveAttribute('src', /https*/)
    })
  })

  test.describe('Domain', () => {
    test.beforeEach(async ({ api, page }) => {
      await api.destroyAllCreatedPod()
      await api.createPod('newPod')
      switchPodMenu = new SwitchPodMenuPage(page)
      const pod = await switchPodMenu.gotoPublicSetting(1)
      generalTab = pod.generalTab
      podSideBar = pod.podSideBar
    })

    // Skip it for now, because the method to get input value needs to be reconsidered
    test.skip('Verify update domain name is working well', async ({ page }) => {
      const domainName = 'testDomain'
      await generalTab.updateDomainName(domainName)
      await page.reload()

      await expect(generalTab.getDomainInput()).toContainText(domainName)
    })

    test('Verify it will open a new tab when click learn moe', async ({ context }) => {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        generalTab.getDomainLearnMore().click() // Opens a new tab
      ])
      await expect(newPage).toHaveURL('https://help.mashacard.cloud/en/articles/5972616-mashcard-username-policy')
    })
  })

  test.describe('Display', () => {
    test.beforeEach(async ({ page }) => {
      switchPodMenu = new SwitchPodMenuPage(page)
      const pod = await switchPodMenu.gotoPersonalSetting()
      generalTab = pod.generalTab
      podSideBar = pod.podSideBar
    })

    test('Verify select timezone is working well', async () => {
      const timezone = 'US/Central'
      await generalTab.updateTimezone(timezone)

      await expect(generalTab.getTimezoneInput()).toContainText(timezone)
    })
  })
})
