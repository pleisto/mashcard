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
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    navigationTimeout: 10000
  },
  globalSetup: './global-setup',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './storageState-chromium.json',
        viewport: { width: 1780, height: 720 }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: './storageState-chromium.json',
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
  ],
  webServer: !isCI
    ? {
        command:
          'NODE_ENV=test RAILS_ENV=test yarn run -T web dist && (cd ../../; RAILS_ENV=test ./apps/server-monolith/bin/rails server)',
        port: 3000
      }
    : undefined
}

export default config
