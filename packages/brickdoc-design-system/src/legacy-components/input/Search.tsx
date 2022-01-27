import * as React from 'react'
import classNames from 'classnames'
import { composeRef } from 'rc-util/lib/ref'
import { Search as SearchOutlined } from '@brickdoc/design-icons'
import Input, { InputProps } from './Input'
import { Button } from '../../components/Button'
import SizeContext from '../config-provider/SizeContext'
import { ConfigContext } from '../config-provider'
import { cloneElement } from '../_util/reactNode'

export interface SearchProps extends InputProps {
  inputPrefixCls?: string
  onSearch?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void
  enterButton?: React.ReactNode
  loading?: boolean
}

const Search = React.forwardRef<Input, SearchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    suffix,
    enterButton = false,
    addonAfter,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    ...restProps
  } = props

  const { getPrefixCls, direction } = React.useContext(ConfigContext)
  const contextSize = React.useContext(SizeContext)

  const size = customizeSize || contextSize

  const inputRef = React.useRef<Input>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target && e.type === 'click' && customOnSearch) {
      customOnSearch(e.target.value, e)
    }
    if (customOnChange) {
      customOnChange(e)
    }
  }

  const onMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (document.activeElement === inputRef.current?.input) {
      e.preventDefault()
    }
  }

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (customOnSearch) {
      customOnSearch(inputRef.current?.input.value as string, e)
    }
  }

  const prefixCls = getPrefixCls('input-search', customizePrefixCls)
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls)

  const searchIcon = typeof enterButton === 'boolean' || typeof enterButton === 'undefined' ? <SearchOutlined /> : null
  const btnClassName = `${prefixCls}-button`

  let button: React.ReactNode
  const enterButtonAsElement = (enterButton || {}) as React.ReactElement
  const isAntdButton = enterButtonAsElement.type && (enterButtonAsElement.type as typeof Button)
  if (isAntdButton || enterButtonAsElement.type === 'button') {
    button = cloneElement(enterButtonAsElement, {
      onMouseDown,
      onClick: onSearch,
      key: 'enterButton',
      ...(isAntdButton
        ? {
            className: btnClassName,
            size
          }
        : {})
    })
  } else {
    const btnSize: 'small' | 'medium' | 'large' = size === 'middle' ? 'medium' : size!
    button = (
      <Button
        className={btnClassName}
        type={enterButton ? 'primary' : undefined}
        size={btnSize}
        disabled={disabled}
        key="enterButton"
        onMouseDown={onMouseDown}
        onClick={onSearch}
        loading={loading}
        icon={searchIcon}>
        {enterButton}
      </Button>
    )
  }

  if (addonAfter) {
    button = [
      button,
      cloneElement(addonAfter, {
        key: 'addonAfter'
      })
    ]
  }

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-with-button`]: !!enterButton
    },
    className
  )

  return (
    <Input
      ref={composeRef<Input>(inputRef, ref)}
      onPressEnter={onSearch}
      {...restProps}
      size={size}
      prefixCls={inputPrefixCls}
      addonAfter={button}
      suffix={suffix}
      onChange={onChange}
      className={cls}
      disabled={disabled}
    />
  )
})

Search.displayName = 'Search'

export default Search