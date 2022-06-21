import { Loading } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Loading',
  component: Loading,
  argTypes: {
    delayDuration: {
      control: 'text'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
App Loader
`
      }
    }
  }
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = args => (
  <Loading
    {...args}
    style={{
      width: '100%',
      height: '100%'
    }}
  />
)
export const Basic = Template.bind({})
