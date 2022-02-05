import * as React from 'react'
import { cx as classNames } from '../../utilities'
import Spin, { SpinProps } from '../spin'
import { RenderEmptyHandler, ConfigContext } from '../config-provider'
import Item from './Item'
import './style'

export type { ListItemProps, ListItemMetaProps } from './Item'

export type ColumnCount = number

export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface ListGridType {
  gutter?: number
  column?: ColumnCount
  xs?: ColumnCount
  sm?: ColumnCount
  md?: ColumnCount
  lg?: ColumnCount
  xl?: ColumnCount
  xxl?: ColumnCount
}

export type ListSize = 'small' | 'default' | 'large'

export type ListItemLayout = 'horizontal' | 'vertical'

export interface ListProps<T> {
  bordered?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  dataSource?: T[]
  extra?: React.ReactNode
  grid?: ListGridType
  id?: string
  itemLayout?: ListItemLayout
  loading?: boolean | SpinProps
  loadMore?: React.ReactNode
  prefixCls?: string
  rowKey?: ((item: T) => React.Key) | keyof T
  renderItem?: (item: T, index: number) => React.ReactNode
  size?: ListSize
  split?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
  locale?: ListLocale
}

export interface ListLocale {
  emptyText: React.ReactNode | (() => React.ReactNode)
}

export interface ListConsumerProps {
  grid?: any
  itemLayout?: string
}

export const ListContext = React.createContext<ListConsumerProps>({})

export const ListConsumer = ListContext.Consumer

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
function List<T>({
  prefixCls: customizePrefixCls,
  bordered = false,
  split = true,
  className,
  children,
  itemLayout,
  loadMore,
  grid,
  dataSource = [],
  size,
  header,
  footer,
  loading = false,
  rowKey,
  renderItem,
  locale,
  ...rest
}: ListProps<T>) {
  const { getPrefixCls, renderEmpty, direction } = React.useContext(ConfigContext)

  const listItemsKeys: { [index: number]: React.Key } = {}

  const renderInnerItem = (item: T, index: number) => {
    if (!renderItem) return null

    let key

    if (typeof rowKey === 'function') {
      key = rowKey(item)
    } else if (rowKey) {
      key = item[rowKey]
    } else {
      key = (item as any).key
    }

    if (!key) {
      key = `list-item-${index}`
    }

    listItemsKeys[index] = key

    return renderItem(item, index)
  }

  const isSomethingAfterLastItem = () => !!(loadMore || footer)

  const renderEmptyFunc = (prefixCls: string, renderEmptyHandler: RenderEmptyHandler) => (
    <div className={`${prefixCls}-empty-text`}>{locale?.emptyText || renderEmptyHandler('List')}</div>
  )

  const prefixCls = getPrefixCls('list', customizePrefixCls)
  let loadingProp = loading
  if (typeof loadingProp === 'boolean') {
    loadingProp = {
      spinning: loadingProp
    }
  }
  const isLoading = loadingProp?.spinning

  // large => lg
  // small => sm
  let sizeCls = ''
  switch (size) {
    case 'large':
      sizeCls = 'lg'
      break
    case 'small':
      sizeCls = 'sm'
      break
    default:
      break
  }

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-something-after-last-item`]: isSomethingAfterLastItem(),
      [`${prefixCls}-rtl`]: direction === 'rtl'
    },
    className
  )

  const splitDataSource = [...dataSource]

  let childrenContent = isLoading && <div style={{ minHeight: 53 }} />
  if (splitDataSource.length > 0) {
    const items = splitDataSource.map((item: T, index: number) => renderInnerItem(item, index))

    childrenContent = <ul className={`${prefixCls}-items`}>{items}</ul>
  } else if (!children && !isLoading) {
    childrenContent = renderEmptyFunc(prefixCls, renderEmpty)
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ListContext.Provider value={{ grid, itemLayout }}>
      <div className={classString} {...rest}>
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        <Spin {...loadingProp}>
          {childrenContent}
          {children}
        </Spin>
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        {loadMore}
      </div>
    </ListContext.Provider>
  )
}

List.Item = Item

export default List
