import { ForwardRefRenderFunction, createRef, forwardRef, KeyboardEventHandler, TextareaHTMLAttributes } from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { css, theme } from '../../themes'
import { usePressEnterHandler } from '../Input/usePressEnterHandler'
import { cx } from '../../utilities'

export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  onPressEnter?: KeyboardEventHandler<HTMLTextAreaElement>
  autoSize?: boolean | AutoSizeType
}

const textareaStyle = css({
  width: '100%',
  resize: 'none',
  cursor: 'text',
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  verticalAlign: 'bottom',
  caretColor: theme.colors.primaryDefault,
  color: theme.colors.typePrimary,
  borderColor: theme.colors.borderSecondary,
  backgroundColor: theme.colors.ceramicQuaternary,
  borderRadius: '4px',
  padding: '5px 12px',
  transition: `all .2s ${theme.transitions.easeOut}`,
  '&::placeholder': {
    color: theme.colors.typeDisabled
  },
  '&::selection': {
    background: theme.colors.secondarySelected
  },
  '&:hover:not(:disabled)': {
    borderColor: theme.colors.borderOverlayThirdary,
    background: theme.colors.secondaryHover
  },
  '&:focus-visible': {
    outline: 'none',
    border: `1px solid ${theme.colors.borderOverlayThirdary}`
  },
  '&:focus-within': {
    background: theme.colors.backgroundOverlayPrimary
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
  const { autoSize = false, rows, className, onKeyDown, onPressEnter, ...otherProps } = props
  const inputRef = ref ?? createRef<HTMLTextAreaElement>()
  const keydownHandler = usePressEnterHandler(onPressEnter, onKeyDown)
  const commonProps = {
    ...otherProps,
    ref: inputRef,
    className: cx(textareaStyle(), className),
    onKeyDown: keydownHandler
  }

  return autoSize ? (
    <TextareaAutosize
      {...commonProps}
      maxRows={typeof autoSize === 'object' ? autoSize.maxRows : undefined}
      minRows={typeof autoSize === 'object' ? autoSize.minRows : undefined}
    />
  ) : (
    <textarea rows={rows} {...commonProps} />
  )
}

const _TextArea = forwardRef(TextArea)
_TextArea.displayName = 'TextArea'

export { _TextArea as TextArea }
