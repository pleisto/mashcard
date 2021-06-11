import React from "react"
import { Story } from "@storybook/react"
import { Card, CardProps, Avatar } from "../../"
import { SettingConfig, Add, Edit }  from '../icon'
const { Meta } = Card

export default {
  title: "ReactComponents/Card",
  component: Card,
  argTypes: {
    actions: {
      description: "The action list, shows at the bottom of the Card",
      table: {
        type: { summary: "Array<ReactNode>" },
      }
    },
    activeTabKey: {
      description: "Current TabPane's key",
      table: {
        type: { summary: "string" }
      }
    },
    bodyStyle: {
      description: "Inline style to apply to the card content",
      table: {
        type: { summary: "CSSProperties" }
      }
    },
    bordered: {
      description: "Toggles rendering of the border around the card",
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'true'}
      }
    },
    cover: {
      description: 'Card cover',
      table: {
        type: { summary:'ReactNode'},
      }
    },
    defaultActiveTabKey: {
      description: "Initial active TabPane's key, if activeTabKey is not set",
      table: {
        type: { summary: "string" }
      }
    },
    extra: {
      description: "Content to render in the top-right corner of the card",
      table: {
        type: { summary:'ReactNode'},
      }
    },
    headStyle: {
      description: "Inline style to apply to the card head",
      table: {
        type: { summary:'CSSProperties'},
      }
    },
    hoverable: {
      description: "Lift up when hovering card",
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    loading: {
      description: "Shows a loading indicator while the contents of the card are being fetched",
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    size: {
    description: "Size of card",
    defaultValue: 'default',
    control: {
      type: 'radio',
      options: ['default', 'small']
    }
  },
    tabBarExtraContent: {
      description: "Extra content in tab bar",
      table: {
        type: { summary:'ReactNode'},
      }
    },
    tabList: {
      description: "List of TabPane's head",
      table: {
        type: { summary:'Array<{key: string, tab: ReactNode}>'},
      }
    },
    tabProps	: {
      description: "Tabs",
      table: {
        type: { summary:'Tabs.Props'},
      }
    },
    title: {
      description: "Card title",
      table: {
        type: { summary:'ReactNode'},
      }
    },
    type: {
      description: "Card style type, can be set to inner or not set",
      table: {
        type: { summary:'string'},
      }
    },
    onTabChange: {
      description: "Callback when tab is switched",
      table: {
        type: { summary:'(key) => void'},
      }
    },
}, parameters: {
  docs: {
    description: {
      component: `
Simple rectangular container.

#### When To Use

A card can be used to display content related to a single subject.
The content can consist of multiple elements of varying types and sizes.
`
    }
  }
}
}


const Template: Story<CardProps> = (args) =>
  <Card {...args}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
export const Base = Template.bind({})


export const InnerCard: Story<CardProps> = (_args) => (
  <Card title="Card title">
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>
  </Card>
)

InnerCard.parameters = {
  docs: {
    description: {
      story: `It can be placed inside the ordinary card to display the information of the multilevel structure.`
    }
  }
}

export const CardMeta: Story<CardProps> = (_args) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://placeimg.com/600/450/nature/grayscale"
      />
    }
    actions={[
      <Add key="add" />,
      <SettingConfig key="setting" />,
      <Edit key="edit" />,
    ]}
  >
    <Meta
      avatar={<Avatar>BD</Avatar>}
      title="Card title"
      description="This is the description"
    />
  </Card>
)

CardMeta.parameters = {
  docs: {
    description: {
      story: `
A Card that supports cover, avatar, title and description.


| Property | Description | Type | Default |
| --- | --- | --- | --- |
| avatar | Avatar or icon | ReactNode | - |
| className | The className of container | string | - |
| description | Description content | ReactNode | - |
| style | The style object of container | CSSProperties | - |
| title | Title content | ReactNode | - |
`
    }
  }
}

const gridStyle = {
  width: '25%',
  textAlign: 'center',
}

export const GridCard: Story<CardProps> = (_args) => (
  <Card title="Card Title">
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      Content
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
)

GridCard.parameters = {
  docs: {
    description: {
      story: `
Grid style card content.


| Property | Description | Type | Default |
| --- | --- | --- | --- | --- |
| className | The className of container | string | - |
| hoverable | Lift up when hovering card grid | boolean | true |
| style | The style object of container | CSSProperties | - |
`
    }
  }
}
