import "./docs.less"
import { ConfigProvider } from '../components'

export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['Guideline',['Introduction']],
    },
  },
}

export const decorators = [
  (Story) => (
    <ConfigProvider><Story /></ConfigProvider>
  )
]
