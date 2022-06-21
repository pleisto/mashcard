import { Avatar } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    shape: 'circle',
    size: 'md'
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio'
      }
    },
    shape: {
      options: ['circle', 'square'],
      control: {
        type: 'radio'
      }
    },
    alt: {
      control: 'text'
    },
    initials: {
      control: 'text'
    },
    src: {
      control: 'text'
    },
    className: {
      description: '`string`'
    },
    style: {
      description: '`React.CSSProperties`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Avatars can be used to represent people or objects. It supports images, Icons, or letters.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=24%3A1447'
    }
  }
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />
export const Basic = Template.bind({})
Basic.args = {
  initials: 'John Smith'
}

export const ImageAvatar = Template.bind({})
ImageAvatar.args = {
  src: 'https://i.pravatar.cc/150?img=42',
  alt: 'John Smith Avatar'
}

export const AnonymousAvatar = Template.bind({})
AnonymousAvatar.args = {
  initials: undefined,
  src: undefined
}

export const SquareAvatar = Template.bind({})
SquareAvatar.args = {
  shape: 'square',
  size: 'lg',
  initials: 'John Smith'
}
