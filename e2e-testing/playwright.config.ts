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
  timeout: 50000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000/',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    storageState: './storageState.json',
    navigationTimeout: 10000
  },
  globalSetup: './global-setup',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ],
  webServer: !isCI
    ? {
        command: 'NODE_ENV=test RAILS_ENV=test yarn run -T dist && (cd ..; RAILS_ENV=test ./bin/rails server)',
        port: 3000
      }
    : undefined
}

export default config
