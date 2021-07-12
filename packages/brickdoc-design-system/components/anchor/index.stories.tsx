import React from 'react'
import { Story } from '@storybook/react'
import { Anchor, AnchorProps } from '../'

const { Link } = Anchor

export default {
  title: 'ReactComponents/Anchor',
  component: Anchor,
  argTypes: {
    affix: {
      description: 'Fixed mode of Anchor',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    },
    bounds: {
      description: 'Bounding distance of anchor area',
      defaultValue: 5,
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    getContainer: {
      description: 'Scrolling container',
      table: {
        type: { summary: '() => HTMLElement' },
        defaultValue: { summary: '() => window' }
      }
    },
    getCurrentAnchor: {
      description: 'Customize the anchor highlight',
      table: {
        type: { summary: '() => string' }
      }
    },
    offsetTop: {
      description: 'Pixels to offset from top when calculating position of scroll',
      defaultValue: 0,
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    showInkInFixed: {
      description: 'Whether show ink-balls when `affix={false}`',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    targetOffset: {
      description: 'Anchor scroll offset, default as offsetTop',
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    onChange: {
      description: 'Listening for anchor link change',
      table: {
        type: { summary: '(currentActiveLink: string) => void' }
      }
    },
    onClick: {
      description: 'Set the handler to handle `click` event',
      table: {
        type: { summary: 'function(e: Event, link: Object)' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Hyperlinks to scroll on one page.

#### When To Use
For displaying anchor hyperlinks on page and jumping between them.
`
      }
    }
  }
}

const Template: Story<AnchorProps> = args => (
  <Anchor {...args}>
    <Link href="javascript:;console.log(1)" title="Basic demo" />
    <Link href="javascript:;console.log(2)" title="Static demo" />
    <Link href="javascript:;console.log(3)" title="API">
      <Link href="javascript:;console.log(4)" title="Anchor Props" />
      <Link href="javascript:;console.log(5)" title="Link Props" />
    </Link>
  </Anchor>
)

export const Base = Template.bind({})
