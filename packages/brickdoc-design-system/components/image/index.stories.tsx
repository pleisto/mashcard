import React from "react"
import { Story } from "@storybook/react"
import { Image, ImageProps } from "../../"



export default {
  title: "ReactComponents/Image",
  component: Image,
  argTypes: {
    alt: {
      description: "Image description",
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
      }
    },
    fallback: {
      description: "Load failure fault-tolerant src\t",
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'}
      }
    },
    height: {
      description: "Image height",
      control: {
        type: 'number'
      },
      table: {
        type: { summary:'string | number'},
      }
    },
    placeholder: {
      description: "Load placeholder, use default placeholder when set true",
      table: {
        type: { summary:'ReactNode'},
      }
    },
    preview: {
      description: "preview config, disabled when false",
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean | previewType'},
        defaultValue: { summary:'true'}
      }
    },
    src: {
      description: "Image path",
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
      }
    },
    width: {
      description: "Image width",
      control: {
        type: 'number'
      },
      table: {
        type: { summary:'string | number'},
      }
    },
    onError: {
      description: "Load failed callback",
      table: {
        type: { summary:'(event: Event) => void'}
      }
    },
}, parameters: {
  docs: {
    description: {
      component: `
Previewable image.

#### When To Use

* When you need to display pictures.
* Display when loading a large image or fault tolerant handling when loading fail.



#### previewType
\`\`\`typescript
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible) => void;
  getContainer?: string | HTMLElement | (() => HTMLElement);
  src?: string;
  mask?: ReactNode;
  maskClassName?: string;
  current?: number;
}
\`\`\`

`
    }
  }
}
}



const Template: Story<ImageProps> = (args) =>
  <Image
    {...args}
  />
export const Base = Template.bind({})

Base.args = {
  width: 300,
  src: 'https://placeimg.com/300/200/nature/grayscale'
}

