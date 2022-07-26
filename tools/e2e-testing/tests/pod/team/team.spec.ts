import { test, expect } from '@/fixtures'
import { PodSidebarPage } from '../podSidebar/podSidebar.page'
import { PodSettingTab } from '../podSidebar/podSidebar.selector'
import { SwitchPodMenuPage } from '../switchPodMenu/switchPodMenu.page'
import { TeamPage } from './team.page'

test.describe('Team Pod', () => {
  let switchPodMenu: SwitchPodMenuPage
  let podSideBar: PodSidebarPage
  let teamPod: TeamPage
  const podName = 'testPod'

  test.beforeEach(async ({ api, page }) => {
    await api.destroyAllCreatedPod()
    await api.createPod(podName)
    switchPodMenu = new SwitchPodMenuPage(page)
    podSideBar = (await switchPodMenu.gotoPublicSetting(1)).podSideBar
    teamPod = (await podSideBar.toggleTab(PodSettingTab['Team Pod'])) as TeamPage
  })

  test('Verify toggle invite link button is working well', async () => {
    await teamPod.toggleInvite('enable')
    await expect(teamPod.getInviteInput()).toBeVisible()

    await teamPod.toggleInvite('disable')
    await expect(teamPod.getInviteInput()).not.toBeVisible()
  })

  test('Verify it will generate a new link when click reset', async () => {
    await teamPod.toggleInvite('enable')
    const link = await teamPod.getInviteInput().inputValue()
    const newLink = await teamPod.resetInviteLink()

    expect(newLink).not.toEqual(link)
  })

  test('Verify that the first member can not leave', async () => {
    await expect(teamPod.getLeaveByIndex()).toHaveAttribute('disabled', '')
  })

  test.only('Verify pod can be removed', async () => {
    const page = await teamPod.deletePod(podName)

    await expect(page.getAddPageButton()).toBeVisible()
  })

  /**
   * TODO:
   * 1. other user join pod from invite link
   * 2. leave pod which user is not a owner
   */
})
