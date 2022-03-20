import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReactNode } from 'react'
import { styled } from '../../themes'
import { TreeNode, Tree } from '.'

const demoData: TreeNode[] = [
  {
    id: 'sun',
    value: 'sun',
    text: 'Sun',
    icon: '🔆',
    isExpanded: true,
    children: [
      {
        id: 'mercury',
        value: 'mercury',
        text: 'Mercury'
      },
      {
        id: 'venus',
        value: 'venus',
        text: 'Venus'
      },
      {
        id: 'earth',
        value: 'earth',
        text: 'Earth',
        children: [
          {
            id: 'moon',
            value: 'moon',
            text: 'The Moon'
          }
        ]
      },
      {
        id: 'mars',
        value: 'mars',
        text: 'Mars',
        children: [
          {
            id: 'deimos',
            value: 'deimos',
            text: 'Deimos'
          },
          {
            id: 'phobos',
            value: 'phobos',
            text: 'Phobos'
          }
        ]
      }
    ]
  }
]

export default {
  title: 'Components/Tree',
  component: Tree,
  args: {
    height: 300,
    draggable: false,
    treeData: demoData
  },
  argTypes: {
    height: {
      control: 'number',
      description: `Optionally specify the height of the tree.
If not specified, it'll fit automatically with a maximum value.`
    },
    expandAll: { control: 'boolean', description: 'Whether to expand all nodes on load.' },
    expandOnSelect: { control: 'boolean', description: `Whether to expand a node when it's selected by user.` },
    initialSelectedId: {
      control: 'text',
      description: `If specified, the node with the given value will be selected on load.`
    },
    draggable: {
      control: 'boolean',
      description: `Whether allow the user drag and drop tree node.
If \`true\`, \`onDrop\` will be callded when a node is dropped.`
    },
    onDrop: { description: `A callback that will be called when the user drops a node.` },
    className: { description: 'the CSS class applied to the tree.' },
    treeNodeClassName: { description: 'the CSS class applied to the tree node.' },
    renderNode: {
      description: `A renderer callback to specify how the data should be rendered into a tree node component.
If not specified, it'll render plain text.`,
      control: null
    },
    emptyNode: {
      description: `How an empty tree node should be rendered.`
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## Todo: Component description
`
      },
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=1381%3A4856'
      }
    }
  }
} as ComponentMeta<typeof Tree>

const Template: ComponentStory<typeof Tree> = args => <Tree {...args} />

export const Basic = Template.bind({})

export const ExpandInitialSelection = Template.bind({})
ExpandInitialSelection.args = {
  initialSelectedId: 'moon'
}

export const ExpandOnSelect = Template.bind({})
ExpandOnSelect.args = {
  expandOnSelect: true
}

export const ExpandAllOnLoad = Template.bind({})
ExpandAllOnLoad.args = {
  expandAll: true
}

const renderNode = (node: TreeNode): ReactNode => {
  return <StyledNode>{node.text}</StyledNode>
}
const StyledNode = styled('div', {
  fontSize: '.75rem',
  padding: '0 1em',
  backgroundColor: 'orange',
  border: '1px solid black',
  borderRadius: '1em',
  height: '100%',
  width: 'fit-content'
})
export const RenderCustomNode = Template.bind({})
RenderCustomNode.args = {
  renderNode
}
