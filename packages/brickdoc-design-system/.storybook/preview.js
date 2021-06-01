import "./docs.less"
import { ConfigProvider } from '../components'
import BrickDesignTheme from './BrickDesignTheme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: BrickDesignTheme,
  },
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
