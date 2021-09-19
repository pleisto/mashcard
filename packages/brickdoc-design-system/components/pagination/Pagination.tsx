import * as React from 'react'
import RcPagination, { PaginationProps as RcPaginationProps } from 'rc-pagination'
import classNames from 'classnames'
import { Left as LeftOutlined, Right as RightOutlined, DoubleLeft as DoubleLeftOutlined, DoubleRight as DoubleRightOutlined } from '../icon'
import MiniSelect from './MiniSelect'
import Select from '../select'
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import { ConfigContext } from '../config-provider'
import useBreakpoint from '../grid/hooks/useBreakpoint'

export interface PaginationProps extends Omit<RcPaginationProps, 'itemRender'> {
  showQuickJumper?: boolean | { goButton?: React.ReactNode }
  size?: 'default' | 'small'
  responsive?: boolean
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>
  ) => React.ReactNode
  role?: string
  totalBoundaryShowSizeChanger?: number
}

export type PaginationPosition = 'top' | 'bottom' | 'both'

export interface PaginationConfig extends PaginationProps {
  position?: PaginationPosition
}

export type PaginationLocale = any

const Pagination: React.FC<PaginationProps> = ({
  prefixCls: customizePrefixCls,
  selectPrefixCls: customizeSelectPrefixCls,
  className,
  size,
  locale: customLocale,
  selectComponentClass,
  ...restProps
}) => {
  const { xs } = useBreakpoint()

  const { getPrefixCls, direction } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('pagination', customizePrefixCls)

  const getIconsProps = () => {
    const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>
    let prevIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        <LeftOutlined />
      </button>
    )
    let nextIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        <RightOutlined />
      </button>
    )
    let jumpPrevIcon = (
      <a className={`${prefixCls}-item-link`}>
        {/* You can use transition effects in the container :) */}
        <div className={`${prefixCls}-item-container`}>
          <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
          {ellipsis}
        </div>
      </a>
    )
    let jumpNextIcon = (
      <a className={`${prefixCls}-item-link`}>
        {/* You can use transition effects in the container :) */}
        <div className={`${prefixCls}-item-container`}>
          <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
          {ellipsis}
        </div>
      </a>
    )
    // change arrows direction in right-to-left direction
    if (direction === 'rtl') {
      ;[prevIcon, nextIcon] = [nextIcon, prevIcon]
      ;[jumpPrevIcon, jumpNextIcon] = [jumpNextIcon, jumpPrevIcon]
    }
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon
    }
  }

  const renderPagination = (contextLocale: PaginationLocale) => {
    const locale = { ...contextLocale, ...customLocale }
    const isSmall = size === 'small' || !!(xs && !size && restProps.responsive)
    const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls)
    const extendedClassName = classNames(
      {
        mini: isSmall,
        [`${prefixCls}-rtl`]: direction === 'rtl'
      },
      className
    )

    return (
      <RcPagination
        {...getIconsProps()}
        {...restProps}
        itemRender={restProps.itemRender as RcPaginationProps['itemRender']}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        {...getIconsProps()}
        className={extendedClassName}
        selectComponentClass={selectComponentClass || (isSmall ? MiniSelect : Select)}
        locale={locale}
      />
    )
  }

  return <LocaleReceiver componentName="Pagination">{renderPagination}</LocaleReceiver>
}

export default Pagination
