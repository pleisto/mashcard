import { makeValidLocale } from '../locale.object-type'

export const enUS = makeValidLocale({
  tag: 'en-US',
  language: 'english',
  describe: 'English (United States)'
} as const)
