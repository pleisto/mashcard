import { devices, PlaywrightTestConfig } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e-testing/tests',
  forbidOnly: Boolean(process.env.CI),
  retries: 2,
  reporter: process.env.CI ? 'dot' : 'list',
  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
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
  webServer: {
    command: 'COLLECT_COVERAGE=1 yarn dist && RAILS_ENV=test ./bin/rails server',
    port: 3000
  }
}

// eslint-disable-next-line import/no-default-export
export default config
