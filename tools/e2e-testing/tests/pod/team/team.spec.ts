import { test, expect } from '@/fixtures'
import { generateUUID } from '@/helpers/utils/uuid'
import { PodSidebarPage } from '../podSidebar/podSidebar.page'
import { SwitchPodMenuPage } from '../switchPodMenu/switchPodMenu.page'
import { TeamPage } from './team.page'

test.describe('Team Pod', () => {
  let switchPodMenu: SwitchPodMenuPage
  let podSideBar: PodSidebarPage
  let teamPod: TeamPage
  const podName = generateUUID()

  test.beforeEach(async ({ api, page }) => {
    await api.destroyAllCreatedPod()
    await api.createPod(podName)
    await api.pageReload()
    switchPodMenu = new SwitchPodMenuPage(page)
    podSideBar = (await switchPodMenu.gotoPublicSetting(1)).podSideBar
    teamPod = (await podSideBar.toggleTab('teamTab')) as TeamPage
  })

  test('Verify toggle invite link button is working well', async () => {
    await teamPod.toggleInvite('enable')
    await expect(teamPod.inviteInput).toBeVisible()

    await teamPod.toggleInvite('disable')
    await expect(teamPod.inviteInput).not.toBeVisible()
  })

  test('Verify it will generate a new link when click reset', async () => {
    await teamPod.toggleInvite('enable')
    const link = await teamPod.inviteInput.inputValue()
    const newLink = await teamPod.resetInviteLink()

    expect(newLink).not.toEqual(link)
  })

  test('Verify that the first member can not leave', async () => {
    await expect(teamPod.memberLeaves.nth(0)).toHaveAttribute('disabled', '')
  })

  test('Verify pod can be removed', async () => {
    const page = await teamPod.deletePod(podName)

    await expect(page.addPageButton).toBeVisible()
  })

  /**
   * TODO:
   * 1. other user join pod from invite link
   * 2. leave pod which user is not a owner
   */
})
