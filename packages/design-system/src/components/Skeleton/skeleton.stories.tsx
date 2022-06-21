import { Skeleton } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: {
    type: 'article'
  },
  argTypes: {
    type: {
      description: 'type',
      control: {
        type: 'radio',
        options: ['list', 'article', 'bullet-list']
      }
    }
  },

  parameters: {
    docs: {
      description: {
        component: `

## When To Use

SVG-Powered component to easily create placeholder loadings (like Facebook's cards loading).


## More Information
See [\`react-content-loader\`](https://www.npmjs.com/package/react-content-loader)
`
      }
    },
    design: {
      type: 'figma'
      // url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=1373%3A4886'
    }
  }
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = props => <Skeleton {...props} />

export const Basic = Template.bind({})
