import React from 'react'
import { Story } from '@storybook/react'
import { Avatar, AvatarProps, Space } from '../'
import { User, Apple } from '../icon'

export default {
  title: 'ReactComponents/Avatar',
  component: Avatar,
  argTypes: {
    alt: {
      description: 'This attribute defines the alternative text describing the image',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    gap: {
      description: 'Letter type unit distance between left and right sides',
      defaultValue: 4,
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    icon: {
      description: 'Custom icon type for an icon avatar',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    shape: {
      description: 'Can be set button shape',
      defaultValue: 'circle',
      control: {
        type: 'radio',
        options: ['circle', 'round']
      },
      table: {
        type: { summary: 'circle | round' }
      }
    },
    size: {
      description: 'The size of the avatar',
      defaultValue: 'default',
      table: {
        type: { summary: 'number | large | small | default | { xs: number, sm: number, ...}' }
      }
    },
    src: {
      description: 'The address of the image for an image avatar or image element',
      table: {
        type: { summary: 'string | ReactNode' }
      }
    },
    srcSet: {
      description: 'A list of sources to use for different screen resolutions',
      table: {
        type: { summary: 'string' }
      }
    },
    draggable: {
      description: 'Whether the picture is allowed to be dragged',
      table: {
        type: { summary: "boolean | 'true' | 'false'" }
      }
    },

    onError: {
      description: 'Handler when img load error, return false to prevent default fallback behavior',

      table: {
        type: { summary: '() => boolean' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Avatars can be used to represent people or objects. It supports images, Icons, or letters.'
      }
    }
  }
}

const Template: Story<AvatarProps> = args => <Avatar {...args} />

export const Base = Template.bind({})

Base.args = {
  src: 'https://avatars.githubusercontent.com/u/41993484?s=120&v=4'
}

export const Type: Story<AvatarProps> = _args => (
  <>
    <Space>
      <Avatar size={64} icon={<User />} />
      <Avatar size="large" icon={<User />} />
      <Avatar icon={<User />} />
      <Avatar size="small" icon={<User />} />
    </Space>
    <br />
    <br />
    <Space>
      <Avatar shape="square" size="large" icon={<User />} />
      <Avatar shape="square" icon={<User />} />
      <Avatar shape="square" size="small" icon={<User />} />
    </Space>
  </>
)

Type.parameters = {
  docs: {
    description: {
      story: `Three sizes and two shapes are available.`
    }
  }
}

export const AvatarGroup: Story = _args => (
  <Avatar.Group>
    <Avatar src="https://avatars.githubusercontent.com/u/41993484?s=120&v=4" />
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<User />} />
    <Avatar style={{ backgroundColor: '#f56a00' }}>B</Avatar>
    <Avatar style={{ backgroundColor: '#1890ff' }} icon={<Apple />} />
  </Avatar.Group>
)

AvatarGroup.parameters = {
  docs: {
    description: {
      story: `
Avatar group display.

| Prop | Description | Type | defaultValue |
| --- | --- | --- | --- | --- |
| maxCount | Max avatars to show | number | - |
| maxPopoverPlacement | The placement of excess avatar Popover | \`top\` \\| \`bottom\` | \`top\` |
| maxStyle | The style of excess avatar style | CSSProperties | - |
| size | The size of the avatar | number \\| \`large\` \\| \`small\` \\| \`default\` \\| { xs: number, sm: number, ...} | \`default\` |

`
    }
  }
}
