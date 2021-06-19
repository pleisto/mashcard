import { Suspense } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import './docs.less'
import { ConfigProvider, Skeleton } from '../components'

i18next.use(initReactI18next).init({
  lng: 'en-US',
  interpolation: {
    escapeValue: false,
    prefix: "%{",
    suffix: "}",
  },
})

export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Guideline', ['Introduction']]
    }
  }
}

export const decorators = [
  Story => (
    <Suspense fallback={<Skeleton active />}>
      <ConfigProvider i18n={i18next}>
        <Story />
      </ConfigProvider>
    </Suspense>
  )
]
