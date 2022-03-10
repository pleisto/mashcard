import { test, expect } from '../utils/baseFixtures'

// example test, will be deleted soon
test.describe('example', () => {
  test('goto Brickdoc', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('img.brk-logo')).toBeVisible()
  })
})
