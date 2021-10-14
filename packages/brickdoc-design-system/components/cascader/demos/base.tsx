import { Space, Cascader } from '../../../components'

const args = {
  options: [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'nbg',
          label: 'Ningbo',
          children: [
            {
              value: 'yz',
              label: 'YinZhou'
            }
          ]
        }
      ]
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
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ]
}
const defaultValue = ['zhejiang']
const Base = () => (
  <Space>
    <Cascader {...args} defaultValue={defaultValue} />
  </Space>
)
export default Base
