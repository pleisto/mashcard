export interface Tester {
  email: string
  password: string
}
export const TESTER: { [key: string]: Tester } = {
  chromium: {
    email: process.env.E2E_CHROMIUM_LOGIN_EMAIL ?? 'test3@example.com',
    password: process.env.E2E_CHROMIUM_LOGIN_PASSWORD ?? 'test123'
  },
  firefox: {
    email: process.env.E2E_FIREFOX_LOGIN_EMAIL ?? 'test@example.com',
    password: process.env.E2E_FIREFOX_LOGIN_PASSWORD ?? 'test123'
  }
}
