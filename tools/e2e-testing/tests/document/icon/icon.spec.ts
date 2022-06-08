import { UPLOADER_DATA } from '@/tests/document/uploaderDashboard/uploaderDashboard.data'
import { test, expect } from '@/fixtures'
import { DocumentTitlePage } from '@/tests/document/documentTitle/documentTitle.page'
import { IconPage } from '@/tests/document/icon/icon.page'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import path from 'path'
import { INITIAL_PAGE } from '@/tests/common/common.data'
import { COMMON_SELECTORS } from '@/tests/common/common.selector'
import { IconTab } from './icon.selector'

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
      await documentTitle.getArticle().click({ position: { x: 10, y: 10 } })

      await expect(icon.getTooltip()).not.toBeVisible()
    })

    test('Verify select icon will close popup when has not icon', async () => {
      await icon.addEmoji(EMOJI.name)

      await expect(icon.getTooltip()).not.toBeVisible()
    })

    test('Verify select icon will not close popup when has icon', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()

      await icon.addEmoji(EMOJI_2.name)

      await expect(icon.getTooltip()).toBeVisible()
    })
  })

  test.describe('Icon Tab', async () => {
    const ACTIVE_CLASS = /active/

    test('Verify focused on Emoji Tab by default', async () => {
      await expect(icon.getTab(IconTab.Emoji)).toHaveClass(ACTIVE_CLASS)
    })

    test('Verify toggle Tab is working well', async () => {
      await icon.switchTab(IconTab.UploadImage)

      await expect(icon.getTab(IconTab.Emoji)).not.toHaveClass(ACTIVE_CLASS)
      await expect(icon.getTab(IconTab.UploadImage)).toHaveClass(ACTIVE_CLASS)

      await icon.switchTab(IconTab.Link)

      await expect(icon.getTab(IconTab.UploadImage)).not.toHaveClass(ACTIVE_CLASS)
      await expect(icon.getTab(IconTab.Link)).toHaveClass(ACTIVE_CLASS)
    })
  })

  test.describe('Emoji', async () => {
    test('Verify it will show responding emoji when search by name', async () => {
      await icon.searchEmoji(EMOJI.name)

      await expect(icon.getEmojiByIndex()).toContainText(EMOJI.icon)
    })

    test('Verify emoji can be added front of title', async () => {
      await icon.addEmoji(EMOJI.name)

      await expect(documentTitle.getDocumentEmoji()).toContainText(EMOJI.icon)
    })

    test('Verify emoji will be shown in the RECENT group as first', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()

      await expect(icon.getEmojiByIndex()).toContainText(EMOJI.icon)
    })
  })

  test.describe('Icon Remove', async () => {
    test('Verify Remove button is not shown when no icon', async () => {
      await expect(icon.getRemoveButton()).not.toBeVisible()
    })

    test('Verify icon will be removed when click remove button', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()

      await icon.remove()

      await expect(icon.getTooltip()).not.toBeVisible()
      await expect(documentTitle.getDocumentEmoji()).not.toBeVisible()
    })

    test('Verify Recent icon is not empty when remove icon', async () => {
      await icon.addEmoji(EMOJI.name)
      await documentTitle.reopenIconPopup()
      await icon.remove()

      await documentTitle.openIconPopup()

      await expect(icon.getEmojiByIndex()).toContainText(EMOJI.icon)
    })
  })

  // CORS issue, blocked by: https://github.com/brickdoc/brickdoc/issues/1637
  test.skip('Upload an Image', async () => {
    test('Verify icon will be added when upload an image', async () => {
      await icon.switchTab(IconTab.UploadImage)

      await icon.uploadImage(path.join(__dirname, './icon.data.jpg'))

      await expect(documentTitle.getDocumentImageIcon()).toHaveCSS('background-image', /url*/)
    })
  })

  test.describe('Link', async () => {
    test('Verify will show error tooltip when paste invalid image url', async () => {
      await icon.switchTab(IconTab.Link)
      await icon.pasteImageLink(UPLOADER_DATA.INVALID_URL)

      await expect(icon.getErrorTooltip()).toBeVisible()
    })

    test('Verify icon will be added when paste an valid image url', async () => {
      await icon.switchTab(IconTab.Link)
      await icon.pasteImageLink(UPLOADER_DATA.CORRECT_URL)

      await expect(documentTitle.getDocumentImageIcon()).toHaveCSS('background-image', /url*/)
    })
  })
})
