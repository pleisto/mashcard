import React from "react"
import { Story } from "@storybook/react"
import { Divider, DividerProps } from "../../"


export default {
  title: "ReactComponents/Divider",
  component: Divider,
  argTypes: {
    className: {
      description: 'The className of container',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    dashed: {
      description: 'Whether line is dashed',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    orientation: {
      description: 'The position of title inside divider',
      defaultValue: 'center',
      control: {
        type: 'radio',
        options: ['left','right','center']
      },
      table: {
        type: { summary: 'left | right | center' }
      }
    },
    plain: {
      description: 'Divider text show as plain style',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    },
    style: {
      description: 'The style object of container',
      table: {
        type: { summary: 'CSSProperties' }
      }
    },
    type: {
      description: 'The direction type of divider',
      defaultValue: 'horizontal',
      control: {
        type: 'radio',
        options: ['vertical','horizontal']
      },
      table: {
        type: { summary: 'horizontal | vertical' }
      }
    },
  },
  parameters: {
  docs: {
    description: {
      component: `
A divider line separates different content.

#### When To Use

* Divide sections of article.
* Divide inline text and links such as the operation column of table.
`
    }
  }
}
}


const Template: Story<DividerProps> = (args) =>
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider {...args}  />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
export const Base = Template.bind({})




