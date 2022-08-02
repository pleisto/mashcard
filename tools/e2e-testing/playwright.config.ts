import { devices, PlaywrightTestConfig } from '@playwright/test'
import isCI from 'is-ci'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  forbidOnly: isCI,
  retries: 2,
  reporter: [['list'], ['allure-playwright']],
  timeout: 20000,
  workers: 1,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000/',
    trace: 'retain-on-failure',
    video: 'off',
    screenshot: 'off',
    navigationTimeout: 10000,
    storageState: `./storage/${process.env.TEST_BROWSER}-${process.env.TEST_MODULE}.json`
  },
  globalSetup: './global-setup',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1780, height: 720 }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1780, height: 720 }
      }
    }
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: './storageState-firefox.json'
    //   }
    // }
  ]
}

export default config
