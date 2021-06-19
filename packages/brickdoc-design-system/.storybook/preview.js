import { Suspense } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import './docs.less'
import { ConfigProvider } from '../components'

i18next.use(initReactI18next).init({ lng: 'en-US' })

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
    <Suspense fallback={<div></div>}>
      <ConfigProvider>
        <Story />
      </ConfigProvider>
    </Suspense>
  )
]
