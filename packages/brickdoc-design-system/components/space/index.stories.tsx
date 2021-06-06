import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Space, SpaceProps, Button } from '../../'

export default {
  title: 'ReactComponents/Space',
  component: Space,
  argTypes:{
    size: {
      description: 'Set the size',
      defaultValue: 'middle',
      control: {
        type: 'radio',
        options: ['large', 'middle', 'small']
      }
    },
    align: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'baseline']
      }
    },
    direction:{
      control: {
        type: 'radio',
        options: ['horizontal', 'vertical']
      }
    },
    wrap:{
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
    Set components spacing.

## When To Use

Avoid components clinging together and set a unified space.
`}}}
      } as Meta



const Template: Story<SpaceProps> = (args) => <>
  <p>Set components spacing.</p>
  <Space {...args}>
    <Button type="primary">Button</Button>
    <Button type="primary">Button</Button>
    <Button type="primary">Button</Button>

  </Space>
</>


export const Example = Template.bind({})

Example.args ={
  align: 'start',
  size: 'small',
  direction: 'vertical',
  wrap: false
}
