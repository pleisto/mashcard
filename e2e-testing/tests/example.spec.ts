import { test, expect } from '../utils/baseFixtures'

test.describe('example', () => {
  test('goto Brickdoc', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[name=email]')).toHaveAttribute('type', 'email')
  })
})
