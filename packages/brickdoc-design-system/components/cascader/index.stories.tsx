import React from "react"
import { Story } from "@storybook/react"
import { Cascader, CascaderProps } from "../../"



export default {
  title: "ReactComponents/Carousel",
  component: Cascader,
  argTypes: {
    allowClear: {
      description: "Whether allow clear",
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'true'}
      }
    },
    bordered: {
      description: "Whether has border style",
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'true'}
      }
    },
    autoFocus: {
      description: "If get focus when component mounted",
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    changeOnSelect: {
      description: "Change value on each selection if set to true, see above demo for details\t",
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    className: {
      description: 'The additional css class',
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
      }
    },
    defaultValue: {
      description: "Initial selected value",
      table: {
        type: { summary: "string[] | number[]" },
        defaultValue: {summary: '[]'}
      }
    },
    disabled: {
      description: "Whether disabled select",
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    displayRender: {
      description: "The render function of displaying selected options",
      table: {
        type: { summary:'(label, selectedOptions) => ReactNode'},
        defaultValue: { summary:'label => label.join(/)'}
      }
    },
    dropdownRender: {
      description: "Customize dropdown content",
      table: {
        type: { summary:'(menus: ReactNode) => ReactNode'},
      }
    },
    expandIcon: {
      description: "Customize the current item expand icon",
      table: {
        type: { summary:'ReactNode'},
      }
    },
    expandTrigger: {
      description: "expand current item when click or hover, one of click hover",
      defaultValue: 'click',
      table: {
        type: { summary:'string'},
      },
      control: {
        type: 'radio',
        options: ['click','hover']
      },
    },
    fieldNames: {
      description: "Custom field name for label and value and children",
      table: {
        type: { summary:'object'},
        defaultValue: { summary:'{ label: label, value: value, children: children }'}
      }
    },
    getPopupContainer: {
      description: "Parent Node which the selector should be rendered to",
      table: {
        type: { summary:'function(triggerNode)'},
        defaultValue: { summary:'() => document.body'}
      }
    },
    loadData: {
      description: "To load option lazily, and it cannot work with showSearch",
      table: {
        type: { summary:'(selectedOptions) => void'}
      }
    },
    notFoundContent: {
      description: 'Specify content to show when no result matches',
      defaultValue: 'Not Found',
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
        defaultValue: { summary:'Not Found'}
      }
    },
    options: {
      description: "The data options of cascade",
      table: {
        type: { summary:'Option[]'}
      }
    },
    placeholder: {
      description: 'The input placeholder',
      defaultValue: 'Please select',
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
        defaultValue: { summary:'Please select'}
      }
    },
    popupClassName: {
      description: 'The additional className of popup overlay',
      control: {
        type: 'text'
      },
      table: {
        type: { summary:'string'},
      }
    },
    popupPlacement: {
      description: 'Use preset popup align config from builtinPlacements：bottomLeft bottomRight topLeft topRight',
      defaultValue: 'bottomRight',
      control: {
        type: 'select',
        options: ['bottomLeft','bottomRight','topLeft','topRight']
      },
      table: {
        type: { summary:'string'},
        defaultValue:{ summary:'bottomRight' }
      }
    },
    popupVisible: {
      description: "Set visible of cascader popup",
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'}
      }
    },
    showSearch: {
      description: "Whether show search input in single mode",
      defaultValue: 'false',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean | Object'},
        defaultValue: { summary:'false'}
      }
    },
    size: {
      description: 'The input size',
      control: {
        type: 'radio',
        options: ['large','middle','small']
      }
    },
    style: {
      description: "The additional style",
      table: {
        type: { summary:'CSSProperties'}
      }
    },
    suffixIcon: {
      description: "The custom suffix icon",
      table: {
        type: { summary:'ReactNode'}
      }
    },
    value: {
      description: "The selected value",
      table: {
        type: { summary:'string[] | number[]'}
      }
    },
    onChange: {
      description: "Callback when finishing cascader select",
      table: {
        type: { summary:'(value, selectedOptions) => void'}
      }
    },
    onPopupVisibleChange: {
      description: "Callback when popup shown or hidden",
      table: {
        type: { summary:'(value) => void'}
      }
    },
}, parameters: {
  docs: {
    description: {
      component: `
Cascade selection box.

#### When To Use

* When you need to select from a set of associated data set. Such as province/city/district,
 company level, things classification.
* When selecting from a large data set, with multi-stage classification separated for easy selection.
* Chooses cascade items in one float layer for better user experience.


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


const Template: Story<CascaderProps> = (args) =>
  <Cascader {...args} />
export const Base = Template.bind({})
Base.args = {
  options: [  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'nbg',
        label: 'Ningbo',
        children: [
          {
            value: 'yz',
            label: 'YinZhou',
          },
        ],
      },
    ],
  },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    }]
}

const options = [{
  value:'os',label:'Operating System',
  children: [{value:'linux', label:'Linux'},{value:'bsd', label:'FreeBSD'}]
}]
function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
export const ShowSearch: Story<CascaderProps> = (_args) => (
  <Cascader
    options={options}
    placeholder="Please select"
    showSearch={{ filter }}
  />
)

ShowSearch.parameters = {
  docs: {
    description: {
      story: `
Search and select options directly.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| filter | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | function(inputValue, path): boolean | - |
| limit | Set the count of filtered items | number \\| false | 50 |
| matchInputWidth | Whether the width of list matches input, ([how it looks](https://github.com/ant-design/ant-design/issues/25779)) | boolean | true |
| render | Used to render filtered options | function(inputValue, path): ReactNode | - |
| sort | Used to sort filtered options | function(a, b, inputValue) | - |
      `
    }
  }
}
