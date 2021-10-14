import { Tree } from '../../../components'
import { Down } from '../../icon'

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

const Base = () => (
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
export default Base
