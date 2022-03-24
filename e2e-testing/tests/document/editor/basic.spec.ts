import { Editor } from '@/components/document/Editor'
import { PageList } from '@/components/sidebar/PageList'
import { test } from '@/fixtures/testFixtures'

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

  // eslint-disable-next-line jest/expect-expect
  test('Verify editor can add new line when click on the end of document', () => {
    void editor.getEditorContent().type('hello')
  })
})
