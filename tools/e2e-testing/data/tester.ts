export interface Tester {
  email: string
  password: string
}
export const TESTER: { [key: string]: Tester } = {
  chromium: {
    email: process.env.E2E_CHROMIUM_LOGIN_EMAIL ?? 'ADMIN3@brickdoc.com',
    password: process.env.E2E_CHROMIUM_LOGIN_PASSWORD ?? 'PASSWORD3'
  },
  firefox: {
    email: process.env.E2E_FIREFOX_LOGIN_EMAIL ?? 'ADMIN4@brickdoc.com',
    password: process.env.E2E_FIREFOX_LOGIN_PASSWORD ?? 'PASSWORD4'
  }
}
