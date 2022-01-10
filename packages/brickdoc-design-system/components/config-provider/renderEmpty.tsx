import * as React from 'react'
import { Empty } from '../'
import { ConfigConsumer, ConfigConsumerProps } from '.'

const renderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty')

      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty />

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return <Empty className={`${prefix}-small`} />
        default:
          return <Empty />
      }
    }}
  </ConfigConsumer>
)

export type RenderEmptyHandler = typeof renderEmpty

export default renderEmpty
