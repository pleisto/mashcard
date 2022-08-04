import { UPLOADER_DATA } from '@/tests/document/uploaderDashboard/uploaderDashboard.data'
import { test, expect } from '@/fixtures'
import { DocumentTitlePage } from '@/tests/document/documentTitle/documentTitle.page'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import path from 'path'
import { INITIAL_PAGE } from '@/tests/common/common.data'
import { COMMON_SELECTORS } from '@/tests/common/common.selector'
import { IconPage } from './icon.page'

test.describe('Add Icon', () => {
  let icon: IconPage
  let pageTree: PageTreePage
  let documentTitle: DocumentTitlePage
  const EMOJI = {
    name: 'grinning squinting face',
    icon: '😆'
  }

  const EMOJI_2 = {
    name: 'fearful face',
    icon: '😨'
  }

  test.beforeEach(async ({ api, page }) => {
    pageTree = new PageTreePage(page)
    documentTitle = new DocumentTitlePage(page)

    await api.removeAllPages()
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()
    await pageTree.clickPage()
    icon = await documentTitle.openIconPopup()
  })

  test.describe('Icon popup', async () => {
    test('Verify icon popup is in viewport', ({ pageExtend }) => {
      expect(pageExtend.isInViewPort(COMMON_SELECTORS.tooltip)).toBeTruthy()
    })

    test('Verify popup will be closed when click out of popup', async () => {
      await documentTitle.article.click({ position: { x: 10, y: 10 } })

      await expect(icon.tooltip).not.toBeVisible()
    })

    test('Verify select icon will close popup when has not icon', async () => {
      await icon.addEmoji(EMOJI.name)

      await expect(icon.tooltip).not.toBeVisible()
    })

    test('Verify select icon will not close popup when has icon', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()

      await icon.addEmoji(EMOJI_2.name)

      await expect(icon.tooltip).toBeVisible()
    })
  })

  test.describe('Icon Tab', async () => {
    const ACTIVE_CLASS = /active/

    test('Verify focused on Emoji Tab by default', async () => {
      await expect(icon.emojiTab).toHaveClass(ACTIVE_CLASS)
    })

    test('Verify toggle Tab is working well', async () => {
      await icon.switchTab('uploadImageTab')

      await expect(icon.emojiTab).not.toHaveClass(ACTIVE_CLASS)
      await expect(icon.uploadImageTab).toHaveClass(ACTIVE_CLASS)

      await icon.switchTab('linkTab')

      await expect(icon.uploadImageTab).not.toHaveClass(ACTIVE_CLASS)
      await expect(icon.linkTab).toHaveClass(ACTIVE_CLASS)
    })
  })

  test.describe('Emoji', async () => {
    test('Verify it will show responding emoji when search by name', async () => {
      await icon.searchEmoji(EMOJI.name)

      await expect(icon.items.nth(0)).toContainText(EMOJI.icon)
    })

    test('Verify emoji can be added front of title', async () => {
      await icon.addEmoji(EMOJI.name)

      await expect(documentTitle.emoji).toContainText(EMOJI.icon)
    })

    test('Verify emoji will be shown in the RECENT group as first', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()

      await expect(icon.items.nth(0)).toContainText(EMOJI.icon)
    })
  })

  test.describe('Icon Remove', async () => {
    test('Verify Remove button is not shown when no icon', async () => {
      await expect(icon.removeButton).not.toBeVisible()
    })

    test('Verify icon will be removed when click remove button', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()

      await icon.remove()

      await expect(icon.tooltip).not.toBeVisible()
      await expect(documentTitle.emoji).not.toBeVisible()
    })

    test('Verify Recent icon is not empty when remove icon', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()
      await icon.remove()

      await documentTitle.openIconPopup()

      await expect(icon.items.nth(0)).toContainText(EMOJI.icon)
    })
  })

  // CORS issue, blocked by: https://github.com/pleisto/corp/issues/1637
  test.skip('Upload an Image', async () => {
    test('Verify icon will be added when upload an image', async () => {
      await icon.switchTab('uploadImageTab')

      await icon.uploadImage(path.join(__dirname, './icon.data.jpg'))

      await expect(documentTitle.imageIcon).toHaveCSS('background-image', /url*/)
    })
  })

  test.describe('Link', async () => {
    test('Verify will show error tooltip when paste invalid image url', async () => {
      await icon.switchTab('linkTab')
      await icon.pasteImageLink(UPLOADER_DATA.INVALID_URL)

      await expect(icon.errorTooltip).toBeVisible()
    })

    test('Verify icon will be added when paste an valid image url', async () => {
      await icon.switchTab('linkTab')
      await icon.pasteImageLink(UPLOADER_DATA.CORRECT_URL)

      await expect(documentTitle.imageIcon).toHaveCSS('background-image', /url*/)
    })
  })
})
