import React from 'react'
import { Story } from '@storybook/react'
import { Tree, TreeProps } from '../'
import { Down } from '../icon'
export default {
  title: 'ReactComponents/Tree',
  component: Tree,
  parameters: {
    docs: {
      description: {
        component: `
A hierarchical list structure component.

## When To Use

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The \`Tree\` component is a way of representing the hierarchical relationship between these things. You can also expand, collapse, and select a treeNode within a \`Tree\`.

## API

### Tree props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| allowDrop | Whether to allow dropping on the node | ({ dropNode, dropPosition }) => boolean | - |
| autoExpandParent | Whether to automatically expand a parent treeNode | boolean | false |
| blockNode | Whether treeNode fill remaining horizontal space | boolean | false |
| checkable | Add a Checkbox before the treeNodes | boolean | false |
| checkedKeys | (Controlled) Specifies the keys of the checked treeNodes (PS: When this specifies the key of a treeNode which is also a parent treeNode, all the children treeNodes of will be checked; and vice versa, when it specifies the key of a treeNode which is a child treeNode, its parent treeNode will also be checked. When \`checkable\` and \`checkStrictly\` is true, its object has \`checked\` and \`halfChecked\` property. Regardless of whether the child or parent treeNode is checked, they won't impact each other | string\\[] \\| {checked: string\\[], halfChecked: string\\[]} | \\[] |
| checkStrictly | Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false |
| defaultCheckedKeys | Specifies the keys of the default checked treeNodes | string\\[] | \\[] |
| defaultExpandAll | Whether to expand all treeNodes by default | boolean | false |
| defaultExpandedKeys | Specify the keys of the default expanded treeNodes | string\\[] | \\[] |
| defaultExpandParent | If auto expand parent treeNodes when init | boolean | true |
| defaultSelectedKeys | Specifies the keys of the default selected treeNodes | string\\[] | \\[] |
| disabled | Whether disabled the tree | boolean | false |
| draggable | Specifies whether this Tree or the node is draggable | boolean \\| ((node: DataNode) => boolean) | false |
| expandedKeys | (Controlled) Specifies the keys of the expanded treeNodes | string\\[] | \\[] |
| fieldNames | Customize node title, key, children field name | object | { title: \`title\`, key: \`key\`, children: \`children\` } |
| filterTreeNode | Defines a function to filter (highlight) treeNodes. When the function returns \`true\`, the corresponding treeNode will be highlighted | function(node) | - |
| height | Config virtual scroll height. Will not support horizontal scroll when enable this | number | - |
| icon | Customize treeNode icon | ReactNode \\| (props) => ReactNode | - |
| loadData | Load data asynchronously | function(node) | - |
| loadedKeys | (Controlled) Set loaded tree nodes. Need work with \`loadData\` | string\\[] | \\[] |
| multiple | Allows selecting multiple treeNodes | boolean | false |
| selectable | Whether can be selected | boolean | true |
| selectedKeys | (Controlled) Specifies the keys of the selected treeNodes | string\\[] | - |
| showIcon | Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to true | boolean | false |
| showLine | Shows a connecting line | boolean \\| {showLeafIcon: boolean} | false |
| switcherIcon | Customize collapse/expand icon of tree node | ReactNode | - |
| titleRender | Customize tree node title render | (nodeData) => ReactNode | - |
| treeData | The treeNodes data Array, if set it then you need not to construct children TreeNode. (key should be unique across the whole array) | array&lt;{ key, title, children, \\[disabled, selectable] }> | - |
| virtual | Disable virtual scroll when set to false | boolean | true |
| onCheck | Callback function for when the onCheck event occurs | function(checkedKeys, e:{checked: bool, checkedNodes, node, event, halfCheckedKeys}) | - |
| onDragEnd | Callback function for when the onDragEnd event occurs | function({event, node}) | - |
| onDragEnter | Callback function for when the onDragEnter event occurs | function({event, node, expandedKeys}) | - |
| onDragLeave | Callback function for when the onDragLeave event occurs | function({event, node}) | - |
| onDragOver | Callback function for when the onDragOver event occurs | function({event, node}) | - |
| onDragStart | Callback function for when the onDragStart event occurs | function({event, node}) | - |
| onDrop | Callback function for when the onDrop event occurs | function({event, node, dragNode, dragNodesKeys}) | - |
| onExpand | Callback function for when a treeNode is expanded or collapsed | function(expandedKeys, {expanded: bool, node}) | - |
| onLoad | Callback function for when a treeNode is loaded | function(loadedKeys, {event, node}) | - |
| onRightClick | Callback function for when the user right clicks a treeNode | function({event, node}) | - |
| onSelect | Callback function for when the user clicks a treeNode | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |

### TreeNode props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| checkable | When Tree is checkable, set TreeNode display Checkbox or not | boolean | - |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false |
| disabled | Disables the treeNode | boolean | false |
| icon | Customize icon. When you pass component, whose render will receive full TreeNode props as component props | ReactNode \\| (props) => ReactNode | - |
| isLeaf | Determines if this is a leaf node(effective when \`loadData\` is specified). \`false\` will force trade TreeNode as a parent node | boolean | - |
| key | Used with (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. P.S.: It must be unique in all of treeNodes of the tree | string | (internal calculated position of treeNode) |
| selectable | Set whether the treeNode can be selected | boolean | true |
| title | Title | ReactNode | \`---\` |

### DirectoryTree props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| expandAction | Directory open logic, optional: false \\| \`click\` \\| \`doubleClick\` | string \\| boolean | \`click\` |

## Note

Before \`3.4.0\`: The number of treeNodes can be very large, but when \`checkable=true\`, it will increase the compute time. So, we cache some calculations (e.g. \`this.treeNodesStates\`) to avoid double computing. But, this brings some restrictions. **When you load treeNodes asynchronously, you should render tree like this**:

\`\`\`jsx
{
  this.state.treeData.length ? (
    <Tree>
      {this.state.treeData.map(data => (
        <TreeNode />
      ))}
    </Tree>
  ) : (
    'loading tree'
  );
}
\`\`\`

### Tree Methods

| Name | Description |
| --- | --- |
| scrollTo({ key: string \\| number; align?: 'top' \\| 'bottom' \\| 'auto'; offset?: number }) | Scroll to key item in virtual scroll |


`
      }
    }
  }
}

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true
          },
          {
            title: 'leaf',
            key: '0-0-0-1'
          }
        ]
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }]
      }
    ]
  }
]

const Template: Story<TreeProps> = _args => (
  <>
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      treeData={treeData}
    />
    <br />
    <br />
    <Tree
      showLine
      switcherIcon={<Down />}
      defaultExpandedKeys={['0-0-0']}
      treeData={[
        {
          title: 'parent 1',
          key: '0-0',
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0',
              children: [
                {
                  title: 'leaf',
                  key: '0-0-0-0'
                },
                {
                  title: 'leaf',
                  key: '0-0-0-1'
                },
                {
                  title: 'leaf',
                  key: '0-0-0-2'
                }
              ]
            },
            {
              title: 'parent 1-1',
              key: '0-0-1',
              children: [
                {
                  title: 'leaf',
                  key: '0-0-1-0'
                }
              ]
            },
            {
              title: 'parent 1-2',
              key: '0-0-2',
              children: [
                {
                  title: 'leaf',
                  key: '0-0-2-0'
                },
                {
                  title: 'leaf',
                  key: '0-0-2-1'
                }
              ]
            }
          ]
        }
      ]}
    />
  </>
)
export const Base = Template.bind({})
