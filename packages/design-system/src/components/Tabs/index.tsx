import * as React from 'react'
import RcTabs, { TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs'
import { EditableConfig } from 'rc-tabs/lib/interface'
import { Close as CloseOutlined, Plus as PlusOutlined, More as EllipsisOutlined } from '@mashcard/design-icons'

import { prefix } from '../../themes'
import { tabsStyle } from './styles/index.style'

export type TabsType = 'line' | 'card' | 'editable-card'
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left'

export type { TabPaneProps }

export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
  type?: TabsType
  hideAdd?: boolean
  centered?: boolean
  addIcon?: React.ReactNode
  size?: 'md' | 'lg'
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void
}

const Tabs: React.ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (props, ref) => {
  const { moreIcon = <EllipsisOutlined />, type, onEdit, hideAdd, addIcon } = props
  const prefixCls = props.prefixCls ?? tabsStyle()
  const tabsRef = ref ?? React.createRef<HTMLDivElement>()

  let editable: EditableConfig | undefined
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event! : key!, editType)
      },
      removeIcon: <CloseOutlined />,
      addIcon: addIcon ?? <PlusOutlined />,
      showAdd: !hideAdd
    }
  }

  return (
    <RcTabs
      ref={tabsRef}
      {...props}
      moreTransitionName={`${prefix}-slide-up`}
      editable={editable}
      moreIcon={moreIcon}
      prefixCls={prefixCls}
    />
  )
}

const _Tabs = React.forwardRef(Tabs)

_Tabs.displayName = 'Tabs'

export { TabPane } from 'rc-tabs'
export { _Tabs as Tabs }
