import { Editor } from '@/components/document/Editor'
import { PageList } from '@/components/sidebar/PageList'
import { test, expect } from '@/fixtures/testFixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'

test.describe('Editor Basic', () => {
  let editor: Editor
  let pageList: PageList

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    editor = new Editor(page)
    pageList = new PageList(page)
    await pageList.removeAllPages()
    await pageList.addPage()
  })

  test('Verify editor can add new line when click on the end of document', () => {
    editor.getEditorContent().type('hello')
  })
})
