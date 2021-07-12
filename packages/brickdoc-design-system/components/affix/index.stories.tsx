import React from 'react'
import { Story } from '@storybook/react'
import { Affix, AffixProps } from '../'

export default {
  title: 'ReactComponents/Affix',
  component: Affix,
  argTypes: {
    offsetBottom: {
      description: 'Offset from the bottom of the viewport (in pixels)',
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    offsetTop: {
      description: 'Offset from the top of the viewport (in pixels)',
      defaultValue: 0,
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },

    target: {
      description: 'Specifies the scrollable area DOM node',
      defaultValue: () => window,
      table: {
        type: { summary: '() => HTMLElement' },
        defaultValue: { summary: '`() => window`' }
      }
    },
    onChange: {
      description: 'Callback for when Affix state is changed',
      table: {
        type: { summary: 'function(affixed)' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Wrap Affix around another component to make it stick the viewport.

#### When To Use
On longer web pages, it's helpful to stick component into the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.
`
      }
    }
  }
}

const Template: Story<AffixProps> = args => (
  <Affix {...args}>
    <span>Affix</span>
  </Affix>
)

export const Base = Template.bind({})
