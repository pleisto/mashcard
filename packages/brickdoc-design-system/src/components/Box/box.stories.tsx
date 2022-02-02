import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '.'

export default {
  title: 'Components/Box',
  component: Box,
  args: {
    as: 'div'
  },
  argTypes: {
    css: {
      description: 'stiches CSS properties and values'
    },
    as: {
      description: 'the element to render'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Box is the most abstract component on top of which all other UI components are built.
By default, it renders a \`div\` element.

`
      }
    }
  }
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = args => (
  <Box as="h1" css={{ fontSize: '$fontSizes$body' }}>
    {' '}
    Hello, World{' '}
  </Box>
)
export const Basic = Template.bind({})
