import { ForwardRefRenderFunction, createRef, forwardRef, KeyboardEventHandler } from 'react'
import { Input, InputProps } from 'reakit'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { css, theme } from '../../themes'
import { usePressEnterHandler } from '../Input/usePressEnterHandler'
import cx from 'classnames'

export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}

export interface TextAreaProps extends Omit<InputProps, 'as' | 'ref' | 'css'> {
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>
  autoSize?: boolean | AutoSizeType
}

const textareaStyle = css({
  width: '100%',
  resize: 'none',
  cursor: 'text',
  verticalAlign: 'bottom',
  color: theme.colors.typePrimary,
  borderColor: theme.colors.borderSecondary,
  backgroundColor: theme.colors.backgroundOverlayPrimary,
  padding: '5px 12px',
  lineHeight: theme.lineHeights.body,
  '&::placeholder': {
    color: theme.colors.typeDisabled
  },
  '&:hover:not(:disabled)': {
    borderColor: theme.colors.borderOverlayThirdary
  },
  '&:focus-visible': {
    outlineColor: theme.colors.borderOverlayThirdary,
    borderColor: 'transparent'
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: theme.colors.typeDisabled,
    background: theme.colors.secondaryHover
  },
  '&:invalid, &[aria-invalid="true"]': {
    borderColor: theme.colors.errorDefault,
    boxShadow: `0 0 0 2px ${theme.colors.errorBorder}`,
    backgroundColor: theme.colors.errorBg,
    color: theme.colors.errorDefault,
    '&:focus-visible': {
      outlineColor: theme.colors.errorDefault
    }
  }
})

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (props, ref) => {
  const { autoSize = false, className, onKeyDown, onPressEnter, ...otherProps } = props
  const inputRef = ref ?? createRef<HTMLTextAreaElement>()
  const keydownHandler = usePressEnterHandler(onPressEnter, onKeyDown)
  const commonProps = {
    ...otherProps,
    ref: inputRef,
    className: cx(textareaStyle(), className),
    onKeyDown: keydownHandler
  }

  return autoSize ? (
    <Input
      {...commonProps}
      maxRows={typeof autoSize === 'object' ? autoSize.maxRows : undefined}
      minRows={typeof autoSize === 'object' ? autoSize.minRows : undefined}
      as={TextareaAutosize}
    />
  ) : (
    <Input {...commonProps} as="textarea" />
  )
}

const _TextArea = forwardRef(TextArea)
_TextArea.displayName = 'TextArea'

export { _TextArea as TextArea }
