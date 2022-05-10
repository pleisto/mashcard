import { INITIAL_PAGE } from '@/data/common.data'
import { UPLOADER_DATA } from '@/data/uploaderDashboard.data'
import { test, expect } from '@/fixtures'
import { DocumentTitlePage } from '@/pages/document/header/DocumentTitle.page'
import { IconPage } from '@/pages/document/header/Icon.page'
import { PageListPage } from '@/pages/sidebar/PageList.page'
import { BASE_SELECTORS } from '@/selectors/base'
import { EmojiGroup, IconTab } from '@/selectors/document'
import path from 'path'

test.describe('Add Icon', () => {
  let icon: IconPage
  let pageList: PageListPage
  let documentTitle: DocumentTitlePage

  test.beforeEach(async ({ api, page }) => {
    pageList = new PageListPage(page)
    documentTitle = new DocumentTitlePage(page)

    await api.removeAllPages()
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()
    await pageList.clickPage()
    icon = await documentTitle.openIconPopup()
  })

  test.describe('Icon popup', async () => {
    test('Verify icon popup is in viewport', async ({ pageExtend }) => {
      await expect(pageExtend.isInViewPort(BASE_SELECTORS.tooltip)).toBeTruthy()
    })

    test('Verify popup will be closed when click out of popup', async () => {
      await documentTitle.getArticle().click({ position: { x: 10, y: 10 } })

      await expect(icon.getTooltip()).not.toBeVisible()
    })

    test('Verify select icon will close popup when has not icon', async () => {
      await icon.addEmoji(EmojiGroup.SmileysAndEmotion)

      await expect(icon.getTooltip()).not.toBeVisible()
    })

    test('Verify select icon will not close popup when has icon', async () => {
      await icon.addEmoji(EmojiGroup.SmileysAndEmotion)
      await documentTitle.reopenIconPopup()

      await icon.addEmoji(EmojiGroup.SmileysAndEmotion, 1)

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
    const EMOJI = {
      name: 'grinning squinting face',
      icon: '😆'
    }

    test('Verify it will show responding emoji when search by name', async () => {
      await icon.searchEmoji(EMOJI.name)

      await expect(icon.getEmojiByGroup(EmojiGroup.SmileysAndEmotion)).toContainText(EMOJI.icon)
    })

    test('Verify emoji can be added front of title', async () => {
      await icon.addEmoji(EmojiGroup.SmileysAndEmotion, 4)

      await expect(documentTitle.getDocumentEmoji()).toContainText(EMOJI.icon)
    })

    test('Verify emoji will be shown in the RECENT group as first', async () => {
      await icon.addEmoji(EmojiGroup.SmileysAndEmotion, 4)
      await documentTitle.reopenIconPopup()

      await expect(icon.getEmojiByGroup(EmojiGroup.Recent)).toContainText(EMOJI.icon)
    })
  })

  test.describe('Icon Remove', async () => {
    test('Verify Remove button is not shown when no icon', async () => {
      await expect(icon.getRemoveButton()).not.toBeVisible()
    })

    test('Verify icon will be removed when click remove button', async () => {
      await icon.addEmoji(EmojiGroup.SmileysAndEmotion)
      await documentTitle.reopenIconPopup()

      await icon.remove()

      await expect(icon.getTooltip()).not.toBeVisible()
      await expect(documentTitle.getDocumentEmoji()).not.toBeVisible()
    })

    test('Verify Recent icon is not empty when remove icon', async () => {
      await icon.addEmoji(EmojiGroup.SmileysAndEmotion)
      await documentTitle.reopenIconPopup()
      await icon.remove()

      await documentTitle.openIconPopup()

      await expect(icon.getEmojiByGroup(EmojiGroup.Recent)).toContainText('😀')
    })
  })

  // CORS issue, blocked by: https://github.com/brickdoc/brickdoc/issues/1637
  test.skip('Upload an Image', async () => {
    test('Verify icon will be added when upload an image', async () => {
      await icon.switchTab(IconTab.UploadImage)

      await icon.uploadImage(path.join(__dirname, '../../data/imgs/icon.jpg'))

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
