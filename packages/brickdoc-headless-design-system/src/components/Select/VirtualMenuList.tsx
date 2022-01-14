import React, { FC } from 'react'
import { MenuListProps } from 'react-select'
import VirtualList from 'rc-virtual-list'

export interface VirtualMenuListProps extends MenuListProps {
  virtual?: boolean
}

const DefaultItemHeight = 40

export const VirtualMenuList: FC<VirtualMenuListProps> = ({ virtual = true, ...props }) => {
  const data = React.Children.toArray(props.children)
  const wrapperHeight =
    props.maxHeight < data.length * DefaultItemHeight ? props.maxHeight : data.length * DefaultItemHeight

  return (
    <div ref={props.innerRef} {...props.innerProps}>
      <VirtualList
        data={data}
        itemKey="key"
        virtual={virtual}
        fullHeight={false}
        itemHeight={DefaultItemHeight}
        height={wrapperHeight + 6}
      >
        {item => (
          // use `Fragment` to fix `ref` issue
          <>{item}</>
        )}
      </VirtualList>
    </div>
  )
}
