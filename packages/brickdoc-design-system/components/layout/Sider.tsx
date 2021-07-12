import * as React from 'react'
import { useContext, useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import { HamburgerButton as BarsOutlined, Right as RightOutlined, Left as LeftOutlined } from '../icon'

import { LayoutContext } from './layout'
import { ConfigContext } from '../config-provider'
import isNumeric from '../_util/isNumeric'

const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px'
}

export interface SiderContextProps {
  siderCollapsed?: boolean
}

export const SiderContext: React.Context<SiderContextProps> = React.createContext({})

export type CollapseType = 'clickTrigger' | 'responsive'

export type SiderTheme = 'light' | 'dark'

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string
  collapsible?: boolean
  collapsed?: boolean
  defaultCollapsed?: boolean
  reverseArrow?: boolean
  onCollapse?: (collapsed: boolean, type: CollapseType) => void
  zeroWidthTriggerStyle?: React.CSSProperties
  trigger?: React.ReactNode
  width?: number | string
  collapsedWidth?: number | string
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  theme?: SiderTheme
  onBreakpoint?: (broken: boolean) => void
}

export interface SiderState {
  collapsed?: boolean
  below: boolean
}

const generateId = (() => {
  let i = 0
  return (prefix: string = '') => {
    i += 1
    return `${prefix}${i}`
  }
})()

const Sider = React.forwardRef<HTMLDivElement, SiderProps>(
  (
    {
      prefixCls: customizePrefixCls,
      className,
      trigger,
      children,
      defaultCollapsed = false,
      theme = 'light',
      style = {},
      collapsible = false,
      reverseArrow = false,
      width = 270,
      collapsedWidth = 80,
      zeroWidthTriggerStyle,
      breakpoint,
      onCollapse,
      onBreakpoint,
      ...props
    },
    ref
  ) => {
    const { siderHook } = useContext(LayoutContext)

    const [collapsed, setCollapsed] = useState('collapsed' in props ? props.collapsed : defaultCollapsed)
    const [below, setBelow] = useState(false)

    useEffect(() => {
      if ('collapsed' in props) {
        setCollapsed(props.collapsed)
      }
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [props.collapsed])

    const handleSetCollapsed = (value: boolean, type: CollapseType) => {
      if (!('collapsed' in props)) {
        setCollapsed(value)
      }
      onCollapse?.(value, type)
    }

    // ========================= Responsive =========================
    const responsiveHandlerRef = useRef<(mql: MediaQueryListEvent | MediaQueryList) => void>()
    responsiveHandlerRef.current = (mql: MediaQueryListEvent | MediaQueryList) => {
      setBelow(mql.matches)
      onBreakpoint?.(mql.matches)

      if (collapsed !== mql.matches) {
        handleSetCollapsed(mql.matches, 'responsive')
      }
    }

    useEffect(() => {
      function responsiveHandler(mql: MediaQueryListEvent | MediaQueryList) {
        return responsiveHandlerRef.current(mql)
      }

      let mql: MediaQueryList
      if (typeof window !== 'undefined') {
        const { matchMedia } = window
        if (matchMedia && breakpoint && breakpoint in dimensionMaxMap) {
          mql = matchMedia(`(max-width: ${dimensionMaxMap[breakpoint]})`)
          try {
            mql.addEventListener('change', responsiveHandler)
          } catch (error) {
            mql.addListener(responsiveHandler)
          }
          responsiveHandler(mql)
        }
      }
      return () => {
        try {
          mql?.removeEventListener('change', responsiveHandler)
        } catch (error) {
          mql?.removeListener(responsiveHandler)
        }
      }
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    useEffect(() => {
      const uniqueId = generateId('ant-sider-')
      siderHook.addSider(uniqueId)
      return () => siderHook.removeSider(uniqueId)
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const toggle = () => {
      handleSetCollapsed(!collapsed, 'clickTrigger')
    }

    const { getPrefixCls } = useContext(ConfigContext)

    const renderSider = () => {
      const prefixCls = getPrefixCls('layout-sider', customizePrefixCls)
      const divProps = omit(props, ['collapsed'])
      const rawWidth = collapsed ? collapsedWidth : width
      // use "px" as fallback unit for width
      const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth)
      // special trigger when collapsedWidth == 0
      const zeroWidthTrigger =
        parseFloat(String(collapsedWidth || 0)) === 0 ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <span
            onClick={toggle}
            className={classNames(`${prefixCls}-zero-width-trigger`, `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`)}
            style={zeroWidthTriggerStyle}>
            {trigger || <BarsOutlined />}
          </span>
        ) : null
      const iconObj = {
        expanded: reverseArrow ? <RightOutlined /> : <LeftOutlined />,
        collapsed: reverseArrow ? <LeftOutlined /> : <RightOutlined />
      }
      const status = collapsed ? 'collapsed' : 'expanded'
      const defaultTrigger = iconObj[status]
      const triggerDom =
        trigger !== null
          ? zeroWidthTrigger || (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div className={`${prefixCls}-trigger`} onClick={toggle} style={{ width: siderWidth }}>
                {trigger || defaultTrigger}
              </div>
            )
          : null
      const divStyle = {
        ...style,
        flex: `0 0 ${siderWidth}`,
        maxWidth: siderWidth, // Fix width transition bug in IE11
        minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
        width: siderWidth
      }
      const siderCls = classNames(
        prefixCls,
        `${prefixCls}-${theme}`,
        {
          [`${prefixCls}-collapsed`]: !!collapsed,
          [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
          [`${prefixCls}-below`]: !!below,
          [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0
        },
        className
      )
      return (
        <aside className={siderCls} {...divProps} style={divStyle} ref={ref}>
          <div className={`${prefixCls}-children`}>{children}</div>
          {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
        </aside>
      )
    }

    return (
      <SiderContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          siderCollapsed: collapsed
        }}>
        {renderSider()}
      </SiderContext.Provider>
    )
  }
)

Sider.displayName = 'Sider'

export default Sider
