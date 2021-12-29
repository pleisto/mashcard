import * as React from 'react'
import RcTabs, { TabPane, TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs'
import { EditableConfig } from 'rc-tabs/lib/interface'
import { Close as CloseOutlined, Plus as PlusOutlined, More as EllipsisOutlined } from '@brickdoc/design-icons'

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

const Tabs = ({ type, className, onEdit, hideAdd, centered, addIcon, size = 'md', ...props }: TabsProps) => {
  const { moreIcon = <EllipsisOutlined /> } = props
  const prefixCls = props.prefixCls || tabsStyle()

  let editable: EditableConfig | undefined
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event : key, editType)
      },
      removeIcon: <CloseOutlined />,
      addIcon: addIcon || <PlusOutlined />,
      showAdd: !hideAdd
    }
  }

  return (
    <>
      <RcTabs
        moreTransitionName={`${prefix}-slide-up`}
        {...props}
        editable={editable}
        moreIcon={moreIcon}
        prefixCls={prefixCls}
      />
    </>
  )
}

Tabs.TabPane = TabPane
export { Tabs }
