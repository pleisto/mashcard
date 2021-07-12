import React from 'react'
import { Story } from '@storybook/react'
import { BackTop, BackTopProps } from '../'

export default {
  title: 'ReactComponents/BackTop',
  component: BackTop,
  argTypes: {
    duration: {
      description: 'Time to return to top（ms）',
      defaultValue: 450,
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    target: {
      description: 'Specifies the scrollable area dom node',
      defaultValue: () => window,
      table: {
        type: { summary: '() => HTMLElement' },
        defaultValue: { summary: '() => window' }
      }
    },
    visibilityHeight: {
      description: 'The BackTop button will not show until the scroll height reaches this value',
      defaultValue: 400,
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    onClick: {
      description: 'A callback function, which can be executed when you click the button',

      table: {
        type: { summary: 'function' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
BackTop makes it easy to go back to the top of the page.

#### When To Use
* When the page content is very long.
* When you need to go back to the top very frequently in order to view the contents.
      `
      }
    }
  }
}

const Template: Story<BackTopProps> = args => (
  <div>
    <BackTop {...args} />
    <div style={{ height: '800px', textAlign: 'center', paddingTop: '100px' }}>
      <h2>Scroll down to see BackTo Button</h2>
    </div>
  </div>
)

export const Base = Template.bind({})
