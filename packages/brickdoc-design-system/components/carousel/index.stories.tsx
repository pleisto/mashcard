import React from "react"
import { Story } from "@storybook/react"
import { Carousel, CarouselProps } from "../../"

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

export default {
  title: "ReactComponents/Carousel",
  component: Carousel,
  argTypes: {
    autoplay: {
      description: "Whether to scroll automatically\t",
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    dotPosition: {
      description: 'The position of the dots, which can be one of top bottom left right',
      control: {
        type: 'radio',
        options: ['top', 'bottom','left','right']
      },
      table: {
        type: { summary:'string'},
      }
    },
    dots: {
      description: "Whether to show the dots at the bottom of the gallery, object for dotsClass and any others",
      defaultValue: true,
      table: {
        type: { summary: "boolean | { className?: string }" },
        defaultValue: {summary: 'true'}
      }
    },
    easing: {
      description: "Transition interpolation function name",
      defaultValue: 'linear',
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
      }
    },
    effect: {
      description: "Transition effect",
      defaultValue: 'scrollx',
      table: {
        type: { summary:'scrollx | fade'},
      },
      control: {
        type: 'radio',
        options: ['scrollx','fade']
      },
    },
    afterChange: {
      description: "Callback function called after the current index changes",
      table: {
        type: { summary:'function(current)'},
      }
    },
    beforeChange: {
      description: "Callback function called before the current index changes",
      table: {
        type: { summary:'function(from, to)'},
      }
    },
}, parameters: {
  docs: {
    description: {
      component: `
A carousel component. Scales with its container.

#### When To Use

* When there is a group of content on the same level.
* When there is insufficient content space, it can be used to save space in the form of a revolving door.
* Commonly used for a group of pictures/cards.


#### Methods

| Name | Description | Version |
| --- | --- | --- |
| blur() | Remove focus |  |
| focus() | Get focus |  |
`
    }
  }
}
}


const Template: Story<CarouselProps> = (args) =>
  <Carousel {...args}>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
export const Base = Template.bind({})
