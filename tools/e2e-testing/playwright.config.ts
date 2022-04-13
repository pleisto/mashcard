import { devices, PlaywrightTestConfig } from '@playwright/test'
import isCI from 'is-ci'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  forbidOnly: isCI,
  retries: 2,
  reporter: isCI ? [['dot'], ['github']] : 'list',
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
        storageState: './storageState-chromium.json'
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: './storageState-firefox.json'
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
        command: 'NODE_ENV=test RAILS_ENV=test yarn run -T dist && (cd ../../; RAILS_ENV=test ./bin/rails server)',
        port: 3000
      }
    : undefined
}

export default config
